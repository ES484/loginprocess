import './App.css';
import Login from './Compnents/Login/Login';
import Navbar from './Compnents/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
function App() {
  
  return (
    <>
    <Navbar/>
   <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='login' element={<Login/>}/>
   </Routes>
    </>
  )
}

export default App;
