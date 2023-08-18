import {Routes,Route} from "react-router-dom";
import Signup from "./Signup";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  return (
    <Routes>
      <Route path="/:mail" element={<Chat/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/" element={<Login/>}/>
    </Routes>
  );
}

export default App;
