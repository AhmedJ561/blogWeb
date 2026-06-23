import Navbar from './NavBar';
import Home from './HomePage';
import Create from './Create';
import BlogDetail from './BlogDetail';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
      <Routes>

          <Route path='/' element={ <Home />}/>
          <Route path='/create' element={ <Create />}/>
          <Route path='/blogs/:id' element={ <BlogDetail />}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;