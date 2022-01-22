import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { db } from '../firebase-config';
import * as palette from '../Variables'

const Container = styled.div`
   height: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: start;
   overflow: scroll;

   h1{
      margin: 3rem 0;
      color: ${palette.GREEN_BG};
   }
`;

const SubContainer = styled.div`
   position: relative;
   width: 80%;

   @media only screen and (min-width: 600px) {
      width: 400px;
   }

   /* background: red; */

   h1{
      display: block;
      text-align: center;
   }
`;

const BackToHomePage = styled(Link)`
   position: absolute;
      top: 10px;
      left: 20px;
   color: ${palette.GREEN_BG};
   font-size: 30px;
   text-decoration: none;
   align-self: flex-start;

   :hover{
      color: ${palette.LIGHT_COLOR};
   }
   /* background-color: red; */
`;

const PlantPage = () => {
   let { plantId } = useParams();
   const [plant,setPlant] = useState([]);
   const docRef = doc(db, "plants", plantId)

   useEffect(() => {
      const getPlant = async () => {
         const data = await getDoc(docRef);
         setPlant(data.data());
      }

      getPlant();
   },[])

   return (
      <Container>
         <SubContainer>
            <BackToHomePage to="/">&#9756;</BackToHomePage>
            <h1>{plant.plantName}</h1>
         </SubContainer>
      </Container>
   )
};

export default PlantPage;
