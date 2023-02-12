import React from 'react';
import  {Navigate, Route, Routes} from "react-router-dom";

function ProtectedRouteElement({ component: Component, ...props  }) {
  return (
    
   
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up" replace/>
    
   
)}

export default ProtectedRouteElement;