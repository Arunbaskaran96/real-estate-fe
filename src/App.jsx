import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/signIn/Signin";
import Signup from "./pages/signUp/Signup";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import ProtectedLayout from "./components/protectedlayout/ProtectedLayout";
import Createlisting from "./pages/create-listing/Createlisting";
import Listing from "./pages/listing/Listing";
import Updatelisting from "./pages/updatelisting/UpdateListing";
import Search from "./pages/search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/layout" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-listing" element={<Createlisting />} />
            <Route path="listing/:id" element={<Listing />} />
            <Route path="update-listing/:id" element={<Updatelisting />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
