import Main from './pages/main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Work from './pages/work/Work';
import Critic from './pages/critic/Critic';
import Archive from './pages/archive/Archive';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Poster from './pages/archive/poster/Poster';
import NavLayout from './components/Layouts/NavLayout';
import LoginLayout from './components/Layouts/LoginLayout';
import Book from './pages/archive/book/Book';
import BookInfo from './pages/archive/book/BookInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path='/' element={<Main />} />
          <Route path='/main' element={<Main />} />
          <Route path='/work' element={<Work />} />
          <Route path='/critic' element={<Critic />} />
          <Route path='/archive' element={<Archive />}>
            <Route path='poster' element={<Poster />} />
            <Route path='book' element={<Book />} />
          </Route>
          <Route path='/archive/book/:bookId' element={<BookInfo />} />

        </Route>
        <Route element={<LoginLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
