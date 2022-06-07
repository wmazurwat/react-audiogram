import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Ear, Record } from "./hearingTest";

interface ResultsProps {
  results: Record[];
}

const parseVolume = (v: number) => {
  if (v < 0.1) return 0;
  if (v <= 0.1) return 10;
  if (v <= 0.1778279410038923) return 20;
  if (v <= 0.31622776601683794) return 30;
  if (v <= 0.5623413251903491) return 40;
  if (v <= 1) return 50;
  if (v <= 0.1) return 60;
  if (v <= 1.7782794100389228) return 70;
  if (v <= 3.162277660168379) return 80;
  if (v <= 9.999999999999998) return 90;
  return 100;
};

const calculateUbytek = (arr: Record[] ) => {
  return parseVolume(arr[2].volume) + parseVolume(arr[3].volume) + parseVolume(arr[4].volume) / 3
}
//użyć mapowania do opracowania wyników ( 0.1 przypusac do 0 db, 0,17 do 10 db idt.)
const Results = ({ results }: ResultsProps) => {
  const parsedData = results.map(({ ear, volume, frequency }) => ({
    [ear]: volume,
    frequency,
  }));
  const right = results.filter((x) => x.ear === Ear.Right).map((x) => x.volume);
  const ubytekL = calculateUbytek(results.filter(x => x.ear === Ear.Left))
  const ubytekR = calculateUbytek(results.filter(x => x.ear === Ear.Right))
  const diff = Math.abs(ubytekL- ubytekR)  
  const data = parsedData 
    .filter((x) => x.Left)
    .map((x, i) => ({ ...x, Right: right[i] }));
  return (
    <div className="border-white border-2 p-2 m-2 flex-col">
      <h1 className="text-5xl m-5 p-5">Wyniki: </h1>
      <LineChart width={400} height={400} data={data} className="m-auto">
        <Line type="monotone" dataKey="Left" stroke="blue" />
        <Line type="monotone" dataKey="Right" stroke="white" />
        <XAxis dataKey="frequency" stroke="white" />
        <Tooltip />
        <YAxis stroke="white" tickFormatter={(v) => parseVolume(v) + "db"} />
        <Legend />
      </LineChart>
      <h1>Ubytek słuchu w lewym uchu wynosi: <span>{Math.round(ubytekL)}</span> db</h1>
      <h1>Ubytek słuchu w prawym uchhu wynosi: <span>{Math.round(ubytekR)}</span> db</h1>
      <h1>Stopień uszkodzenia: <span>{diff > 25 ? Math.round(Math.min(ubytekL, ubytekR)) + 5 : Math.round(Math.min(ubytekL, ubytekR)) }</span> db</h1>

    </div>
  );
};

export default Results;
