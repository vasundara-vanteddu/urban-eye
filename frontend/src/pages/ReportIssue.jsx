import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function ReportIssue() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [streamRef, setStreamRef] = useState(null);

  // FILE PICKER
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // FIXED FILE UPLOAD (BASE64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;

        setImage(base64Image);
        setImageFile(file);

        localStorage.setItem(
          "uploadedImage",
          base64Image
        );
      };

      reader.readAsDataURL(file);
    }
  };

  // OPEN CAMERA
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setCameraOn(true);
      setStreamRef(stream);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 200);

    } catch (err) {
      console.error(err);

      if (err.name === "NotAllowedError") {
        alert("Please allow camera permission ⚠️");
      } else {
        alert("Camera not working ❌");
      }
    }
  };

  // CAPTURE PHOTO
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setImage(imageData);

    localStorage.setItem(
      "uploadedImage",
      imageData
    );

    fetch(imageData)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "capture.png", {
          type: "image/png",
        });

        setImageFile(file);
      });

    if (streamRef) {
      streamRef.getTracks().forEach((track) =>
        track.stop()
      );
    }

    setCameraOn(false);
  };

  // SEND TO BACKEND
  const handleContinue = async () => {
    if (!imageFile) {
      alert("Please upload image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post(
        "https://urban-eye-srks.onrender.com/predict",
        formData
      );

      localStorage.setItem(
        "prediction",
        res.data.prediction
      );

      localStorage.setItem(
        "confidence",
        res.data.confidence
      );

      navigate("/ai-detection");

    } catch (err) {
      console.error(err);
      alert("Backend error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* TOP BAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-black"
        >
          ← Back to Dashboard
        </button>

        <h1 className="font-semibold">
          CivicAI
        </h1>

      </div>

      {/* MAIN */}
      <div className="flex justify-center mt-8">

        <div className="bg-white w-[600px] p-8 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-2">
            Upload Issue Photo
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Take or upload a clear photo of the civic issue
          </p>

          {/* FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* CAMERA MODE */}
          {cameraOn ? (
            <div className="text-center mb-6">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-lg w-full mb-4"
              />

              <button
                onClick={capturePhoto}
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Capture 📸
              </button>

              <canvas
                ref={canvasRef}
                className="hidden"
              ></canvas>

            </div>
          ) : (
            <>
              {/* PREVIEW */}
              <div
                onClick={openFilePicker}
                className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center mb-6 cursor-pointer hover:bg-gray-50"
              >
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="mx-auto max-h-56 rounded-lg"
                  />
                ) : (
                  <>
                    <p className="text-gray-500 mb-2">
                      Drop your image here
                    </p>

                    <p className="text-sm text-gray-400">
                      or click to browse from your device
                    </p>
                  </>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mb-6">

                <button
                  onClick={openFilePicker}
                  className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
                >
                  Gallery
                </button>

                <button
                  onClick={openCamera}
                  className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
                >
                  Camera
                </button>

              </div>
            </>
          )}

          {/* CONTINUE */}
          <div className="flex justify-end">

            <button
              onClick={handleContinue}
              disabled={!imageFile}
              className={`px-6 py-2 rounded-lg text-white ${
                imageFile
                  ? "bg-black"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ReportIssue;