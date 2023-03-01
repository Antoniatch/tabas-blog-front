import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Articles from './routes/articles'
import Blogs from './routes/blogs/blogs'
import CreateBlog from './routes/createblog'
import Discover from './routes/discover'
import Home from './routes/home'
import Login from './routes/login'
import NotFound from './routes/notFound'
import Profil from './routes/profile'
import Register from './routes/register'
import Toaster from './components/Toaster'
import { NotificationContext } from './contexts/NotificationContext'
import { useContext, useState } from 'react'
import ScrollToTop from './utils/ScrollToTop'

function App() {
  const { message } = useContext(NotificationContext)

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />
      {message && <Toaster />}
      <div className="min-h-screen">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Discover />} path="/discover" />
          <Route element={<Blogs />} path="/blogs/*" />
          <Route element={<Articles />} path="/articles" />
          <Route element={<Profil />} path="/profile" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<CreateBlog />} path="/createblog" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App
