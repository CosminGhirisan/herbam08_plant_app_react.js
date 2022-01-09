import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addDoc, collection } from "firebase/firestore"

import * as palette from '../Variables';
import { db, auth } from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { LightFull, LightLow, LightPartial, Water, WaterFull, WaterHalf } from '../assets/AllSvg';


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

const Form = styled.div`
   width: 80%;

   @media only screen and (min-width: 600px) {
      width: 400px;
   }

   ul{
      list-style:none;
      padding:0;
      margin:0;

      li{
         padding: 5px 0;
         margin-bottom: 10px;
      }

      input{
         background: transparent;
         color: #fff;
         font-size: ${palette.FONTSIZE_S};
         line-height: 25px;
         border: none;
         box-sizing: border-box;
         -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
         outline: none;

         ::placeholder{
            color: #ffffff90;
         }
      }

      textarea{
         width: calc(100% - 10px);
         background: transparent;
         color: #fff;
         border: 1px solid ${palette.GREEN_BG};
         border-radius: 3px;
         padding: 5px;
         font-size: ${palette.FONTSIZE_XS};
         line-height: 15px;
         overflow: scroll;
         resize: none;

         ::placeholder{
            color: #ffffff90;
         }
      }

      select {
         color: ${palette.GREEN_BG};
         background-color: ${palette.LIGHT_COLOR};
         border: 1px solid ${palette.GREEN_BG};
         border-radius: 3px;
         padding: 0.35em 1.5em 0.35em 0.5em;
         outline: 0;
      }

      button{
         width: 100%;
         background: ${palette.LIGHT_COLOR};
         color: ${palette.GREEN_BG};
         padding: 0.7rem;
         margin-bottom: 5rem;
         border: none;
         border-radius: 5px;
         font-weight: bold;
         text-decoration: none;
         cursor: pointer;
      }
   }

   h4{
      margin-bottom: 10px;
      color: ${palette.LIGHT_COLOR};
   }

   .inlineInfo{
         display: flex;
         flex-wrap: wrap;
         justify-content: space-between;
   }

   .lineBorderFull{
      border-bottom: 1px solid ${palette.GREEN_BG};
      width: 100%;
      display: block;
   }

   .lineBorder{
      border-bottom: 1px solid ${palette.GREEN_BG};
      width: 45%;
   }

   #preview{
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      
      img{
         width: 80px;
         height: 80px;
         margin: 5px;
      }
   }

   .form-input{
      width: 100%;
      margin: 0 auto;

      input{
         display: none;
      }

      label{
         display: block;
         width: 55%;
         height: 45px;
         margin: auto;
         text-align: center;
         line-height: 45px;
         background: ${palette.GREEN_BG};
         color: ${palette.LIGHT_COLOR};
         font-size: ${palette.FONTSIZE_XS};
         font-weight: bold;
         border-radius: 5px;
         cursor: pointer;
      }
   }
`;

const Checkboxes = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
   padding: 5px 0;

   label{
      position: relative;
      display: flex; 
      justify-content: space-between;
      margin: 0 3px;
      text-align: center;
      
      input[type="radio"]{
         position: absolute;
         opacity: 0;
         cursor: pointer;
      }
   }

   .icon-box{
      width: 20px;
      height: 20px;
      background: transparent;
      border-radius: 5px;
      padding: 3px;
      box-shadow: -1px -1px 3px rgba(255,255,255,0.5), 
                  1px 1px 4px rgba(17,73,59,0.7),
                  inset 0 0 5px rgba(17,73,59,0.4);
   }

   label input[type="radio"]:checked ~ .icon-box{
      box-shadow: inset -2px -2px 5px rgba(255,255,255,0.5), 
                  inset 1px 1px 4px rgba(17,73,59,0.7);
   }
`;

const AddPlant = () => {
   const [plantSpecies, setPlantSpecies] = useState('');
   const [plantName, setPlantName] = useState("");
   const [plantLocation, setPlantLocation] = useState("");
   const [plantDescription, setPlantDescription] = useState("");
   const [careInstruction, setCareInstruction] = useState("");
   const isAuth = localStorage.getItem("isAuth");
   const plantsCollectionRef = collection(db, "plants");
   let navigate = useNavigate();

   const showPreview = (event) => {
      if(event.target.files.length > 0){
         const imageAmount = event.target.files.length;
         const uploadBtn = document.getElementById("upload-btn").innerText = "Add More";

         for(let i=0; i < imageAmount; i++) {
            const src = URL.createObjectURL(event.target.files[i]);
            const preview = document.getElementById("preview").innerHTML += '<img src="'+src+'">';
         }
      }
   }

   const addNewPlant = async () => {
       await addDoc(plantsCollectionRef, {
         plantSpecies, 
         plantName, 
         plantLocation, 
         plantDescription, 
         careInstruction, 
         author: { 
            name: auth.currentUser.displayName, 
            id: auth.currentUser.uid 
         }
      });
      navigate("/");
   }

   return (
      <Container>
         <h1>Add A New Plant</h1>
         <Form>
            <ul>
               <li>
                  <h4>Information</h4>
                  <input type="text" name="Species" placeholder='Your plant species...' className='lineBorderFull' onChange={(event) => {setPlantSpecies(event.target.value)}}/>
               </li>
               <li className='inlineInfo'>
                  <input  type="text" name="Name" placeholder='Plant Name...'className='lineBorder' onChange={(event) => {setPlantName(event.target.value)}}/>
                  <input  type="text" name="Location" placeholder='Location...'className='lineBorder' onChange={(event) => {setPlantLocation(event.target.value)}}/>
               </li>
               <li>
                  <h4>Description</h4>
                  <textarea name="Description" cols="30" rows="5" placeholder='Description of your plant...' onChange={(event) => {setPlantDescription(event.target.value)}}></textarea>
               </li>
               <li>
                  <h4>Care Instruction</h4>
                  <textarea name="CareInstruction" cols="30" rows="2" placeholder='Care Instruction...' onChange={(event) => {setCareInstruction(event.target.value)}}></textarea>
                  <div className='inlineInfo'>
                     <Checkboxes>
                        <label>
                           <input type="radio" name="radioBtn-light"/>
                           <div className="icon-box">
                              <LightFull />
                           </div>
                        </label>
                        <label>
                           <input type="radio" name="radioBtn-light"/>
                           <div className="icon-box">
                              <LightPartial />
                           </div>
                        </label>
                        <label>
                           <input type="radio" name="radioBtn-light"/>
                           <div className="icon-box">
                              <LightLow />
                           </div>
                        </label>
                     </Checkboxes>
                     <Checkboxes>
                        <label>
                           <input type="radio" name="radioBtn-water"/>
                           <div className="icon-box">
                              <Water />
                           </div>
                        </label>
                        <label>
                           <input type="radio" name="radioBtn-water"/>
                           <div className="icon-box">
                              <WaterHalf />
                           </div>
                        </label>
                        <label>
                           <input type="radio" name="radioBtn-water"/>
                           <div className="icon-box">
                              <WaterFull />
                           </div>
                        </label>
                     </Checkboxes>
                  </div>
               </li>
               <li>
                  <h4>Images</h4>
                  <div className="form-input">
                     <div id="preview">

                     </div>
                     <label htmlFor="file-id" id="upload-btn">Upload Image</label>
                     <input type="file" multiple id='file-id' accept='image/*' onChange={(event) => showPreview(event)} />
                  </div>
               </li>
               <li>
                  <button onClick={addNewPlant}>Add Plant</button>
               </li>
            </ul>
         </Form>
      </Container>
   )
}

export default AddPlant
