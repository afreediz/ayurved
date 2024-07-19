import { Outlet } from 'react-router-dom'
import Header from './user/Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <div className="">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );  
}

export default Layout
