import './App.css';
import AdCreate from './components/AdCreate';
import Header from './components/Header';
import AllAds from './components/AllAds';
import ManageAds from './components/ManageAds';
import UpdateAd from './components/UpdateAd';
import DeleteAd from './components/DeleteAd';
import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/add" element={<AdCreate/>} />
              <Route path="/manage" element={<ManageAds/>} />
              <Route path="/delete/:id" element={<DeleteAd/>} />
              <Route path="/update/:id" element={<UpdateAd/>} />
              <Route path="/" element={<AllAds/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
