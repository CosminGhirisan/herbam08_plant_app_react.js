import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Google } from '../assets/AllSvg';

import * as palette from '../Variables'

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

const Login = ({ setIsAuth }) => {
   let navigate = useNavigate();

   const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
         localStorage.setItem("isAuth", true);
         setIsAuth(true);
         navigate("/")
      })
   }

   return (
      <Container>
         <button onClick={signInWithGoogle}> <Google /> Sign In To Continue</button>
      </Container>
   )
}

export default Login
