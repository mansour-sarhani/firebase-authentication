import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import {Container} from "react-bootstrap";
import {AuthProvider} from "./context/AuthProvider";
import {
    createBrowserRouter,
    RouterProvider,
    Route, createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route
            exact
            path="/"
            element={
                <PrivateRoute>
                   <Dashboard />
               </PrivateRoute>
            }
        />,
        <Route
            exact
            path="/update-profile"
            element={
                <PrivateRoute>
                    <UpdateProfile />
                </PrivateRoute>
            }
        />,
        <Route path="/signup" element={<Signup />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="/forgot-password" element={<ForgotPassword />} />,
    ])
);

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Container className="d-flex align-items-center justify-content-center vh-100">
                    <div className="w-100" style={{maxWidth: '400px'}}>
                        <RouterProvider router={router}/>
                    </div>
                </Container>
            </div>
        </AuthProvider>
    );
}

export default App;
