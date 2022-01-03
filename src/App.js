import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";


import Home from "./Pages/Home";


const Container = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </Container>
  );
}

export default App;
