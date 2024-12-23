import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Login from './Component/Login/Login.jsx'
import AddVerse from './Component/AddVerse/AddVerse.jsx'
import AdminPanel from './Component/AdminPanel/AdminPanel.jsx'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'

function App() {
  const [count, setCount] = useState(0)
  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'addverse', element: <AddVerse /> },
        { path: 'adminpanel', element: <ProtectedRoute><AdminPanel /></ProtectedRoute> },
      ]
    }
  ])

  return <RouterProvider router={routers}></RouterProvider>
}
export default App
