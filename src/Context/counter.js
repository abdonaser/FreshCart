import { createContext, useEffect, useState } from "react";


export const authContext = createContext();

export function CounterProvider({children}) {
    
const [token, setToken] = useState(null);
useEffect(()=>{
if(localStorage.getItem("token") !==null){
    setToken(localStorage.getItem("token"))
}
},[])

    return    <authContext.Provider value={{token ,setToken}}>
    {children}
    </authContext.Provider>
}