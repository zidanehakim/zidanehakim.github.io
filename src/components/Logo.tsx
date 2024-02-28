import logo from "../images/logo.png";

export const Logo = () => {
  return (
    <img
      src={logo}
      alt="logo"
      className="absolute left-1/2 -translate-x-1/2 top-[1.5em]"
      width="200px"
    />
  );
};
