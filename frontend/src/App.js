import './App.css';
import AddPaymentDetails from './components/AddPaymentDetails';
import Header from './components/Header';
import Payments from './components/Payments';
import AllPaymentDetails from './components/AllPaymentDetails';
//import UpdatePaymentDetails from './components/UpdatePaymentDetails';
import AddReports from './components/AddReports';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AllPaymentReports from './components/AllPaymentReport';
import AddDriversPayments from './components/AddDriversPayments';

function App() {
  return (

    <Router>
      <div>
        
        <Header/>
        
        <Routes>
        <Route path="/payments" element={<Payments />} />
        <Route path="/add" element={<AddPaymentDetails />} />
        <Route path="/all" element={<AllPaymentDetails />} />
        <Route path="/addreports" element={<AddReports />} />
        <Route path="/allreports" element={<AllPaymentReports />} />
        <Route path="/adddriverpayment" element={<AddDriversPayments />} />

        


        </Routes>
      
      </div>
    </Router>

  )
}

export default App;
