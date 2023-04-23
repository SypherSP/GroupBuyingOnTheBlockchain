import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import MarketListings from './components/Products/MarketListings';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/market" element={<MarketListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
