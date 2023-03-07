import Disease from "./components/Disease/Disease";
import Navbar from "./components/Navbar/Navbar";
import {Router,Route,BrowserRouter, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import Diabetes from "./components/Diabetes/Diabetes";
import Heart from "./components/Heart/Heart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path = "/diabetes_prediction" element={<Diabetes/>} />
        <Route path = "/heart_prediction" element={<Heart/>} />
        <Route path ="/disease_prediction" element={<Disease/>} />
        <Route path ="/sign_up" element={<SignUp/>} />
        <Route path = "/sign_in" element={<SignIn/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>   
  );
}

export default App;
