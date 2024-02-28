import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type WithTransitionProps = {
  Component: React.ComponentType;
};

const transition1Variant = {
  hidden: {
    marginTop: "-100vh",
  },
  visible: {
    marginTop: "0vh",
    transition: {
      duration: 0.6,
      type: "linear",
    },
  },
};

const transition2Variant = {
  hidden: {
    marginTop: "0vh",
  },
  visible: {
    marginTop: "-100vh",
    transition: {
      delay: 1.2,
      duration: 0.6,
      type: "linear",
    },
  },
};

const transitionTextVariant = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.6,
      duration: 0.6,
      type: "linear",
    },
  },
};

export const WithTransition = ({ Component }: WithTransitionProps) => {
  const location = useLocation();

  const [delay, setDelay] = useState(true);
  const [delayTransition, setDelayTransition] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setTimeout(() => {
      document.body.style.overflowY = "auto";
      setDelay(false);
    }, 2000);
    setTimeout(() => {
      setDelayTransition(false);
    }, 1200);
  }, []);

  return (
    <>
      <motion.div
        variants={transition1Variant}
        initial="hidden"
        animate="visible"
        className="w-[100vw] h-[100vh] bg-gray-950 -z-20 flex relative"
      >
        {delay && (
          <motion.h1
            variants={transitionTextVariant}
            initial="hidden"
            animate="visible"
            className="text-white text-7xl font-semibold m-auto"
            style={{ fontVariant: "small-caps" }}
          >
            {location.pathname === "/"
              ? "Home"
              : location.pathname.substring(1, location.pathname.length)}
          </motion.h1>
        )}
      </motion.div>

      {delayTransition && (
        <motion.div className="w-[100vw] h-[100vh] bg-white"></motion.div>
      )}

      <motion.div
        variants={transition2Variant}
        initial="hidden"
        animate="visible"
      >
        <Component />
      </motion.div>
    </>
  );
};
