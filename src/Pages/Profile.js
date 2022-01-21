import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useUserAuth } from '../userAuthContext';

import * as palette from '../Variables';


const Container = styled.div`
   height: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   overflow: scroll;

   h1{
      margin: 3rem 0;
   }
`;

const Logout = styled.button`
   background-color: ${palette.LIGHT_COLOR};
   color: ${palette.GREEN_BG};
   border: 1px solid ${palette.GREEN_BG};
   border-radius: 3px;
   padding: 10px 20px;
   font-size: 16px;
   font-weight: bold;
   letter-spacing: .5px;
   text-decoration: none;
   text-transform: uppercase;

   :hover{
      background-color: ${palette.GREEN_BG};
      color: ${palette.LIGHT_COLOR};
      cursor: pointer;
   }
`;

const Profile = () => {
   const { signUserOut, user } = useUserAuth();
   
   return (
      <Container>
         <h1>{user && user.displayName}</h1>
         <Logout onClick={signUserOut}>Log Out</Logout>
      </Container>
   )
}

export default Profile
