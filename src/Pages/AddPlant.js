import React from 'react'
import styled from 'styled-components'

import * as palette from '../Variables';


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

const Form = styled.form`

   ul{
      list-style:none;
      padding:0;
      margin:0;

      li{
         padding: 5px 0;
         margin-bottom: 10px;
         display: flex;
         justify-content: space-between;
         
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
         width: 100%;
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
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img{
         width: 80px;
         height: 80px;
         margin: 5px;
      }
   }

   .form-input{
      width: 60%;
      padding: 15px;
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

const AddPlant = () => {

   const showPreview = (event) => {
      console.log(event.target)
      if(event.target.files.length > 0){
         const imageNo = event.target.files.length;
         console.log(imageNo)
         for(let i=0; i < imageNo; i++) {
            const src = URL.createObjectURL(event.target.files[i]);
            const preview = document.getElementById("preview")
            preview.innerHTML += '<img src="'+src+'">';
         }
      }
   }

   return (
      <Container>
         <h1>Add A New Plant</h1>
         <Form>
            <ul>
               <li >
                  <input type="text" name="Species" placeholder='Plant Species*' className='lineBorderFull'/>
               </li>
               <li >
                  <input  type="text" name="Name" placeholder='Plant Name'className='lineBorder'/>
                  <input  type="text" name="Age" placeholder='Age (Optional)'className='lineBorder'/>
               </li>
               <li>
                  <textarea name="Information" id="" cols="30" rows="5" placeholder='Information about your plant (Optional)'></textarea>
               </li>
               <li>
                  <input type="text" name="Light" placeholder='Light'/>
                  <input type="text" name="Water" placeholder='Water'/>
               </li>
               <li>
                  <div className="form-input">
                     <div id="preview">

                     </div>
                     <label htmlFor="file-id">Upload Image</label>
                     <input type="file" multiple id='file-id' accept='image/*' onChange={(event) => showPreview(event)} />
                  </div>
               </li>
               <li>
                  <button>Add Plant</button>
               </li>
            </ul>
         </Form>
      </Container>
   )
}

export default AddPlant
