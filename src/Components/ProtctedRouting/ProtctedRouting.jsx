import { Navigate } from "react-router-dom"

export default function ProtctedRouting(props) {
    if (localStorage.getItem("ApiToken")!==null) {
        return props.children 
    }
    else{
        return <Navigate to={"/login"}></Navigate>
    }

}

