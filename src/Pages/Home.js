import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Link } from 'react-router-dom';

import * as palette from '../Variables';
import { auth, db } from '../firebase-config'
import logo from '../assets/images/logo.png'


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

const Plants = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: start;
   flex-wrap: wrap;
   width: 80%;

   @media only screen and (min-width: 600px) {
      width: 400px;
   }

   h2{
      width: 100%;
      color: ${palette.GREEN_BG};
      margin: 10px;
   }
`;

const Plant = styled(Link)`
   width: 100px;
   min-height: 140px;
   background: ${palette.LIGHT_COLOR};
   margin: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 5px;
   border: 2px solid transparent;
   text-decoration: none;

   :hover{
      cursor: pointer;
      border: 2px solid ${palette.GREEN_BG};
   }

   img{
      display: block;
      width: 90px;
      height: 90px;
      /* background: #9c9cee; */
      border-radius: 15px;
      margin-top: 5px;
      overflow: hidden;
   }

   h5{
      color: ${palette.GREEN_BG};
      margin: 10px 0 5px 0;
      font-size: ${palette.FONTSIZE_XS};
      text-align: center;
   }

   .plant-location{
      font-size: 11px;
      font-weight: lighter;
      color: ${palette.GRAY_COLOR};
      margin-bottom: 5px;
   }

   .year{
      align-self: flex-end;
      color: ${palette.GREEN_BG};
      font-size: 9px;
      margin-right: 5px;
      margin-bottom: 5px;
   }
`;

const Home = () => {
   const [plantsList, setPlantsList] = useState([]);
   const plantsCollectionRef = collection(db, "plants")

   useEffect(() => {
      const q = query(plantsCollectionRef, orderBy("timestamp", "desc"))

      const getPlants = async () => {
         const data = await getDocs(q);
         setPlantsList(data.docs.map((doc) => ({...doc.data(), id:doc.id})));         
      }

      getPlants();
   },[])
   
   return (
      <Container>
         <h1>HOME</h1>
         <Plants>
            <h2>My plants</h2>
            {plantsList.map((plant) => {
               return (
                  <>
                     {plant.author.id === auth.currentUser.uid && (
                        <Plant key={plant.id} to={plant.id}>
                           {plant.imagesUrl ? <img src={plant.imagesUrl[0]} alt="plant" /> : <img src={logo} alt='test'/>}
                           <h5>{plant.plantName ? plant.plantName : <br/>}</h5>
                           <p className='plant-location'>{plant.plantLocation ? plant.plantLocation : <br/>}</p>
                           <p className='year'>{plant.year}</p>
                        </Plant>)}
                  </> 
               )
            })}
         </Plants>
      </Container>
   )
}

export default Home
