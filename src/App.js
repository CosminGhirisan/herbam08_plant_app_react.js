import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "./globalStyles";
import Navbar from "./Navbar/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddPlant from "./Pages/AddPlant";
import Profile from "./Pages/Profile"
import ProtectedRoute from './Components/ProtectedRoute'
import { UserAuthContextProvider } from "./userAuthContext";
import PlantPage from "./Pages/PlantPage";


const Container = styled.div`
  height: 100vh;
`;

function App() {
  
  return (
    <Container>
      <GlobalStyle />
      <UserAuthContextProvider>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={
            <ProtectedRoute>
              <AddPlant />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>
          <Route 
            path=":plantId" element= {
              <ProtectedRoute>
                <PlantPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
