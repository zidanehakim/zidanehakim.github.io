import { motion } from "framer-motion";
import hero from "../images/hero.png";
import {
  CloudDownloadSharp,
  LogoFacebook,
  LogoGithub,
  LogoInstagram,
  LogoLinkedin,
  PersonCircle,
} from "react-ionicons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";

const displayTexts = ["Fullstack Dev", "Engineer", "College Student"];

export const Home = () => {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(".");
  const [isRemove, setIsRemove] = useState(false);
  const [indexLetter, setIndexLetter] = useState(-1);
  const [indexWord, setIndexWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((val) => !val);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isRemove) {
      const interval2 = setInterval(() => {
        if (indexLetter + 1 < displayTexts[indexWord].length) {
          setIndexLetter((prevIndex) => prevIndex + 1);
          setDisplay((val) => val + displayTexts[indexWord][indexLetter + 1]);
        } else {
          setTimeout(() => setIsRemove(true), 4000);
          clearInterval(interval2);
        }
      }, 100);
      return () => clearInterval(interval2); // Cleanup
    } else {
      const interval3 = setInterval(() => {
        if (display.length > 1) {
          setIndexLetter((prevIndex) => prevIndex - 1);
          setDisplay((val) => val.substring(0, val.length - 1));
        } else {
          const nextIndexWord = (indexWord + 1) % displayTexts.length; // Calculate next indexWord
          setIndexWord(nextIndexWord);
          setIndexLetter(-1); // Reset indexLetter
          setIsRemove(false);
          clearInterval(interval3);
        }
      }, 100);
      return () => clearInterval(interval3); // Cleanup
    }
  }, [isRemove, display, indexLetter, indexWord]);

  return (
    <>
      <div className="bg-white h-[100vh] w-[100vw] grid grid-rows-1 md:grid-rows-0 md:grid-cols-2 justify-center items-center relative overflow-x-hidden">
        <Logo />

        <div className="w-[100vw] absolute uppercase fw-bold md:text-[10.5em] text-[8em] text-gray-950 -z-5 opacity-10 text-center overflow-x-hidden">
          <motion.h1
            animate={{ x: [50, -50] }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
              yoyo: true,
            }}
            className=""
          >
            Yazidane
          </motion.h1>
          <motion.h1
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
              yoyo: true,
            }}
            animate={{ x: [-50, 50] }}
            className=""
          >
            Hakim
          </motion.h1>
        </div>

        <div className="z-10 md:justify-self-end md:static md:-translate-x-0 md:opacity-100 absolute left-1/2 -translate-x-1/2 opacity-45">
          <img
            src={hero}
            alt="hero"
            width="400px"
            style={{ minWidth: "400px" }}
            className="m-auto"
          />
        </div>

        <div className="px-16 z-10 md:justify-self-start">
          <h1 className="text-gray-950 text-xl font-bold text-center my-3">
            Hi there! I'm
          </h1>
          <h1 className="text-gray-950 text-4xl font-bold text-center my-3">
            Yazidane Hakim
          </h1>

          <motion.h1
            className={`text-purple-600 m-auto text-center text-2xl w-fit font-bold px-2 my-5 uppercase box-content border-r-4 text-nowrap ${
              visible ? "border-r-purple-600" : "border-r-transparent"
            }`}
          >
            {display}
          </motion.h1>

          <div className="flex justify-center">
            <Link to="/YAZIDANE_HAKIM_RESUME.pdf" target="_blank" download>
              <h1 className="font-bold rounded-3xl bg-white text-gray-900 border-gray-900 border-[.1em] flex justify-start items-center py-2 px-5 w-fit mx-2 text-md hover:scale-105 transition-all">
                Resume
                <CloudDownloadSharp
                  color="black"
                  style={{
                    display: "inline-block",
                    marginLeft: ".4em",
                  }}
                />
              </h1>
            </Link>
            <Link to="./about">
              <h1 className="font-bold rounded-3xl bg-gray-900 border-gray-900 border-[.1em] text-white flex justify-start items-center py-2 px-5 w-fit mx-2 text-md hover:scale-105 transition-all">
                About
                <PersonCircle
                  color="white"
                  style={{
                    display: "inline-block",
                    marginLeft: ".4em",
                  }}
                />
              </h1>
            </Link>
          </div>
          <div className="m-auto flex w-fit mt-5">
            <a
              href="https://www.linkedin.com/in/yazidane-hakim-25754128a/"
              target="_blank"
              className="mx-2 hover:scale-105"
            >
              <LogoLinkedin color="black" width="1.8em" height="1.8em" />
            </a>
            <a
              href="https://github.com/zidanehakim"
              target="_blank"
              className="mx-2 hover:scale-105"
            >
              <LogoGithub color="black" width="1.8em" height="1.8em" />
            </a>
            <a
              href="https://www.instagram.com/yazidanehakim/"
              target="_blank"
              className="mx-2 hover:scale-105"
            >
              <LogoInstagram color="black" width="1.8em" height="1.8em" />
            </a>
            <a
              href="https://www.facebook.com/ZidanyuChan/"
              target="_blank"
              className="mx-2 hover:scale-105"
            >
              <LogoFacebook color="black" width="1.8em" height="1.8em" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
