import axios from "axios";
import { createContext, useState } from "react";

export let WishlistContext = createContext()


export default function WishlistProvider(props) {
    let headers = {
        token: localStorage.getItem("ApiToken")
    }

    let [Best, setBest] = useState(null)
    const [wishlistItems, setWishlistItems] = useState([]);

    function getWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers }
        ).then((response) => response)
            .catch((error) => error)
    }
    function addWishlist(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId: id },
            { headers }
        )

            .then((response) => response)
            .catch((error) => error)
    }
    function deleteFromWish(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {headers}
        ).then((response)=>response)
        .catch((error)=>error)
    }

    return <WishlistContext.Provider value={{ getWishList, Best, setBest, wishlistItems, setWishlistItems, addWishlist, deleteFromWish }}>
        {props.children}
    </WishlistContext.Provider>
}