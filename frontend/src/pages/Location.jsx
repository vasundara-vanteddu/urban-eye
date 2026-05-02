import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";

// FIX MARKER ICON
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// MAP RECENTER
function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, 18);
  }, [position, map]);

  return null;
}

// MAP MARKER
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} />;
}

function Location() {
  const navigate = useNavigate();

  const [position, setPosition] = useState([17.385, 78.4867]);
  const [address, setAddress] = useState("");

  // GEOAPIFY DETAILED ADDRESS
  const getAddress = async (lat, lng) => {
    try {
      const apiKey = "48c379a27a134782a69ec5043001243c";

      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
      );

      const data = await res.json();

      const result = data.features?.[0]?.properties;

      if (result) {
        const formattedAddress = [
          result.plus_code,
          result.housenumber,
          result.street,
          result.suburb,
          result.district,
          result.city_district
            ? `Ward / Zone: ${result.city_district}`
            : "",
          result.city,
          result.county,
          result.state,
          result.postcode,
          result.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(formattedAddress);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (position) {
      getAddress(position[0], position[1]);
    }
  }, [position]);

  // HIGH ACCURACY GPS
  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        setPosition([latitude, longitude]);

        console.log("GPS Accuracy:", pos.coords.accuracy);
      },
      (err) => {
        console.error(err);
        alert("Please allow location permission");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="flex justify-between px-10 py-4 bg-white shadow-sm">

        <button onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h1 className="font-semibold">
          Urban-Eye
        </h1>

      </div>

      {/* CARD */}
      <div className="flex justify-center mt-6">

        <div className="bg-white w-[800px] p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-5">
            Issue Location
          </h2>

          {/* GPS BUTTON */}
          <button
            onClick={handleCurrentLocation}
            className="w-full border p-4 rounded-xl mb-5 hover:bg-gray-50 text-lg"
          >
            📍 Use Current Location
          </button>

          {/* MAP */}
          <div className="h-[400px] rounded-2xl overflow-hidden border mb-5">

            <MapContainer
              center={position}
              zoom={18}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <RecenterMap position={position} />

              <LocationMarker
                position={position}
                setPosition={setPosition}
              />
            </MapContainer>

          </div>

          {/* ADDRESS */}
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Detailed authority-grade address"
            className="w-full border p-4 rounded-xl mb-6 h-[140px] resize-none"
          />

          {/* BUTTONS */}
          <div className="flex justify-between">

            <button
              onClick={() => navigate(-1)}
              className="text-lg"
            >
              ← Back
            </button>

            <button
              onClick={() => {
                const prediction =
                  localStorage.getItem("prediction");

                let priority = "Low";

                if (
                  prediction === "pothole" ||
                  prediction === "drainage"
                ) {
                  priority = "High";
                } else if (
                  prediction === "garbage" ||
                  prediction === "streetlight"
                ) {
                  priority = "Medium";
                }

                localStorage.setItem("lat", position[0]);
                localStorage.setItem("lng", position[1]);
                localStorage.setItem("address", address);
                localStorage.setItem("priority", priority);

                navigate("/details");
              }}
              className="bg-black text-white px-8 py-3 rounded-xl"
            >
              Continue →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Location;