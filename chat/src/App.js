import './App.css';
import Join from "./component/Join/Join"
import Chat from "./component/chat/chat.jsx"

import {
  BrowserRouter ,
   Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";



function App() {

  
  return (
    <div className="App">
        <BrowserRouter>

    <Routes>

<Route path="/" element={<Join />} /> 

<Route path="/chat" element={<Chat />} />
</Routes>
</BrowserRouter>

    </div>
  );
}

export default App;
