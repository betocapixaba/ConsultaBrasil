import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ipva from './pages/Ipva';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipva" element={<Ipva />} />
      </Routes>
    </Router>
  );
}
