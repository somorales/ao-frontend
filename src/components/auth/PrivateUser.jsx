import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"


function PrivateUser(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return props.children 
  } else {
    return <Navigate to={"/login"} replace={true} />
  }

}

export default PrivateUser