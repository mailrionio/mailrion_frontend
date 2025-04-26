/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import TopNav from "./components/TopNav";
import Sidebar from "./pages/Organization/Sidebar";
import { setAdminToken } from "./redux/features/userSlice";
import { dispatch, useAppSelector } from "./redux/store";

interface AuthenticatedProps {
  component: React.ComponentType<any>;
  authenticationPath?: string;
}

export const Authenticated: React.FC<AuthenticatedProps> = ({
  component: Component,
}) => {
  const auth = useAppSelector((state) => state.user.adminToken);
  if (auth) {
    const redirect = localStorage.getItem("redirect");
    if (redirect) {
      const link = localStorage.getItem("redirect_link");
      return <Navigate to={link as string} replace />;
    } else {
      return <Navigate to="/organizations" replace />;
    }
  }

  return <Component />;
};

// export const SubAuthenticated: React.FC<AuthenticatedProps> = ({
//   component: Component,
// }) => {
//   const auth = useAppSelector((state) => state.user.subAccountToken);
//   if (auth) {
//     const redirect = localStorage.getItem("redirect");
//     if (redirect) {
//       const link = localStorage.getItem("redirect_link");
//       return <Navigate to={link as string} replace />;
//     } else {
//       return <Navigate to="/sub-account/dashboard" replace />;
//     }
//   }

//   return <Component />;
// };

// export const SubAccountPrivateRoute = () => {
//   const auth = useAppSelector((state) => state.user.subAccountToken);
//   const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

//   const currentPath = window.location.pathname;
//   const queryString = window.location.search;
//   const pathname = currentPath + queryString;
//   if (!auth && auth !== "undefined") {
//     const rememberMe = localStorage.getItem("rememberMe");
//     if (rememberMe === "true") {
//       const token = localStorage.getItem("mailrionSubAccountToken");
//       if (!token) {
//         localStorage.setItem("redirect", "true");
//         localStorage.setItem("redirect_link", pathname);
//         return <Navigate to="/sub-account/login" replace />;
//       } else {
//         dispatch(setSubAccountToken(token));
//       }
//     } else {
//       localStorage.setItem("redirect", "true");
//       localStorage.setItem("redirect_link", pathname);
//       return <Navigate to="/sub-account/login" replace />;
//     }
//   }
//   return (
//     <>
//       <SubAccountTopNav openSidebar={() => setToggleSidebar(!toggleSidebar)} />

//       <SubAccountSidebar
//         toggleSidebar={toggleSidebar}
//         closeSidebar={() => setToggleSidebar(!toggleSidebar)}
//       >
//         <Outlet />
//       </SubAccountSidebar>
//     </>
//   );
// };

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.user.adminToken);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const currentPath = window.location.pathname;
  const queryString = window.location.search;
  const pathname = currentPath + queryString;
  if (!auth && auth !== "undefined") {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe === "true") {
      const token = localStorage.getItem("mailrionAdminToken");
      if (!token) {
        localStorage.setItem("redirect", "true");
        localStorage.setItem("redirect_link", pathname);
        return <Navigate to="/login" replace />;
      } else {
        dispatch(setAdminToken(token));
      }
    } else {
      localStorage.setItem("redirect", "true");
      localStorage.setItem("redirect_link", pathname);
      return <Navigate to="/login" replace />;
    }
  }
  return (
    <>
      <TopNav openSidebar={() => setToggleSidebar(!toggleSidebar)} />

      <Sidebar
        toggleSidebar={toggleSidebar}
        closeSidebar={() => setToggleSidebar(!toggleSidebar)}
      >
        <Outlet />
      </Sidebar>
    </>
  );
};

interface OtherPrivateRouteProp {
  showTopNav?: boolean
}

export const OtherPrivateRoute: React.FC<OtherPrivateRouteProp> = ({ showTopNav }) => {
  const auth = useAppSelector((state) => state.user.adminToken);
  const currentPath = window.location.pathname;
  const queryString = window.location.search;
  const pathname = currentPath + queryString;
  if (!auth && auth !== "undefined") {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe === "true") {
      const token = localStorage.getItem("mailrionAdminToken");
      if (!token) {
        localStorage.setItem("redirect", "true");
        localStorage.setItem("redirect_link", pathname);
        return <Navigate to="/login" replace />;
      } else {
        dispatch(setAdminToken(token));
      }
    } else {
      localStorage.setItem("redirect", "true");
      localStorage.setItem("redirect_link", pathname);
      return <Navigate to="/login" replace />;
    }
  }
  return (
    <>
      {showTopNav && <TopNav
        openSidebar={() => {
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?openSidebar=true`
          );
          window.location.reload();
        }}
      />}

      <Outlet />
    </>
  );
};

export default PrivateRoute;
