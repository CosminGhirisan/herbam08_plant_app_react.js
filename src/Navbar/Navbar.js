import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

import * as palette from '../Variables';
import logo from '../assets/images/logo.png'
import profile from '../assets/images/profile.png'
import { AddPlant } from '../assets/AllSvg';



const Container = styled.div`
   position: fixed;
   bottom: 0;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   width: 100%;
   height: 5rem;
   background-color: ${palette.LIGHT_COLOR};
   border-top-left-radius: 2rem;
   border-top-right-radius: 2rem;
`;

const MainBtn = styled.button`
   background: transparent;
   padding: 0.25rem;
   border: none;
   text-decoration: none;
   cursor: pointer;
   transition: all 500ms ease;

   :hover{
      transform: scale(1.3);
   }
   :active{
      transform: scale(1);
   }
`;

const AddBtn = styled.button`
   background: ${palette.LIGHT_COLOR};
   padding: 1.5rem;
   margin-bottom: 2rem;
   border: none;
   border-radius: 50%;
   box-shadow: 0px 11px 18px 0px #fff;
   text-decoration: none;
   cursor: poiner;
   transition: all 500ms ease;

   :hover{
      transform: scale(1.1);
   }
   :active{
      transform: scale(1);
   }
`;

const ProfileBtn = styled.button`
   background: transparent;
   padding: 0.25rem;
   border: none;
   text-decoration: none;
   cursor: pointer;
   transition: all 500ms ease;

   :hover{
      transform: scale(1.3);
   }
   :active{
      transform: scale(1);
   }
`;

const Navbar = () => {
   return (
      <Container>
         <MainBtn>
            <Link to="/">
            <img src={logo} width="50px" height="auto"/>
            </Link>
         </MainBtn>
         <AddBtn>
            <Link to="/add">
               <AddPlant width={50} height={50} fill="#fff" />
            </Link>
         </AddBtn>
         <ProfileBtn>
            <Link to="/profile">
               <img src={profile} width="50px" height="auto"/>
            </Link>
         </ProfileBtn>
      </Container>
   )
}

export default Navbar
