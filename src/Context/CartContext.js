import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const  cartContext =createContext();

export function CartContextProvider( {children}){
    const [cartProducts, setCartProducts] = useState(null);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [getCartLoading, setGetCartLoading] = useState(true);
    const [cartId, setCartId] = useState("")

   async function addProductToCart(productId){
        try{
            const {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {"productId": productId},
            {
                headers:{token : localStorage.getItem('token')}
            }) 
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            // setCartProducts(data.data.products);
            // console.log("from context",data);
            getUserCart()
            return data
            
        }catch(error){
            console.log("addProductToCart Errore =>" , error);
            
        }
    }

    async function getUserCart(){
        try {
            const {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("token") },
              })
              setCartProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
            setGetCartLoading(false)
            setCartId(data.data._id)  
              
        } catch (error) {
             console.log("getUserCart error" , error);
            
        }
    }
    useEffect(() => {
        getUserCart() 
    }, [])

    async function deleteProduct(id){

        try {
             const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers: { token: localStorage.getItem("token") },
       })
            setCartProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
       return data;
        } catch (error) {
            console.log("deleteProduct error",error);
        }
      
    }

    async function updateQuantity(id , count){
        try {
             const {data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
             {
                "count": count
            }
             ,{
        headers: { token: localStorage.getItem("token") },
       }
       )
            setCartProducts(data.data.products)
            setTotalCartPrice(data.data.totalCartPrice)
            setNumOfCartItems(data.numOfCartItems)
       return data;
        } catch (error) {
            console.log("updateQuantity error",error);
        }
      
    }


    async function removeCart(){
        try {
            const {data}= await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("token") },
              })
                 
            setCartProducts([ ])
            setTotalCartPrice(0)
            setNumOfCartItems(0)
             

        } catch (e) {
             console.log("removeCart error",e.response.data.statusMsg );
            
        }
    }


const [userEmail, setUserEmail] = useState(null)
const [infoLoading, setInfoLoading] = useState(null)


// JTW decode from Token {destructing data from tokent By JTW}


const [userId, setUserId] = useState(null)
useEffect(() => {
        if (localStorage.getItem("token") !== null ){
        const x = jwtDecode(localStorage.getItem("token"));
        setUserId(x.id);
    }
  }, []);


// function getUserID(){
//     return jwtDecode(localStorage.getItem("token"));
// }
// const x= useQuery("useId" ,getUserID,{
//     cacheTime: 1000,
//     refetchInterval: 1000,
//     enabled: true,
//   } )

//   console.log(x.data.id);


/*
    // function getCartDetails(){
    //     return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
    //   headers: { token: localStorage.getItem("token") },
    // });
    // }
    
    //         const { data, isLoading } = useQuery("getcartDetails", getCartDetails);
    //         setGetCartLoading(isLoading);
    //         setCartProducts(data?.data.products);
    //         setTotalCartPrice(data?.data.totalCartPrice);
    //         setNumOfCartItems(data?.numOfCartItems);
    //         console.log(data);
    */
    
// WishList 
// const [dataOfWishList, setdataOfWishList] = useState([])
async function getWishList() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("token") },
    });
  }

  const { data:wishlistData, isLoading:wishListLoading, isError, isFetching } = useQuery(
    "getWishList",
    getWishList,
    {
      cacheTime: 5000,
      refetchInterval: 500,
      enabled: true,
    }
  );
  



    // get All Orders
    /* 
const [orderLoading, setOrderLoading] = useState(false);
const [orders, setOrders] = useState([]);

    async function getAllOrders() {
        try {
          setOrderLoading(true);
          const { data } = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
          );
          console.log(" allorders comp ", data);
          setOrderLoading(false);
          setOrders(data);
         
        } catch (error) {
          console.log( "error from get orders contx ",error);
        }
      }
      useEffect(() => {
        getAllOrders();
      }, []);

*/
    return <cartContext.Provider value={ {
        addProductToCart, 
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        getCartLoading,
        deleteProduct,
        updateQuantity,
        removeCart,
        getUserCart,
        cartId,
        userId, 
        setUserId,
        wishlistData,
        wishListLoading,
        userEmail,
        setUserEmail,
        infoLoading
        }}>
        {children}
    </cartContext.Provider>
}