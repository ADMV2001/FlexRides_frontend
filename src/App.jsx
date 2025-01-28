import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/admin/adminPanel';
import HomePage from './pages/home/homePage';

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPanel/>} />
        <Route path="/*" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
