import { Navigate } from "react-router"
import { useSelector } from "react-redux"

const Auth = ({children}) =>{
    const user = useSelector((state)=> state.user);
    return user ? children : <Navigate to={'/signin'}/>
}
export default Auth;