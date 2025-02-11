import Main from './pages/main/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Critic from './pages/critic/Critic';
import NewCritic from './pages/critic/NewCritic'
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
import PasswordChangeModal2 from './pages/user/PasswordChangeModal2';
import AdminCritic from './pages/admin/critic/Critic';
import AdminCalendar from './pages/admin/calendar/Calendar';
import Admin from './pages/admin/Admin';
import AdminLinks from './pages/admin/AdminLinks';
import { AuthProvider } from './store/Auth';
import CriticLogUpload from './pages/admin/upload/critic/CriticLogUpload';
import AuthorInfo from './pages/work/Author/AuthorInfo';
import MemberModify from './pages/admin/modify/member/memberModify';
import AuthorInfoModify from './pages/user/AuthorInfoModify';
import ProtectedRouter from './components/Auth/ProtectedRouter';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='*' element={<NotFound404 />} />
          <Route element={<ProtectedRouter />}>
            <Route element={<NavLayout />}>
              <Route path='/admin' element={<Admin />}>
                <Route path='critic' element={<AdminCritic />} />
                <Route path='calendar' element={<AdminCalendar />} />
                <Route path='manage' element={<AdminLinks />} />
                <Route path='book/modify' element={<BookModify />} />
                <Route path='book/modify/:bookId' element={<BookModifyInfo />} />
                <Route path='poster/modify' element={<PosterModify />} />
                <Route path='member/modify' element={<MemberModify />} />
                <Route path='poster/modify/:posterId' element={<PosterModifyInfo />} />
                <Route path='poster/upload' element={<PosterUpload />} />
                <Route path='book/upload' element={<BookUpload />} />
                <Route path='critic/log/upload' element={<CriticLogUpload />} />
              </Route>
              <Route path='/frontend' element={<Main />} />
              <Route path='/work/upload' element={<UploadWork />} />
              <Route path='/author/:id' element={<AuthorInfo />} />
              <Route path='/author/modify' element={<AuthorInfoModify />} />
              <Route path='/' element={<Main />} />
              <Route path='/main' element={<Main />} />
              <Route path='/work' element={<Works />} />
              <Route path='/critic' element={<NewCritic />} />
              <Route path='/archive' element={<Archive />}>
                <Route path='poster' element={<Poster />} />
                <Route path='book' element={<Book />} />
              </Route>
              <Route path='/work/:workId' element={<WorkInfo />} />
              <Route path='/archive/book/:bookId' element={<BookInfo />} />
              <Route path='/user/mypage' element={<MyInfoModify />} />
              <Route path="/PasswordChangeModal" element={<PasswordChangeModal />} />
              <Route path='*' element={<NotFound404 />} />
            </Route>
            <Route>
              <Route path='/work/:workId' element={<WorkInfo />} />
              <Route path='/archive/book/:bookId' element={<BookInfo />} />
              <Route path='/user/mypage' element={<Mypage />} />
              <Route path='user/myInfoModify' element={<MyInfoModify />} />
              <Route path='/user/myInfoModify' element={<MyInfoModify />} />
              <Route path="/PasswordChangeModal" element={<PasswordChangeModal />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
