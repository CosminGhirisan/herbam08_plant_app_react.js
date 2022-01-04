import React from 'react'

const Profile = ({ signUserOut }) => {
   const isAuth = localStorage.getItem("isAuth");
   return (
      <>
         {!isAuth ? window.location.pathname = "/login" :
         <>
            <h1>Profile</h1>
            <button onClick={signUserOut}>Log Out</button>
         </>
         }
      </>
   )
}

export default Profile
