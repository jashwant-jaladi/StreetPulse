"use client"
import React, { useEffect, useState } from "react"
import  {createContext, useContext} from "react"
import axios from "axios"

const appContext =createContext()

const AppProvider = ({children}) =>{
    const [products,setProducts]=useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/shop').then((res) => {
          setProducts(res.data);
        }),[]
      })
    return <appContext.Provider value={products}>{children}</appContext.Provider>
}

const useProductContext = () => {
    return useContext(appContext);
  };
export {AppProvider, appContext, useProductContext}