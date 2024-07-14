import { useUserContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { checkAuthUser } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const checkU = async () => {
    const pro = await checkAuthUser();
    setIsAuthenticated(pro)
  };
  useEffect(() => {
    checkU()
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col flex-1 justify-center items-center py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block bg-no-repeat h-screen w-1/2 object-cover"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
