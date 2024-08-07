import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../types";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const Authcontext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setisLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      const currentAccout = await getCurrentUser();

      if (currentAccout) {
        
        setUser({
          id: currentAccout.$id,
          name: currentAccout.name,
          username: currentAccout.username,
          email: currentAccout.email,
          imageUrl: currentAccout.imageUrl,
          bio: currentAccout.bio,
        });

        setIsAuthenticated(true);

        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    //
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null ||
      !localStorage.getItem("cookieFallback")
    ) {
      navigate("sign-in");
      return;
    }

    checkAuthUser();
  }, []);

  const values = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <Authcontext.Provider value={values}>{children}</Authcontext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(Authcontext);
