import { Route, Routes } from "react-router";
import { MainPage } from "../pages/MainPage/MainPage";
import { Authorization } from "../pages/Authroization/Authorization";
import { Profile } from "../pages/Profile/Profile";
import { MyPosts } from "../pages/MyPosts/MyPosts";
import { ProtectorRoute } from "../components/Routing/ProtectorRoute";

export const AppRoutes: React.FC = () => {
  const navigationRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/authorization", element: <Authorization /> },
    {
      path: "/profile",
      element: (
        <ProtectorRoute>
          <Profile />
        </ProtectorRoute>
      ),
    },
    {
      path: "/my_posts",
      element: (
        <ProtectorRoute>
          <MyPosts />
        </ProtectorRoute>
      ),
    },
  ];
  return (
    <Routes>
      {navigationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
