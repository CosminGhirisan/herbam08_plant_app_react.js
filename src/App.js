import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

import GlobalStyle from "./globalStyles";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddPlant from "./Pages/AddPlant";
import Profile from "./Pages/Profile"
import { auth } from "./firebase-config";


const Container = styled.div`
  height: 100vh;
`;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("isAuth");
      setIsAuth(false);
      navigate("/login");
    })
  }

  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route exact path="/add" element={<AddPlant />}/>
        <Route exact path="/profile" element={<Profile signUserOut={signUserOut} />}/>
      </Routes>
    </Container>
  );
}

export default App;
