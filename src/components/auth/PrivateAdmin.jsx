import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function PrivateAdmin(props) {

  const { isLoggedIn, isAdmin } = useContext(AuthContext)

  if (isLoggedIn && isAdmin) {
    return props.children 
  } else {
    return <Navigate to={"/login"}/>
    //mensaje de error como no eres admi
  }

}

export default PrivateAdmin