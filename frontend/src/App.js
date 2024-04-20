import './App.css';
import AdCreate from './components/AdCreate';
import Header from './components/Header';
import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/add" element={<AdCreate/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
