import { useState } from "react";
import "./App.css";
import Calibration from "./components/calibration";
import HearingTest, { Record } from "./components/hearingTest";
import Results from "./components/results";

function App() {
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [results, setResults] = useState<Record[]>();

  return (
    <div className="App bg-slate-600 h-screen">
      <header className="">
        <p className="text-6xl m-5 p-5">Audigram</p>
      </header>
      {isCalibrated ? (
        results ? (
          <Results results={results} />
        ) : (
          <HearingTest setResults={setResults} />
        )
      ) : (
        <Calibration setIsCalibrated={setIsCalibrated} />
      )}
    </div>
  );
}

export default App;
