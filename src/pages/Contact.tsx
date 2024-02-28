import call from "../images/call.png";

import whatsapp from "../images/whatsapp.png";
import line from "../images/line.png";
import linkedin from "../images/linkedin.png";
import email from "../images/email.png";
import { Logo } from "../components/Logo";

export const Contact = () => {
  return (
    <>
      <div className="h-[100vh] w-[100vw] grid md:grid-cols-2 md:grid-rows-0 grid-rows-1 justify-center items-center relative bg-white px-16">
        <Logo />

        <div className="md:justify-self-end md:static md:-translate-x-0 md:opacity-100 absolute left-1/2 -translate-x-1/2 z-10 opacity-20">
          <img
            src={call}
            alt="call"
            width="280px"
            style={{ minWidth: "280px" }}
            className="mx-10"
          />
        </div>

        <div className="md:justify-self-start justify-self-center z-20">
          <h1 className="font-bold text-5xl text-gray-900">contacts.</h1>
          <h1 className="font-bold text-xl text-gray-500 mb-6 mt-4">
            Get in touch with me
          </h1>
          <div>
            <h1 className="font-semibold text-sm text-gray-800">
              <span className="font-bold">Name : </span>Yazidane Hakim
            </h1>
            <h1 className="font-semibold text-sm text-gray-800">
              <span className="font-bold">Address : </span>50 Changxing St, Daan
              Dist, Taipei City, Taiwan
            </h1>
            <h1 className="font-semibold text-sm text-gray-800">
              <span className="font-bold">Mobile Phone : </span>+886 908735498
            </h1>
          </div>

          <div className="w-fit h-fit rounded-2xl py-2 sm:flex gap-5 mt-5">
            <div className="w-fit">
              <div className="w-fit mb-4 whitespace-nowrap">
                <img src={email} alt="email" width="30px" className="inline" />
                <h1 className="ms-3 inline text-sm font-semibold whitespace-normal">
                  zidanehakimgt@gmail.com
                </h1>
              </div>

              <div className="w-fit mb-4 whitespace-nowrap">
                <img
                  src={linkedin}
                  alt="linkedin"
                  width="30px"
                  className="inline"
                />
                <h1 className="ms-3 inline text-sm font-semibold">
                  Yazidane Hakim
                </h1>
              </div>
            </div>

            <div className="w-fit">
              <div className="w-fit mb-4 whitespace-nowrap">
                <img
                  src={whatsapp}
                  alt="whatsapp"
                  width="30px"
                  className="inline"
                />
                <h1 className="ms-3 inline text-sm font-semibold">
                  0908735498
                </h1>
              </div>

              <div className="w-fit whitespace-nowrap">
                <img src={line} alt="line" width="30px" className="inline" />
                <h1 className="ms-3 inline text-sm font-semibold">
                  yazidanehakim
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
