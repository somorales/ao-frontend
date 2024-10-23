import { createContext, useEffect, useState } from "react";
import service from "../services/config";
import Loading from "../components/Loading";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get("/auth/verify");

      console.log(response);

      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setIsValidatingToken(false);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);

      setIsAdmin(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    isAdmin,
  };
  if (isValidatingToken) {
    return (
      <div className="bg-ao my-auto">
        <div className="bg-ao mx-auto">
          <Loading isLoading={true}></Loading>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
