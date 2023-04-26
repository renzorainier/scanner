import { useState, useEffect } from "react";

import TodayAttendance from "./TodayView";
import PastAttendance from "./PastView";
import Greeting from "./Dash";
import Calculator from "./Sample";
import Pass from "./Pass";
import Generate from "./Generate";
import TeamCarousel from "./Members";
import About from "./About";
import StudentCollection from "./Create";

const MainComponent = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleBackButtonClick = () => {
    setCurrentComponent(null);
  };

  const renderCurrentComponent = () => {
    switch (currentComponent) {
      case "pass":
        return <Pass onBackButtonClick={handleBackButtonClick} />;
      case "generate":
        return <Generate onBackButtonClick={handleBackButtonClick} />;
        case "create":
          return <Generate onBackButtonClick={handleBackButtonClick} />;

      // render other components as needed
      default:
        return (
          <div className="flex justify-center  h-screen">
            <div className="mt-4 ax-w-screen-lg mx-auto">
              <div className="greeting-container">{/* <Greeting /> */}</div>

              <div className="ml-5 text-white mr-5 mt-3  gap-4">

                <button
                  className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("pass")}
                >
                  Scan
                </button>
                <button
                  className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("generate")}
                >
                  QR Code
                </button>
                <button
                  className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("create")}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className="fade-in">{renderCurrentComponent()}</div>;
};

export default MainComponent;



    {/* <button
                  className="bg-blue-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("today")}
                  style={{ animation: "slide-from-left 1s ease forwards" }}
                >
                  Attendance
                </button> */}

                {/* <button
                  className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("about")}
                  style={{ animation: "slide-from-right 1s ease forwards" }}
                >
                  About
                </button> */}

// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Create
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("pass")}>
// Scan
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Qr Code
// </button>

// 62CDFF

// C9EEFF

// case "past":
//   return <PastAttendance onBackButtonClick={handleBackButtonClick} />;
// case "sample":
//   return <Calculator onBackButtonClick={handleBackButtonClick} />;
// case "create":
//   return <Generate onBackButtonClick={handleBackButtonClick} />;
// case "pass":
//   return <Pass onBackButtonClick={handleBackButtonClick} />;
// case "members":
//   return <TeamCarousel onBackButtonClick={handleBackButtonClick} />;

// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Create
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("pass")}>
// Scan
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Qr Code
// </button>

// 62CDFF

// C9EEFF

// case "past":
//   return <PastAttendance onBackButtonClick={handleBackButtonClick} />;
// case "sample":
//   return <Calculator onBackButtonClick={handleBackButtonClick} />;
// case "create":
//   return <Generate onBackButtonClick={handleBackButtonClick} />;
// case "pass":
//   return <Pass onBackButtonClick={handleBackButtonClick} />;
// case "members":
//   return <TeamCarousel onBackButtonClick={handleBackButtonClick} />;
