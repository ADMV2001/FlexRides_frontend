import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './pages/admin/adminPanel';
import HomePage from './pages/home/homePage';
import LoginPage from './pages/login/loginPage';
import { Toaster } from 'react-hot-toast';
import Test from './components/test';
import RegisterPage from './pages/register/register';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="565011685288-c44u0ol4e79splc5sdt8a54sg157o2u6.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster/>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPanel/>} />
        <Route path="/*" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App

//testing pull request