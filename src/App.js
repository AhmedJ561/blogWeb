import Navbar from './NavBar';
import Home from './HomePage';
import Create from './Create';
import BlogDetail from './BlogDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-inter">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/blogs/:id' element={<BlogDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;