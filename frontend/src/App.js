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
import PaymentManagerHome from './components/PaymentManagerHome';
import Reports from './components/Reports';
import AllDriverPayments from './components/AllDriverPayments';
import UDcuspayments from './components/UDcuspayments';

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
        <Route path="/home" element={<PaymentManagerHome />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/alldriverpayments" element={<AllDriverPayments />} />
        <Route path="/get/:id" element={<UDcuspayments />} />
        


        </Routes>
      
      </div>
    </Router>

  )
}

export default App;
