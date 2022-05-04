import { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import { playSound2 } from "../utils/audio";

const HearingTest = () => {
  const audio = useAudio();
  const [inverval, setInterval] = useState<NodeJS.Timer>();

  return (
    <div className="App ">
      <p className="text-6xl m-5 p-5">
       
        Audigram
      </p>
      <div className="App border-white border-2 p-2 m-2 flex-col">
      <h1 className="text-5xl m-5 p-5">
        Kalibracja
      </h1>

      <p className="text-xl m-3 p-3">
      <i>Po naciśnięciu przycisku Start usłyszysz dwa dźwięki jeden głośniejszy, drugi cichszy. 
      Jest to moment kalibracji sprzętu. Ustaw głośność komputera tak aby slyszeć tylko głośniejszy dźwięk. 
      Po wykonaniu czynności naiśnij przycisk Stop, a następnie przejdź do okna Badanie słuchu.</i>
      </p>
     
      <button className="border-white border-2 p-3 m-3" onClick={() => setInterval(playSound2(audio))}>Start</button>
      <button className="border-white border-2 p-3 m-3" onClick={() => clearInterval(Number(inverval))}>Stop</button>
     
      </div>
      <div className="App border-white border-2 p-2 m-2 flex-col">
      <h1 className="text-5xl m-5 p-5">
        Badanie właściwe
      </h1>
      <button className="border-white border-2 p-3 m-3" onClick={() =>clearInterval(Number(inverval)) }>Test</button>
      <button className="border-white border-2 p-3 m-3" onClick={() => clearInterval(Number(inverval))}>Stop</button>
      </div>
    
    </div>
  );
}

export default HearingTest;
