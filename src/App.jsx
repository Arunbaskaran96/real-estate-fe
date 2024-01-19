import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signIn/Signin";
import Signup from "./pages/signUp/Signup";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/layout" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
