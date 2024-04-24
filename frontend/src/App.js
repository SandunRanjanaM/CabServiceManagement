import './App.css';
import Addsystemusers from './components/Addsystemusers';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header/>

        <Routes>
          <Route path='/add' element={<Addsystemusers />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
