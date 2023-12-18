import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './user/Login';
import { Home } from './Home';
import {NextUIProvider} from "@nextui-org/system";
import {AddUser} from "./inscription/AddUser";
import {Listuser} from "./listUsers/ListUser";
import {ListUserComponent} from "./listUsers/ListUser";
import {ListMessage} from "./messagerie/listMessages";
// import {Logoutc} from "./Logout/Logoutc";
import {UserPage} from "./user/userPag";

function App() {
  return (
    <NextUIProvider>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/ListUser" element={<ListUserComponent />} />
          <Route path="/messagerie" element={<ListMessage />} />
          <Route path="/navBare" element={<UserPage />} />
          {/* <Route path="/logout" element={<Logoutc />} /> */}
        </Routes>
      
    
    </BrowserRouter>
    </NextUIProvider>
   
  );
}

export default App;
