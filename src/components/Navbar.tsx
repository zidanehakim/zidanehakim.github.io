import { Link } from "react-router-dom";
import { BookSharp, CallSharp, HomeSharp, PersonCircle } from "react-ionicons";
import { useState } from "react";

export const Navbar = () => {
  const [click, setClick] = useState(false);

  const invokeClick = () => {
    setClick(true);
    setTimeout(() => setClick(false), 1800);
  };

  return (
    <nav
      className="w-fit h-fit m-auto fixed bottom-[4%] left-1/2 -translate-x-1/2 py-3 px-5 z-40 shadow-2xl rounded-3xl"
      style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
    >
      <div className="w-fit sm:flex sm:flex-row sm:flex-wrap grid grid-rows-2 grid-cols-2 sm:gap-5 gap-3 text-gray-900 justify-center text-center">
        <Link
          to="/"
          onClick={invokeClick}
          className={click ? "pointer-events-none" : ""}
        >
          <div className="bg-gray-950 rounded-full w-fit h-fit px-2 py-2 hover:scale-110 transition-all shadow-lg">
            <HomeSharp color="white" width="1.3em" height="1.3em" />
          </div>
        </Link>
        <Link
          to="/about"
          onClick={invokeClick}
          className={click ? "pointer-events-none" : ""}
        >
          <div className="bg-gray-950 rounded-full w-fit h-fit px-2 py-2 hover:scale-110 transition-all shadow-lg">
            <PersonCircle color="white" width="1.3em" height="1.3em" />
          </div>
        </Link>
        <Link
          to="/portfolio"
          onClick={invokeClick}
          className={click ? "pointer-events-none" : ""}
        >
          <div className="bg-gray-950 rounded-full w-fit h-fit px-2 py-2 hover:scale-110 transition-all shadow-lg">
            <BookSharp color="white" width="1.3em" height="1.3em" />
          </div>
        </Link>
        <Link
          to="/contact"
          onClick={invokeClick}
          className={click ? "pointer-events-none" : ""}
        >
          <div className="bg-gray-950 rounded-full w-fit h-fit px-2 py-2 hover:scale-110 transition-all shadow-lg">
            <CallSharp color="white" width="1.3em" height="1.3em" />
          </div>
        </Link>
      </div>
    </nav>
  );
};
