
import { createBrowserRouter } from 'react-router-dom'
import Page from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import GamesPage from '../pages/Games'
import ReactionGame from '../games/ReactionGame';
import ProtectedRoute from './ProtectedRoute';
import NotAuthorized from '../components/NotAuthorized';
const router = createBrowserRouter([{

    path: "/",
    element: <Page />,
},
{
    element: <ProtectedRoute />,
    children: [
        {
            path: "/games", element: <GamesPage />
        },
        {
            path: "/reactiongame", element: <ReactionGame />
        },
    ]
},
{
    path: "/login", element: <LoginPage />
},
{
    path: "/register", element: <RegisterPage />
},
{
    path: "/notAuthorized",element: <NotAuthorized/>
},
{
    path: "*",
    element: <h1>Not existing page</h1>
},
])
export { router }
