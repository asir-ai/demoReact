import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import UserPage from "./pages/UserPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditUserPage from "./pages/User/EditUserPage";
import UserDetailPage from "./pages/User/UserDetailPage";
import CreateUserPage from "./pages/User/CreateUserPage";
import PaymentSuccessPage from "./pages/payment/PaymentSuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      { index: true, element: <HomePage/> },
      { path: "dashboard", element: <DashboardPage/> },
      { path: "users", element: <UserPage/> },
      { path: "users/:userId", element: <UserDetailPage/> },
      { path: "users/:userId/edit", element: <EditUserPage/> },
      { path: "users/create", element: <CreateUserPage/> },
      { path: "payment-success", element: <PaymentSuccessPage/> }
    ],
  },
]);

const queryClient = new QueryClient()

export default function App() {
  return <QueryClientProvider client={queryClient}><RouterProvider router={router}/></QueryClientProvider>
}