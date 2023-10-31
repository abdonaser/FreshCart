import React, { useContext } from 'react'
import { authContext } from '../../Context/counter'
import { Navigate } from 'react-router-dom'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
const {token}= useContext(authContext)
    if(token === null){
        // <Navigate to={"/login"}/>
        return <Navigate to={"/login"}/>
    }
    // else{
    //   return <Navigate to={"/product"}/>
    // }
  return <>
  {children}
  </>
}


