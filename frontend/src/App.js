import './App.css';
import AddPaymentDetails from './components/AddPaymentDetails';
import Header from './components/Header';
import Payments from './components/Payments';
import AllPaymentDetails from './components/AllPaymentDetails';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (

    <Router>
      <div>
        
        <Header/>
        
        <Routes>
        <Route path="/payments" element={<Payments />} />
        <Route path="/add" element={<AddPaymentDetails />} />
        <Route path="/all" element={<AllPaymentDetails />} />

        </Routes>
      
      </div>
    </Router>

  )
}

export default App;
