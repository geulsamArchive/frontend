import Main from './pages/main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer';
import Navbar from './components/Navbar';
import Work from './pages/work/Work';
import Critic from './pages/critic/Critic';
import Archive from './pages/archive/Archive';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/work' element={<Work />} />
        <Route path='/critic' element={<Critic />} />
        <Route path='/archive' element={<Archive />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
