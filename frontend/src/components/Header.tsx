import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 text-white font-bold">
              <Link
                to="my-bookings"
                className="p-2 hover:bg-blue-600 duration-300"
              >
                My Bookings
              </Link>
              <Link
                to="my-hotels"
                className="p-2 hover:bg-blue-600 duration-300"
              >
                My Hotels
              </Link>
              <LogoutBtn />
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white flex items-center text-blue-600 px-3 font-bold hover:bg-gray-200 duration-300 rounded-md"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
