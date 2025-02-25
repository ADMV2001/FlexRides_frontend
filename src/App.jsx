import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/admin/adminPanel';
import HomePage from './pages/home/homePage';
import LoginPage from './pages/login/loginPage';
import { Toaster } from 'react-hot-toast';
import Test from './components/test';

function App() {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPanel/>} />
        <Route path="/*" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
