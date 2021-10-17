import './App.css';

import BarByTopics from './charts/BarByTopics';
import PieByRatings from './charts/PieByRatings';
import LineByPagesViews from './charts/LineByPagesViews'
import FunnelByTopN from './charts/FunnelByTopN';

function App() {
  return (
    <div className="wrapper">
      <div className="box1"><FunnelByTopN /></div>
      <div className="box2"><BarByTopics /></div>
      <div className="box3"><PieByRatings /></div>
      <div className="box4"><LineByPagesViews /></div>
    </div>
  );
}

export default App;
