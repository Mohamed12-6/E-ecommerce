import axios from "axios"
import { createContext, useEffect, useState } from "react"

export let CartContext = createContext()

export default function CartContextProvider(props) {

    let headers = {
        token: localStorage.getItem("ApiToken")
    }

    const [cart, setCart] = useState(null);

    function addProductToCart(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
            {
                productId: productId
            }
            , {
                headers: headers
            }

        )
        .then((response) => response)
        .catch((error) => error)

    }


    function getCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`
        ,{
            headers: headers
        })
        .then((response)=>{
        return response})

        .catch((error)=>{console.log(error)
            return error})
        
    }

    // function removeCart(productId) {
    //     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    //         {
    //             headers:headers
    //         }
    //     )
    //     .then((response)=>response)
    //     .catch((error)=>error)
    // }


    async function removeCart(productId) {
  try {
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers }
    );
console.log(response)
    // بعد الحذف — هات الكارت الجديد كامل
    const updatedCart = await getCart();
    setCart(updatedCart.data);

    return updatedCart;

  } catch (error) {
    return error;
  }
}




    function updateCart(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
        ,{
            count:count
        }
        ,{
            headers:headers
        })

        .then((response)=>response)
        
        .catch((error)=>error)
    }






    async function getToCart() {
        let response=await getCart()
        setCart(response.data)
    }

    function checkout(productId,url,formValues) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${productId}?url=${url}`,
        {
            shippingAddress:formValues

        },
        {
            headers:headers
        }

    )
    .then((response)=>response)
        
    .catch((error)=>error)
    }
    async function payByCash(cartId, shippingAddress) {
        return axios
          .post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}
`,
            { shippingAddress },
            {
              headers: headers
              
            }
          )
          .then((data) => data)
          .catch((err) => err);
      }

    useEffect(()=>{
        getToCart()
    },[])
    
    return <CartContext.Provider value={{ addProductToCart ,getCart,removeCart,updateCart,cart, setCart,checkout,payByCash}}>
        {props.children}
    </CartContext.Provider>

}
