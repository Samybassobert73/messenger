

import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Messenger from "./pages/Messenger/Messenger";
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<Login />} />
    <Route path="/register"  element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/messenger" element={<Messenger />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
