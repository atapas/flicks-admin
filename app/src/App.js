import './App.css';

import BarByTopics from './charts/BarByTopics';
import PieByRatings from './charts/PieByRatings';

function App() {
  return (
    <div className="App">
      <BarByTopics />
      <PieByRatings />
    </div>
  );
}

export default App;
