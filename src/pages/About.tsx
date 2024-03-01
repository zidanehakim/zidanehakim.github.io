import { ColorPaletteOutline, ServerOutline } from "react-ionicons";
import coffee from "./../images/coffee.png";
import rocket from "./../images/rocket.png";
import dab from "./../images/dab.png";
import img1 from "./../images/1.jpg";
import img2 from "./../images/2.jpg";
import img3 from "./../images/3.jpg";
import img4 from "./../images/4.jpg";
import img5 from "./../images/5.jpg";
import img6 from "./../images/6.jpg";
import img7 from "./../images/7.jpg";
import img8 from "./../images/8.jpg";
import img9 from "./../images/9.jpg";
import img10 from "./../images/10.jpg";
import img11 from "./../images/11.jpg";

import forward from "./../images/fast-forward.png";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Logo } from "../components/Logo";
import { Timeline } from "../components/Timeline";

const containerVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    x: -50,
  },
};

const timeline = [
  {
    type: "Education",
    time: "2022-Present",
    title: "National Taiwan University, Civil Engineering Department",
    sub: "2nd year",
    description:
      "As I'm into engineering and would like to try something new, Civil Engineering does attract my interest a lot. Being able to analyze structures and make durable buildings, combined with mechanical theory and all of its complexity, makes the learning process more fun.",
  },
  {
    type: "Award",
    time: "2022-Present",
    title: "Beasiswa Indonesia Maju (BIM) Awardee",
    sub: "Ministry of Education, Culture, Research, and Technology",
    description:
      "Participating in the National Indonesian Informatics Olympiad 2021 brought me the opportunity to become an awardee of the Maju Scholarship and to choose National Taiwan University for my further studies.",
  },
  {
    type: "Award",
    time: "2023",
    title: "Best Automation Award, Best Automation Group",
    sub: "Physical Model Design Laboratory, NTU Civil Engineering Course",
    description:
      "Rail track projects, I've always strived to create the best and most creative projects combines with programming. In this case, the Raspberry Pi sends an HTML file to localhost:5000 when certain conditions of the rail are met.",
  },
  {
    type: "Award",
    time: "2021",
    title: "National Informatics Olympiad",
    sub: "Finalist",
    description:
      "Having obtained a gold medal in the Bengkulu Informatics Olympiad 2021, I was chosen to represent the Bengkulu province in the National Informatics field. Consequently, I had the opportunity to participate as a finalist in the competition",
  },
  {
    type: "Award",
    time: "2021",
    title: "Bengkulu Informatics Olympiad",
    sub: "Gold Medal",
    description:
      "I've always been passionate about programming, starting from school-level qualifications, advancing to district competitions, and eventually participating at the provincial level. Hard work paid off when I was awarded a Gold Medal in the competition.",
  },
  {
    type: "Education",
    time: "2019-2022",
    title: "SMA Negeri 4 Rejang Lebong",
    sub: "Senior High School",
    description:
      "Three years of senior high school, I was just a normal student, self-studying programming on my own.",
  },
];

const frontEnd = [
  "html5",
  "css",
  "javascript",
  "react",
  "tailwind",
  "bootstrap",
  "framer",
  "typescript",
  "unity",
];
const backEnd = [
  "nodejs",
  "expressjs",
  "mongodb",
  "supabase",
  "git",
  "github",
  "json",
];

export const About = () => {
  const [isSkills, setSkills] = useState(false);

  const refSkills = useRef(null);
  const refTrack = useRef(null);

  const { scrollYProgress: scrollYProgressSkills } = useScroll({
    target: refSkills,
    offset: ["end end", "end start"],
  });
  useMotionValueEvent(scrollYProgressSkills, "change", (value) => {
    if (value > 0.2 && value <= 1) setSkills(true);
    else setSkills(false);
  });

  // track
  const { scrollYProgress: scrollYProgressTrack } = useScroll({
    target: refTrack,
    offset: ["center center", "center start"],
  });

  const track = useTransform(scrollYProgressTrack, [0, 1], ["0vh", "50vh"]);

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex relative bg-white overflow-x-hidden">
        <Logo />
        <div className="bg-transparent grid xl:grid-cols-3 xl:grid-row-0 grid-row-1 md:w-[65%] px-10 grid-flow-row m-auto">
          <div className="w-fit col-span-1 xl:static xl:-translate-x-0 xl:justify-self-end xl:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
            <img
              src={coffee}
              alt="coffee"
              width="320px"
              style={{ minWidth: "320px" }}
            />
          </div>
          <div className="align-center col-span-2 z-20">
            <h1 className="font-bold text-5xl text-gray-900">about.</h1>
            <h1 className="font-bold text-xl text-gray-500 mt-4">
              Full-stack developer learner
            </h1>
            <h1 className="font-semibold text-[.9em] text-gray-600 mt-2">
              As a sophomore studying civil engineering at National Taiwan
              University, I'm adept at balancing academic commitments with my
              longstanding passion for coding. Particularly drawn to website
              development since high school, I'm enthusiastic about taking this
              interest to a professional level.
            </h1>

            <div className="images flex w-fit h-[170px] flex-row flex-wrap overflow-y-scroll mt-2 justify px-1 py-1">
              <img
                src={img1}
                alt="image 1"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img2}
                alt="image 2"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img3}
                alt="image 3"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img5}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img4}
                alt="image 4"
                width="200px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img6}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img7}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img8}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img9}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img10}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
              <img
                src={img11}
                alt="image 4"
                width="120px"
                className="object-fit me-2 rounded-md p-2 shadow-md border-box hover:scale-105 hover:border-[.2em] border-pink-500 transition-all bg-white mt-1"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-[8em] right-[15%]">
          <img
            src={forward}
            alt="forward"
            className="rotate-90 hover:scale-105 transition-all opacity-90"
            width="28px"
          />
        </div>
      </div>
      <div
        className="w-[100%] h-fit text-black relative bg-gray-900 py-[10em]"
        id="timeline"
      >
        {timeline.map((obj, index) => (
          <Timeline key={index} index={index} obj={obj} />
        ))}

        {/* Content Timeline */}
        <motion.div
          ref={refTrack}
          className="absolute md:left-[53%] md:-translate-x-0 md:opacity-100 md:flex left-1/2 -translate-x-1/2 text-center items-center justify-center opacity-20"
        >
          <div>
            <h1 className="font-bold text-5xl text-slate-100 mb-4">
              timeline.
            </h1>

            <h1 className="font-bold text-xl text-gray-400 mt-4 text-start">
              My life journey
            </h1>
          </div>

          <img src={rocket} alt="rocket" width="200px" />
        </motion.div>

        <div
          className="bg-gray-800 absolute w-2 left-1/2 -translate-x-1/2 rounded"
          style={{ height: `${timeline.length * 22}em` }}
        ></div>
        <div
          className="w-fit relative left-1/2 -translate-x-1/2 rounded"
          style={{ height: `${timeline.length * 22}em` }}
        >
          <motion.div
            style={{ height: track }}
            className="bg-slate-200 sticky top-0 w-2 rounded"
          ></motion.div>
        </div>

        <div className="absolute bottom-[8em] right-[15%]">
          <img
            src={forward}
            alt="forward"
            className="rotate-90 hover:scale-15 transition-all invert opacity-90"
            width="28px"
          />
        </div>
      </div>

      <div className="w-[100%] h-[100vh] py-[16vh] m-auto">
        <div>
          <h1
            ref={refSkills}
            className="font-bold text-5xl text-gray-900 text-center"
          >
            skills.
          </h1>

          <h1 className="font-bold text-xl text-gray-500 mt-4 text-center mb-6">
            Web Development Skills
          </h1>

          <div className="w-[60%] grid xl:grid-cols-6 justify-center text-center m-auto">
            <div className="h-fit w-[100%] col-span-2 xl:static xl:-translate-x-0 xl:opacity-100 mt-6 absolute left-1/2 -translate-x-1/2 opacity-20 z-10">
              <img src={dab} alt="dab" width="270px" className="m-auto" />
            </div>

            {isSkills && (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-2xl col-span-2 py-5 transition z-20"
                  whileHover={{ scale: "1.05" }}
                >
                  <div className="flex justify-center">
                    <h1 className="font-bold rounded-xl bg-gray-900 text-slate-200 flex justify-start items-center py-1 px-6 w-fit mx-2 text-sm">
                      Front-end Development
                      <ColorPaletteOutline
                        color="white"
                        style={{
                          display: "inline-block",
                          marginLeft: ".4em",
                        }}
                      />
                    </h1>
                  </div>
                  <div className="flex justify-center items-center flex-wrap flex-column gap-4 mt-2 px-6 py-1">
                    {frontEnd.map((obj, index) => (
                      <motion.div
                        key={index}
                        variants={containerVariants}
                        className="relative logo text-center w-[4.5em]"
                      >
                        <h1 className="logoText font-bold text-gray-900 opacity-10 transition-all select-none text-sm">
                          {obj.toUpperCase()}
                        </h1>
                        <img
                          className="logoIcon transition-all shadow-md p-2 m-auto"
                          src={`/${obj}.svg`}
                          alt={obj}
                          width="60px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="rounded-2xl col-span-2 py-5 transition z-20"
                  whileHover={{ scale: "1.05" }}
                >
                  <div className="flex justify-center">
                    <h1 className="font-bold rounded-xl bg-gray-900 text-white flex justify-start items-center py-1 px-6 w-fit mx-2 text-sm">
                      Back-end Development
                      <ServerOutline
                        color="white"
                        style={{
                          display: "inline-block",
                          marginLeft: ".4em",
                        }}
                      />
                    </h1>
                  </div>
                  <div className="flex justify-center items-center flex-wrap flex-column gap-4 mt-2 px-8 pb-[10em]">
                    {backEnd.map((obj, index) => (
                      <motion.div
                        key={index}
                        variants={containerVariants}
                        className="relative logo text-center w-[4.5em]"
                      >
                        <h1 className="m-auto logoText font-bold text-gray-900 opacity-10 transition-all select-none text-sm">
                          {obj.toUpperCase()}
                        </h1>
                        <img
                          className="logoIcon transition-all shadow-md p-2 m-auto"
                          src={`/${obj}.svg`}
                          alt={obj}
                          width="65px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
