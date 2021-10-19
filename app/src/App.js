import './App.css';

import BarByTopics from './charts/BarByTopics';
import PieByRatings from './charts/PieByRatings';
import LineByPagesViews from './charts/LineByPagesViews'
import FunnelByTopN from './charts/FunnelByTopN';

function App() {
  return (
    <div className="wrapper">
      <div className="box1 box"><FunnelByTopN /></div>
      <div className="box2 box"><BarByTopics /></div>
      <div className="box3 box"><PieByRatings /></div>
      <div className="box4 box"><LineByPagesViews /></div>
    </div>
  );
}

export default App;
