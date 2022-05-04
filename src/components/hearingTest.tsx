import { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import { getSaoundCinfig, playSound } from "../utils/audio";

const frequencies = [125, 500, 1000, 2000, 3000, 4000, 6000, 8000, 10000];
const defaultVolume = 0.1;
enum Ear {
  Left = "Left",
  Right = "Right",
}
const HearingTest = () => {
  const audio = useAudio();
  const [earTested, setEarTested] = useState(Ear.Left);

  const [volume, setVolume] = useState(defaultVolume);
  const [frequencyIndex, setFrequencyIndex] = useState(0);

  const onStart = () => {
    console.log(volume, frequencies[frequencyIndex]);
    const s1 = getSaoundCinfig(audio, volume, 1, frequencies[frequencyIndex]);
    playSound(audio, s1.arr);
  };
  const onYes = () => {
    setFrequencyIndex(frequencyIndex + 1);
    setVolume(defaultVolume);
    if (frequencyIndex >= frequencies.length - 1) {
      setFrequencyIndex(0);
      setEarTested(Ear.Right);
    }
    if (earTested === Ear.Right && frequencyIndex >= frequencies.length - 1) {
      // complete
      console.log("completed");
    }
  };
  const onNo = () => {
    const coef = Math.pow(10, 5 / 20);
    setVolume(volume * coef);
  };
  return (
    <div className="App ">
      <div className="App border-white border-2 p-2 m-2 flex-col">
        <h1 className="text-4xl m-5 p-5">Badanie właściwe</h1>
        <h4 className="text-2xl m-1 p-2">
          Frequency: {frequencies[frequencyIndex]}
        </h4>
        <h4 className="text-2xl m-1 p-2">Ear: {earTested}</h4>
        <h4 className="text-2xl m-1 p-2">Volume: {volume}</h4>

        <button className="border-white border-2 p-3 m-3" onClick={onStart}>
          Odtwórz dzwięk
        </button>
        <div>
          <button className="border-white border-2 p-3 m-3" onClick={onYes}>
            Yes
          </button>
          <button className="border-white border-2 p-3 m-3" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default HearingTest;
