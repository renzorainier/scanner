
//hi? checking my code huh

import { useState, useEffect } from "react";

import Pass from "./Pass";


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

      // render other components as needed
      default:
        return (
          <div className="flex justify-center pt-5 items-center">
            <div
              className="w-full rounded-lg mx-auto"
              style={{ maxWidth: "90%" }}
            >
              <Pass />
            </div>
          </div>
        );
    }
  };

  return <div className="fade-in">{renderCurrentComponent()}</div>;
};

export default MainComponent;
