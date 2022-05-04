import { Record } from "./hearingTest";

interface ResultsProps {
  results: Record[];
}
const Results = ({ results }: ResultsProps) => {
  return (
    <div className="border-white border-2 p-2 m-2 flex-col">
      <h1 className="text-5xl m-5 p-5">Wyniki: </h1>
      {results.map((x) => (
        <p>
          {x.ear},{x.frequency}, {x.volume}
        </p>
      ))}
    </div>
  );
};

export default Results;
