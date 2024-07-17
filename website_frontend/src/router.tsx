
import { createBrowserRouter } from 'react-router-dom'
import Page from './pages/Home';
import LoginPage from './pages/Login';
import PageRegister from './pages/Register';
const router = createBrowserRouter([{
    path: "/",
    element: <Page />,
},
{
    path: "/login", element: <LoginPage />
},
{
    path: "/register", element: <PageRegister />
}
])
export { router }
