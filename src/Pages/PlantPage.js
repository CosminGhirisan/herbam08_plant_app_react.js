import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { db } from '../firebase-config';
import * as palette from '../Variables';
import { LightFull, LightLow, LightPartial, Water, WaterFull, WaterHalf } from '../assets/AllSvg';

const Container = styled.div`
   height: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: start;
   overflow: scroll;

   h1{
      margin: 3rem 0 1.5rem 0;
      color: ${palette.GREEN_BG};
   }
`;

const SubContainer = styled.div`
   position: relative;
   width: 80%;
   margin-bottom: 150px;

   @media only screen and (min-width: 600px) {
      width: 400px;
   }
   /* background-color: crimson; */

   h1{
      display: block;
      text-align: center;
   }

   h5{
      display: block;
      font-style: italic;
      font-weight: 300;
      text-align: end;
   }

   h4{
      font-size: ${palette.FONTSIZE_M};
      margin-top: 20px;
   }

   p{
      text-align: justify;
      font-size: 13px;

      span{
         font-weight: 600;
      }
   }

   img{
      width: 350px;
      height: 250px;
      display: block;
      margin: auto;
      object-fit: cover;
      margin-bottom: 10px;
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

const Slideshow = styled.div`
   position: relative;
   max-width: 100%;
   margin: auto;

   .slide-number{
      position: absolute;
         top: 10px;
         right: 40px;
      color: ${palette.LIGHT_COLOR};
      font-size: ${palette.FONTSIZE_S};
      font-weight: 600;
   }

   .show{
      display: block;
   }

   .hide {
      display: none;
   }

   img{
      border-radius: 5px;
      object-fit: contain;
   }

   .prev, 
   .next{
      position: absolute;
         top: 55%;
      width: auto;
      color: ${palette.LIGHT_COLOR};
      border-radius: 50%;
      padding: 5px 10px;
      margin: -22px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.6s ease;

      :hover{
         background-color: ${palette.GREEN_BG};
      }
   }

   .prev{
      left: 50px;
   }

   .next{
      right: 50px;
   }
`;

const PlantPage = () => {
   let { plantId } = useParams();
   const [plant,setPlant] = useState([]);
   const [slideIndex, setSlideIndex] = useState(1);
   const docRef = doc(db, "plants", plantId)

   useEffect(() => {
      const getPlant = async () => {
         const data = await getDoc(docRef);
         setPlant(data.data());
      }

      getPlant();
   },[]);

   const nextSlide = () => {
      if(slideIndex !== plant.imagesUrl.length) {
         setSlideIndex(slideIndex + 1);
      } else if(slideIndex === plant.imagesUrl.length){
         setSlideIndex(1);
      }
   }

   const prevSlide = () => {
      if(slideIndex !== 1) {
         setSlideIndex(slideIndex - 1);
      } else if(slideIndex === 1){
         setSlideIndex(plant.imagesUrl.length);
      }
   }

   return (
      <Container>
         <SubContainer>
            <BackToHomePage to="/">&#9756;</BackToHomePage>
            <h1>{plant.plantName}</h1>
            <Slideshow>
               {plant.imagesUrl && plant.imagesUrl.map((imgUrl, index) => {
                  return (
                     <div className={slideIndex === index + 1 ? "show" : "hide"} >
                        <p className='slide-number'>{slideIndex} / {plant.imagesUrl.length}</p>
                        <img src={imgUrl} alt="Plant Image" />
                     </div>
                  )
               })}
               <a className="prev" onClick={prevSlide}>&#10094;</a>
               <a className='next' onClick={nextSlide}>&#10095;</a>
            </Slideshow>
            <h5>{plant.plantSpecies}</h5>
            <h4>Plant Description</h4>
            <p>{plant.plantDescription && plant.plantDescription.length > 1 ? plant.plantDescription : "-"}</p>
            <h4>Plant Care</h4>
            <p>{plant.careInstruction && plant.careInstruction.length > 1 ? plant.careInstruction : "-"}</p>
            <p>
               <span>Water:</span> {plant.water} (
               {plant.water === "Less Water Needed" 
                  ? <Water height="20px" width="20px"/> 
                  : plant.water === "Normal Water Needed" 
                  ? <WaterHalf height="20px" width="20px"/> 
                  : plant.water === "More Water Needed"
                  ? <WaterFull height="20px" width="20px"/>
                  : "No information given"})
            </p>
            <p>
               <span>Light:</span> {plant.light} (
               {plant.light === "Full Light Needed" 
                  ? <LightFull height="20px" width="20px"/> 
                  : plant.light === "Partial Light Needed" 
                  ? <LightPartial height="20px" width="20px"/> 
                  : plant.light === "Less Light Needed" 
                  ? <LightLow height="20px" width="20px"/>
                  : "No information given"})
            </p>
         </SubContainer>
      </Container>
   )
};

export default PlantPage;
