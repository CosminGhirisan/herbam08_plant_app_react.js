import React from 'react';
import styled from 'styled-components';


import * as palette from '../Variables'
import { Google } from '../assets/AllSvg';
import { useUserAuth } from '../userAuthContext';

const Container = styled.div`
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;

   button{
      display: flex;
      align-items: center;
      color: ${palette.GREEN_BG};
      background-color: transparent;
      border: 1px solid ${palette.GREEN_BG};
      border-radius: 5px;
      padding: 0.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 500ms ease;

      :hover{
         color: ${palette.LIGHT_COLOR};
         background-color: ${palette.GREEN_BG};
      }

      :active{
         transform: scale(0.95);
      }

      svg{
         margin-right: 0.5rem;
      }
   }
`;

const Login = () => {
   const { signInWithGoogle } = useUserAuth();

   return (
      <Container>
         <button onClick={signInWithGoogle}> <Google /> Sign In To Continue</button>
      </Container>
   )
}

export default Login
