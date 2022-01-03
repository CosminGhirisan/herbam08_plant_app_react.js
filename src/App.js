import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";


import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import AddPlant from "./Pages/AddPlant";
import Profile from "./Pages/Profile";


const Container = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/add" element={<AddPlant />}/>
        <Route exact path="/profile" element={<Profile />}/>
      </Routes>
    </Container>
  );
}

export default App;
