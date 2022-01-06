import React from 'react'
import styled from 'styled-components';

const CommingSoon = () => {
   return (
      <Box>
         <h2>Comming soon...</h2>
      </Box>
      
   )
}

const Box = styled.div`
   position: absolute;
   top: 30%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 30vw;
   height: 3rem;
   background-color: #cee8fa50;
   border: 5px solid #117540;
   border-radius: 2px;

   @media only screen and (max-width: 768px){
      width: 60vw;
   }

   h2{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #cee8fa;
      font-family: 'Josefin Sans', sans-serif;
      font-variant: small-caps;
      letter-spacing: 2px;
   }
`;

export default CommingSoon
