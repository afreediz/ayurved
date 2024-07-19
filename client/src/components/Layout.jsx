import { Outlet } from 'react-router-dom'
import Header from './user/Header'
import Footer from './Footer'
import PhoneOptions from './user/PhoneOptions'
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
      <PhoneOptions className='block md:hidden' />
    </div>
  );  
}

export default Layout
