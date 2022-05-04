import { useState } from "react";
import "./App.css";
import Calibration from "./components/calibration";
import HearingTest from "./components/hearingTest";

function App() {
  const [isCalibrated, setIsCalibrated] = useState(false);

  return (
    <div className="App bg-slate-600 h-screen">
      <header className="">
        <p className="text-6xl m-5 p-5">Audigram</p>
      </header>
      {isCalibrated ? (
        <HearingTest />
      ) : (
        <Calibration setIsCalibrated={setIsCalibrated} />
      )}
    </div>
  );
}

export default App;
