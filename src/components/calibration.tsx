import { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import { playSound2 } from "../utils/audio";

const Calibration = () => {
  const audio = useAudio();
  const [inverval, setInterval] = useState<NodeJS.Timer>();

  return (
    <div className="App">
      <h1 className="text-5xl">
        Kalibracja
      </h1>
      <br></br>
      <p className="text-xl">
      Po naciśnięciu przycisku Start usłyszysz dwa dźwięki jeden głośniejszy, drugi cichszy. 
      Jest to moment kalibracji sprzętu. Ustaw głośność komputera tak aby slyszeć tylko głośniejszy dźwięk. 
      Po wykonaniu czynności naiśnij przycisk Stop, a następnie przejdź do okna Badanie słuchu.
      </p>
      <br></br>
      <button onClick={() => setInterval(playSound2(audio))}>Start</button>
      <br></br>
      <button onClick={() => clearInterval(Number(inverval))}>Stop</button>
    </div>
  );
}

export default Calibration;
