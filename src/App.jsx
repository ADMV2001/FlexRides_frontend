import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/admin/adminPanel';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';
import LoginPage from './pages/login/loginPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPanel/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/*" element={<HomePage/>} />
        <Route path="/testing" element={<Testing/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
