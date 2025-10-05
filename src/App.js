import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Congrats from "./pages/Congrats";
import ElectionDetails from "./pages/ElectionDetails";
import Election from "./pages/Election";
import Candidates from "./pages/Candidates";
import Results from "./pages/Results";
import Logout from "./pages/Logout";




const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,

    children:[
      {
      index: true,
      element: <Login/>
      },
 {
    path: "register",
    element: <Register/>,
 },
 {
    path: "results",
    element: <Results/>,
 },
 {
    path: "elections",
    element: <Election/>,
 },
 {
    path: "elctions/:id",
    element: <ElectionDetails/>,
 },
 {
    path: "election/:id/candidates",
    element: <Candidates/>,
 },
 {
    path: "congrats",
    element: <Congrats/>,
 },
 {
    path: "Logout",
    element: <Logout/>,
 },

    ]

  }
])

function App() {
  
    return (<RouterProvider router={router} />);

 
}

export default App;
