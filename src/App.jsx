import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signIn/Signin";
import Signup from "./pages/signUp/Signup";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/layout" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
