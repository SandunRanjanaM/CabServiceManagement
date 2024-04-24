import './App.css';
import Allsystemusers from './components/AllsystemUsers';
import Addsystemusers from './components/Addsystemusers';
import SystemUsersTable from './components/SystemUsersTable';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>

        <Header/>

        <Routes>
          <Route path="/" exact element={<Allsystemusers/>}/>
        </Routes>
        
        <Routes>
          <Route path='/add' exact element={<Addsystemusers/>} />
        </Routes>

        <Routes>
          <Route path='/update' exact element={<Allsystemusers/>}/>
        </Routes>

      </div>
    </Router>
  );
}

export default App;
