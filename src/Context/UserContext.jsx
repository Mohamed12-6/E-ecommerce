import { createContext, useState } from "react";

export let UserContext=createContext();

export default function UserContextProvider(props) {
    let [userLogin,setuserLogin]=useState(localStorage.getItem("ApiToken"))
    const [search , setSearch] = useState('');

    return <UserContext.Provider value={{userLogin,setuserLogin,search , setSearch}}>
        {props.children}
    </UserContext.Provider>
}