import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import SignIn from "../pages/SignIn";

// const routes = [
//     {
//         path: '/',
//         element: <RootLayout />,
//         children: [
//             { index : true, element: <SignIn /> },
//             { path : '/sign-up', element: <SignIn /> },
//         ]
//     }
// ]

// const router = createBrowserRouter(routes, {
//     future: {
//         v7_relativeSplatPath: true,
//         v7_fetcherPersist: true,
//         v7_normalizeFormMethod: true,
//         v7_partialHydration: true,
//         v7_skipActionStatusRevalidation: true
//     },
// })

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index : true, element: <SignIn /> },
            { path : '/sign-up', element: <SignIn /> },
        ]
    }
])

export default router