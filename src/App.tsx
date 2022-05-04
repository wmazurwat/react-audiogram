import './App.css';
import Calibration from './components/calibration';
import HearingTest from './components/hearingTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Calibration /> */}
        <HearingTest />
      </header>
    </div>
  );
}

export default App;
