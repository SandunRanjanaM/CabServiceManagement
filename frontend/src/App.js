import './App.css';
import AddPaymentDetails from './components/AddPaymentDetails';
import Header from './components/Header';
import Payments from './components/Payments';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (

    <Router>
      <div>
        
        <Header/>
        
        <Routes>
        <Route path="/payments" exact components={Payments}/>

        </Routes>
      
      </div>
    </Router>

  )
}

export default App;
