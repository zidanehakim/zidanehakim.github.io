import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Logo } from "../components/Logo";
import { useEffect, useState } from "react";
import business from "./../images/business.png";

import { ChevronBack, ChevronForward, Rocket } from "react-ionicons";

const portfolio = [
  {
    name: "noteify",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Soluta asperiores provident molestiae quibusdam sapientevero quam corporis repellat exercitationem dolore.",
    url: "https://noteify-io.netlify.app/",
  },
  {
    name: "noteify",
    desc: "Lorem2 ipsum dolor sit amet consectetur adipisicing elit.Soluta asperiores provident molestiae quibusdam sapientevero quam corporis repellat exercitationem dolore.",
    url: "https://noteify-io.netlify.app/",
  },
  {
    name: "noteify3",
    desc: "Lorem3 ipsum dolor sit amet consectetur adipisicing elit.Soluta asperiores provident molestiae quibusdam sapientevero quam corporis repellat exercitationem dolore.",
    url: "https://noteify-io.netlify.app/",
  },
];

export const Portfolio = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [pos, setPos] = useState(0);

  const percent = useMotionValue(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => percent.set(pos / (portfolio.length - 1)), [pos]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const loadingSpring = useSpring(percent, {
    stiffness: 80,
    damping: 20,
  });
  const loading = useTransform(loadingSpring, [1, 0], ["0%", "100%"]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] text-center flex flex-row justify-center items-center bg-white pb-[10vh]">
        <Logo />
        <div>
          <div className="w-[90vw] max-w-[50em] h-fit m-auto row-span-1 col-span-2 z-10 mb-4">
            <h1 className="font-bold text-5xl text-gray-900">projects.</h1>

            <h1 className="font-bold text-xl text-gray-500 mt-4">
              Finished and on-going projects
            </h1>

            <motion.div
              style={{ width: loading }}
              className="rounded-md h-1 bg-purple-700 mt-5 m-auto -z-1"
            ></motion.div>
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 mt-10 justify-self-start">
            <div className="z-10 justify-self-end mx-5 lg:static lg:-translate-x-0 lg:opacity-100 absolute left-1/2 -translate-x-1/2 opacity-20">
              <img
                src={business}
                alt="business"
                width="320px"
                className="m-auto"
                style={{ minWidth: "320px" }}
              />
            </div>

            <div
              className="h-fit z-10 overflow-x-hidden relative lg:justify-self-start justify-self-center"
              style={{
                width: windowSize[0] < 450 ? `${windowSize[0]}px` : "450px",
              }}
            >
              <button
                onClick={() => setPos((val) => val - 1)}
                className={`text-gray absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full px-1 py-1 z-50 hover:brightness-75 transition ${
                  pos === 0 ? "hidden" : "block"
                }`}
              >
                <ChevronBack color="white" />
              </button>

              <button
                onClick={() => setPos((val) => val + 1)}
                className={`text-gray absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 rounded-full px-1 py-1 z-50 hover:brightness-75 transition ${
                  pos + 1 === portfolio.length ? "hidden" : "block"
                }`}
              >
                <ChevronForward color="white" />
              </button>

              <motion.div
                drag
                style={{
                  x: `-${
                    windowSize[0] < 450 ? pos * windowSize[0] : pos * 450
                  }px`,
                }}
                className="w-fit flex relative transition"
              >
                {portfolio.map((obj, index) => (
                  <div key={index} className="flex justify-center flex-col">
                    <div className="w-fit flex items-center justify-center mb-3 lg:mb-3 lg:m-0 m-auto">
                      <h1 className="font-bold text-2xl text-gray-800">
                        {obj.name}
                      </h1>

                      <a
                        href={obj.url}
                        target="_blank"
                        className="cursor-pointer font-bold text-white bg-pink-600 rounded-xl ms-3 w-fit px-2 py-1 text-sm mt-2 hover:brightness-75 transition"
                      >
                        Demo
                        <Rocket
                          color="white"
                          width="20px"
                          height="20px"
                          style={{ display: "inline", marginLeft: ".5em" }}
                        />
                      </a>
                    </div>

                    <div className="w-fit m-auto">
                      <img
                        src={`../src/images/web_${obj.name}.png`}
                        alt={obj.name}
                        width={
                          windowSize[0] < 450 ? `${windowSize[0]}px` : "450px"
                        }
                        style={{
                          minWidth:
                            windowSize[0] < 450
                              ? `${windowSize[0]}px`
                              : "450px",
                        }}
                        className="px-2"
                      />
                    </div>

                    <p
                      className="font-semibold text-sm text-gray-500 mt-4 text-start px-4"
                      style={{
                        width:
                          windowSize[0] < 450 ? `${windowSize[0]}px` : "450px",
                      }}
                    >
                      {obj.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
