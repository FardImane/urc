import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './user/Login';
import { Home } from './Home';
import {NextUIProvider} from "@nextui-org/system";
import {AddUser} from "./inscription/AddUser";
import {Listuser} from "./listUsers/ListUser";
// import {Logoutc} from "./Logout/Logoutc";

function App() {
  return (
    <NextUIProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/userList" element={<Listuser />} /> 
          {/* <Route path="/logout" element={<Logoutc />} /> */}
          
        </Routes>
      
    
    </BrowserRouter>
    </NextUIProvider>
   
  );
}

export default App;
