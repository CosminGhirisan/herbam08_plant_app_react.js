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

const Profile = ({ signUserOut }) => {
   const isAuth = localStorage.getItem("isAuth");

   useEffect(() => {
      if(!isAuth){
         window.location.pathname = "/login"
      }
   }, []);
   
   return (
      <Container>
         <h1>Profile</h1>
         <button onClick={signUserOut}>Log Out</button>
         <CommingSoon />
      </Container>
   )
}

export default Profile
