import { AuthPage } from "../Pages/AuthPage"

const authRoutes = [
    {
        path: "/auth/login",
        element: <AuthPage />
    }, 
    {
        path: "/auth/register",
        element: <AuthPage />
    }, 
    {
        path: "/auth/forgot-password",
        element: <AuthPage />

    }
]

export default authRoutes