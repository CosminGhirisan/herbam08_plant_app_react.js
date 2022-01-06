import React, { useEffect } from 'react'
import styled from 'styled-components';
import CommingSoon from '../subComponents/CommingSoon';

const Container = styled.div`
   height: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: start;
   overflow: scroll;

   h1{
      margin: 3rem 0;
   }
`;

const Home = () => {
   const isAuth = localStorage.getItem("isAuth");

   useEffect(() => {
      if(!isAuth) {
         window.location.pathname = "/login"
      }
   }, [])
   
   return (
      <Container>
         <h1>Home</h1>
         <CommingSoon />
      </Container>
   )
}

export default Home
