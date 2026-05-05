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
  const [loading, setLoading] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // back camera

  // 📸 OPEN GALLERY
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // 📸 HANDLE GALLERY IMAGE
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImage(base64);
      sessionStorage.setItem("uploadedImage", base64);
    };
    reader.readAsDataURL(file);
  };

  // 📷 OPEN CAMERA
  const openCamera = async () => {
    setShowCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied or not available");
    }
  };

  // 🔄 SWITCH CAMERA
  const switchCamera = async () => {
    const newMode =
      facingMode === "user" ? "environment" : "user";

    setFacingMode(newMode);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: newMode },
    });

    videoRef.current.srcObject = stream;
  };

  // 📸 CAPTURE IMAGE
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    setImage(base64);
    sessionStorage.setItem("uploadedImage", base64);

    // convert to file
    fetch(base64)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "capture.png", {
          type: "image/png",
        });
        setImageFile(file);
      });

    // stop camera
    const stream = video.srcObject;
    stream.getTracks().forEach((track) => track.stop());

    setShowCamera(false);
  };

  // 🚀 CONTINUE
  const handleContinue = async () => {
    if (!imageFile) {
      alert("Please upload image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        { timeout: 60000 }
      );

      localStorage.setItem("prediction", res.data.prediction);
      localStorage.setItem("confidence", res.data.confidence);

      navigate("/ai-detection");
    } catch (err) {
      console.error(err);
      alert("Try again in a few seconds.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="border-b bg-white px-8 py-5 flex justify-between">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600"
        >
          ← Back to Dashboard
        </button>
        <h1 className="font-semibold">CivicAI</h1>
      </div>

      {/* MAIN */}
      <div className="max-w-[900px] mx-auto mt-10 bg-white rounded-3xl shadow-sm p-10">

        <h1 className="text-4xl font-bold mb-3">
          Upload Issue Photo
        </h1>

        <p className="text-gray-500 mb-8">
          Take or upload a clear photo of the civic issue
        </p>

        {/* PREVIEW */}
        <div className="border-2 border-dashed border-gray-300 rounded-2xl h-[380px] flex items-center justify-center overflow-hidden">

          {showCamera ? (
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : image ? (
            <img
              src={image}
              alt="uploaded"
              className="max-h-full object-cover"
            />
          ) : (
            <p className="text-gray-400">Upload image here</p>
          )}
        </div>

        <canvas ref={canvasRef} hidden />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* BUTTONS */}
        <div className="flex gap-6 mt-8">

          <button
            onClick={openFilePicker}
            className="flex-1 border rounded-xl py-4 text-lg"
          >
            Gallery
          </button>

          {!showCamera ? (
            <button
              onClick={openCamera}
              className="flex-1 border rounded-xl py-4 text-lg"
            >
              Camera
            </button>
          ) : (
            <div className="flex gap-3 flex-1">

              <button
                onClick={captureImage}
                className="bg-black text-white px-4 py-3 rounded-xl w-full"
              >
                Capture
              </button>

              <button
                onClick={switchCamera}
                className="border px-4 py-3 rounded-xl"
              >
                🔄
              </button>

            </div>
          )}

        </div>

        {/* CONTINUE */}
        <div className="flex justify-end mt-10">

          <button
            onClick={handleContinue}
            disabled={loading}
            className="bg-black text-white px-10 py-4 rounded-xl text-lg disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Continue →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportIssue;