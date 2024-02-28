import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { School, Trophy } from "react-ionicons";

type TimelineProps = {
  index: number;
  obj: {
    type: string;
    time: string;
    sub: string;
    title: string;
    description: string;
  };
};

const cardVariant = {
  hidden: {
    y: "-10px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const Timeline = ({ index, obj }: TimelineProps) => {
  const ref = useRef(null);
  const refcontent = useRef(null);
  const isOdd = (index + 1) % 2 !== 0;

  const { scrollYProgress: scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const { scrollYProgress: scrollYProgressContent } = useScroll({
    target: refcontent,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityContent = useTransform(
    scrollYProgressContent,
    [0, 0.6],
    ["0%", "100%"]
  );

  return (
    <>
      <motion.div
        style={{ opacity: opacity, top: `${index * 22 + 10}em` }}
        ref={ref}
        className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-transparent border-4 border-white z-20"
      ></motion.div>

      <motion.div
        style={{ top: `${index * 22 + 10}em` }}
        className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 bg-gray-900 border-4 border-slate-800 z-10 opacity-100"
      ></motion.div>

      <motion.div
        style={{ opacity: opacityContent, top: `${index * 22 + 10}em` }}
        ref={refcontent}
        className={`absolute bg-transparent ${
          isOdd ? "right-1/2 " : "left-1/2"
        } flex`}
      >
        {!isOdd && (
          <motion.div className="h-2 lg:w-[8em] md:w-[6em] w-[1em] bg-slate-200 inline-block rounded"></motion.div>
        )}

        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className={`rounded-r-lg text-slate-200 border-gray-700 ${
            isOdd ? "text-end" : "text-start"
          } lg:w-[23em] md:w-[32vw] w-[42vw] ${isOdd ? "ps-4" : "pe-4"}`}
        >
          <div className={`flex ${isOdd ? "justify-end" : "justify-start"}`}>
            <h1 className="font-bold rounded-xl bg-pink-800 text-white flex items-center py-[.2em] px-4 w-fit mx-2 text-sm">
              {obj.type}
              {obj.type === "Education" ? (
                <School
                  color="white"
                  style={{
                    display: "inline-block",
                    marginLeft: ".3em",
                  }}
                />
              ) : (
                <Trophy
                  color="white"
                  style={{
                    display: "inline-block",
                    marginLeft: ".3em",
                  }}
                />
              )}
            </h1>
          </div>

          <h1 className="m-auto mx-2 mb-2 font-bold text-2xl mt-1 text-white">
            {obj.time}
          </h1>

          <h1 className="font-semibold text-md m-auto mx-2 mt-1 text-white">
            {obj.title}
          </h1>

          <h1 className="text-sm m-auto mx-2 mb-2 text-slate-50">{obj.sub}</h1>

          <p className="mx-2 mb-2 text-slate-300 text-sm">{obj.description}</p>
        </motion.div>

        {isOdd && (
          <motion.div className="h-2 lg:w-[8em] md:w-[6em] w-[1em] bg-slate-200 inline-block rounded"></motion.div>
        )}
      </motion.div>
    </>
  );
};
