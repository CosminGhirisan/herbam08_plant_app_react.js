import React from 'react'

const Home = () => {
   const isAuth = localStorage.getItem("isAuth");
   
   return (
      <>
         {!isAuth ? window.location.pathname = "/login" : // I can still use useNavigate, but I made it in a different way
            <h1>Home</h1>
         }

      </>
   )
}

export default Home
