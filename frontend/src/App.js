import './App.css';
import AdCreate from './components/AdCreate';
import AdPayment from './components/AdPayment';
import Header from './components/Header';
import AllAds from './components/AllAds';
import ManageAds from './components/ManageAds';
import UpdateAd from './components/UpdateAd';
import DeleteAd from './components/DeleteAd';
import ManagerDelete from './components/ManagerDelete';
import ManagerUpdate from './components/ManagerUpdate';
import {BrowserRouter as  Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
            <Routes>
              <Route path="/add" element={<AdCreate/>} />
              <Route path="/pay/:id" element={<AdPayment/>} />
              <Route path="/manage" element={<ManageAds/>} />
              <Route path="/delete/:id" element={<DeleteAd/>} />
              <Route path="/update/:id" element={<UpdateAd/>} />
              <Route path="/mdelete/:id" element={<ManagerDelete/>} />
              <Route path="/mupdate/:id" element={<ManagerUpdate/>} />
              <Route path="/" element={<AllAds/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;
