import './App.css';
import Login from './pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/layout';
import Dashboard from './pages/Dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
