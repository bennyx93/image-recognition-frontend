import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ImagePage from './pages/ImagePage';
import NotFoundPage from './pages/NotFoundPage';
import ImageUpload from './pages/ImageUpload';

function App() {
  return (
    <Router>
      <div className="App container mt-5">
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path='/image/:imageId' element={<ImagePage />}></Route>
          <Route path='/images/upload' element={<ImageUpload />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
