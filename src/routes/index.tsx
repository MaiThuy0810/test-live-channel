import { MainLayout } from "layouts/MainLayout/MainLayout";
import RequireAuth from "layouts/requireAuth";
import Blog from "pages/blog";
import { Navigate, useRoutes } from "react-router-dom";
import blog from "./children/blog";
import Login from "pages/login";
import LabInputPhone from "pages/lab-input-phone";

const Routes = () => {
  const routes = useRoutes([
    // {
    //   element: <MainLayout />,
    //   children: [
    //     {
    //       element: <RequireAuth />,
    //       children: [
    //         {
    //           path: "/blog",
    //           children: blog,
    //         },
    //         {
    //           path: "/blog",
    //           element: <Blog />,
    //         },
    //         {
    //           path: "/*",
    //           element: <LabInputPhone />,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   path: "/home",
    //   element: <Login />,
    // },
    {
      path: "/test-question",
      element: <LabInputPhone />,
    },
    {
      path: "/*",
      element: <Navigate to="/test-question" />,
    },
  ]);
  return routes;
};

export default Routes;
