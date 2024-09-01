import Main from './pages/main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Critic from './pages/critic/Critic';
import Archive from './pages/archive/Archive';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Poster from './pages/archive/poster/Poster';
import NavLayout from './components/Layouts/NavLayout';
import LoginLayout from './components/Layouts/LoginLayout';
import Book from './pages/archive/book/Book';
import BookInfo from './pages/archive/book/BookInfo';
import PosterUpload from './pages/admin/upload/poster/PosterUpload';
import BookUpload from './pages/admin/upload/book/bookUpload';
import UploadWork from './pages/work/upload/uploadWork';
import Test from './pages/work/test';
import Works from './pages/work/works/Works';
import WorkInfo from './pages/work/works/WorkInfo';
import PosterModify from './pages/admin/modify/poster/posterModify';
import BookModify from './pages/admin/modify/book/bookModify';
import BookModifyInfo from './pages/admin/modify/book/bookModifyInfo'
import PosterModifyInfo from './pages/admin/modify/poster/posterModifyInfo'
import NotFound404 from './components/NotFound/404';
import Mypage from './pages/user/Mypage';
import MyInfoModify from './pages/user/MyInfoModify';
import PasswordChangeModal from './pages/user/PasswordChangeModal';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/test' element={<Test />} />
        <Route element={<NavLayout />}>
          <Route path='/book/modify' element={<BookModify />} />
          <Route path='/book/modify/:bookId' element={<BookModifyInfo />} />
          <Route path='/poster/modify' element={<PosterModify />} />
          <Route path='/poster/modify/:posterId' element={<PosterModifyInfo />} />
          <Route path='/poster/upload' element={<PosterUpload />} />
          <Route path='/work/upload' element={<UploadWork />} />
          <Route path='/book/upload' element={<BookUpload />} />
          <Route path='/frontend' element={<Main />} />
          <Route path='/' element={<Main />} />
          <Route path='/main' element={<Main />} />
          <Route path='/work' element={<Works />} />
          <Route path='/critic' element={<Critic />} />
          <Route path='/archive' element={<Archive />}>
            <Route path='poster' element={<Poster />} />
            <Route path='book' element={<Book />} />
          </Route>
          <Route path='/work/:workId' element={<WorkInfo />} />
          <Route path='/archive/book/:bookId' element={<BookInfo />} />
          <Route path='/user/mypage' element={<Mypage />} />
          <Route path='user/myInfoModify' element={<MyInfoModify />} />
          <Route path="/PasswordChangeModal" element={<PasswordChangeModal />} />
          <Route path='*' element={<NotFound404 />} />
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
