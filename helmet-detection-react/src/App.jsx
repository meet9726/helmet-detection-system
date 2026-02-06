import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App
