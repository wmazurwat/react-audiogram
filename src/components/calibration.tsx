import { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import { playCalibrationSound } from "../utils/audio";

interface CalibrationProps {
  setIsCalibrated: (value: boolean) => void;
}
const Calibration = ({ setIsCalibrated }: CalibrationProps) => {
  const audio = useAudio();
  const [inverval, setInterval] = useState<NodeJS.Timer>();
  const onStop = () => {
    clearInterval(Number(inverval));
    setIsCalibrated(true);
  };
  const onStart = () => {
    setInterval(playCalibrationSound(audio));
  };
  return (
    <div className="border-white border-2 p-2 m-2 flex-col">
      <h1 className="text-5xl m-5 p-5">Kalibracja</h1>

      <br></br>
      <p className="text-xl m-3 p-3">
        <i>
          Po naciśnięciu przycisku Start usłyszysz dwa dźwięki jeden
          głośniejszy, drugi cichszy. Jest to moment kalibracji sprzętu. Ustaw
          głośność komputera tak aby slyszeć tylko głośniejszy dźwięk. Po
          wykonaniu czynności naiśnij przycisk Stop, a następnie przejdź do okna
          Badanie słuchu.
        </i>
      </p>
      <button className="border-white border-2 p-3 m-3" onClick={onStart}>
        Start
      </button>
      <button className="border-white border-2 p-3 m-3" onClick={onStop}>
        Stop
      </button>
    </div>
  );
};

export default Calibration;
