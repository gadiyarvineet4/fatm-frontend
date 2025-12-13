
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EntryPage } from './pages/EntryPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<EntryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
