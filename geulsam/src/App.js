import Author from './pages/authors/Author';
import Main from './pages/main/Main'
import Award from './pages/awards/Award';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Criticism from './pages/criticism/Criticism';
import AuthorInfo from './pages/authors/AuthorInfo';
import LinkAll from './components/LinkAll';

function App() {
  return (
    <BrowserRouter>
      <LinkAll />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/author' element={<Author />} />
        <Route path='/award' element={<Award />} />
        <Route path='/criticism' element={<Criticism />} />
        <Route path='/author/:id' element={<AuthorInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
