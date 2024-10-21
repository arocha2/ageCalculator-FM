import iconArrow from "../assets/images/icon-arrow.svg";
import { Results } from "./Results";
import { useFormControler } from "../hook/useFormControler";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

//yup validatin js import
import { useFormik } from "formik";
import { useState } from "react";
//----->

export const AgeCalculator = () => {
  const [response, setResponse] = useState({
    years: "--",
    months: "--",
    days: "--",
  });
  const [isValid, setIsValid] = useState(null);

  const onSubmit = () => {
    const { years, months, days } = values;
    // validar fecha
    setIsValid(
      dayjs(`${years}/${months}/${days}`, "YYYY/MM/DD", true).isValid()
    );
    if (!isValid) {
      setResponse({
        years: "--",
        months: "--",
        days: "--",
      });
    } else {
      setResponse(handleAge(values));
    }
    //----->
  };

  //   FORMIK CONFIGURATION
  const { initialValues, validationSchema, handleAge } = useFormControler();
  const { getFieldProps, handleSubmit, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // ---------->

  return (
    <section className="bg-Off-white py-12 px-8 rounded-3xl rounded-br-[100px] md:w-[600px]">
      <form onSubmit={handleSubmit} className="w-full  ">
        <div className="flex gap-4 md:w-[400px]">
          <div className="w-1/3">
            <label
              htmlFor=""
              className={`${
                touched.days && errors.days
                  ? "text-red-600"
                  : "text-Smokey-grey"
              }  text-xs tracking-[3px]`}
            >
              DAY
            </label>
            <input
              type="text"
              name="days"
              id="days"
              className={` ${
                touched.days && errors.days
                  ? "border-red-600"
                  : "border-Light-grey"
              } text-lg w-full bg-transparent border  hover:border-Off-black focus:border-Off-black  hover:cursor-pointer py-2 px-4 rounded-md outline-none`}
              {...getFieldProps("days")}
            />
            {touched.days && errors.days && (
              <div className="w-[120px] leading-4 text-xs text-red-600 ml-2 absolute">
                {errors.days}
              </div>
            )}
          </div>
          <div className="w-1/3">
            <label
              htmlFor=""
              className={`${
                touched.months && errors.months
                  ? "text-red-600"
                  : "text-Smokey-grey"
              }  text-xs tracking-[3px]`}
            >
              MONTH
            </label>
            <input
              type="text"
              name="months"
              id="months"
              className={` ${
                touched.months && errors.months
                  ? "border-red-600"
                  : "border-Light-grey"
              } text-lg w-full bg-transparent border  hover:border-Off-black focus:border-Off-black  hover:cursor-pointer py-2 px-4 rounded-md outline-none`}
              {...getFieldProps("months")}
            />
            {touched.months && errors.months && (
              <div className="w-[120px] leading-3 text-xs text-red-600 ml-2 absolute">
                {errors.months}
              </div>
            )}
          </div>
          <div className="w-1/3">
            <label
              htmlFor=""
              className={`${
                touched.years && errors.years
                  ? "text-red-600"
                  : "text-Smokey-grey"
              }  text-xs tracking-[3px]`}
            >
              YEAR
            </label>
            <input
              type="text"
              name="years"
              id="years"
              className={` ${
                touched.years && errors.years
                  ? "border-red-600"
                  : "border-Light-grey"
              } text-lg w-full bg-transparent border  hover:border-Off-black focus:border-Off-black  hover:cursor-pointer py-2 px-4 rounded-md outline-none`}
              {...getFieldProps("years")}
            />
            {touched.years && errors.years && (
              <div className="w-[120px] leading-3 text-xs text-red-600 ml-2 absolute">
                {errors.years}
              </div>
            )}
          </div>
        </div>

        <div className=" w-full relative">
          <div className="my-14 md:my-10 w-full border border-Light-grey"></div>
          {!isValid && (
            <div className="leading-3 text-xs text-red-600 ml-2 absolute top-3    ">
              fecha ingresada no existe
            </div>
          )}
          <button
            type="submit"
            className="absolute -top-6 left-[40%] md:left-[90%] p-4 bg-Purple rounded-full w-14 h-14 hover:bg-Off-black"
          >
            <img src={iconArrow} alt="icon" />
          </button>
        </div>
      </form>
      <Results age={response} />
    </section>
  );
};
