import { Fragment } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import AvocadosPage from "./pages/AvocadosPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleAvocado from "./pages/SingleAvocado";
import AddAvocado from "./pages/AddAvocado";
import AdminPage from "./pages/admin/adminpage/AdminPage";
import SignUp from "./pages/SignUp";
import FarmPage from "./pages/user/dashboard/FarmPage";
import { AvocadoLoader } from "./loader/AvocadoLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/avocados/list" element={<AvocadosPage />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/farmpage" element={<FarmPage />} />

        <Route
          path="/details/:id"
          element={<SingleAvocado />}
          loader={AvocadoLoader}
        />
        <Route path="/post" element={<AddAvocado />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Fragment>
  )
);
const Routes = () => {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default Routes;
