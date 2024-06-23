import { Outlet } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <Hero />
      <div className="flex-1 flex container mx-auto py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
