import React, {useState}from "react";
import "./landing.css";
import Header from "../content/header";
import axios from "axios";

export default function Landing() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const subjects = [
        { name: "Math", icon: "path/to/math-icon.png" },
        { name: "Chemistry", icon: "path/to/chemistry-icon.png" },
        { name: "Physics", icon: "path/to/physics-icon.png" },
        { name: "Biology", icon: "path/to/biology-icon.png" }
      ];

      const handleCardClick = (index) => {
        setActiveIndex(index);
      };
      const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
      }

      try {
          const response = await axios.post("http://localhost:3002/upload", formData, {
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          });
          console.log(response.data);
      } catch (error) {
          console.error("Error uploading files:", error);
      }
  };

      const renderIcon = (icon) => {
        switch (icon) {
          case "CalculatorIcon":
            return <CalculatorIcon className="icon" />;
          case "ThermometerIcon":
            return <ThermometerIcon className="icon" />;
          case "PowerIcon":
            return <PowerIcon className="icon" />;
          case "DnaIcon":
            return <DnaIcon className="icon" />;
          default:
            return null;
        }
      };
  return (
    <div className="landing">
      <Header />
      <main className="main-content">
        <h1 className="title">Let's check Homework <b/> Easy </h1>
        <div className="video-container">
          <div className="video-wrapper">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="iframe"
              />
            </div>
          </div>
        </div>
      <div className="carousel-container">
        <div className="carousel">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`card ${index === activeIndex ? "active" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              {renderIcon(subject.icon)}
              <h3>{subject.name}</h3>
            </div>
          ))}
        </div>
        <button className="carousel-control prev" onClick={() => setActiveIndex((activeIndex - 1 + subjects.length) % subjects.length)}>
          ‹
        </button>
        <button className="carousel-control next" onClick={() => setActiveIndex((activeIndex + 1) % subjects.length)}>
          ›
        </button>
      </div>
      <div className="upload-container">
        <TypeIcon className="upload-icon" />
        <input
          type="file"
          className="upload-input"
          multiple
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      </main>
    </div>
  );
}
function CalculatorIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function DnaIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </svg>
  );
}

function PowerIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}

function ThermometerIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  );
}

function TypeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  );
}