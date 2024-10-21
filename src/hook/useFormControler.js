import * as Yup from "yup";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const useFormControler = () => {
  //esquema de validacion de datos se le pasa al hook de formik
  const validationSchema = Yup.object({
    years: Yup.number()
      .typeError("years must be a number")
      .positive("years must be greater than zero")
      .max(dayjs().year(), "you can't be born in the future")
      .required("this field is required"),

    months: Yup.number()
      .typeError("months must be a number")
      .positive("months must be greater than zero")
      .max(12, "There are only 12 months in the year.")
      .required("this field is required"),
    days: Yup.number()
      .typeError("days must be a number")
      .positive("days must be greater than zero")
      .max(31, "maximum of 31 days a month")
      .required("this field is required"),
  });

  const initialValues = {
    years: 0,
    months: 0,
    days: 0,
  };

  const handleAge = ({ years, months, days }) => {
    //creando fecha
    const date = new Date(years, months, days);
    const daysDate = dayjs(date);

    //fecha actual
    const fechaActual = dayjs();

    // Calcular la diferencia
    years = fechaActual.diff(daysDate, "year");
    months = fechaActual.diff(daysDate.add(years, "year"), "month");
    days = fechaActual.diff(
      daysDate.add(years, "year").add(months, "month"),
      "day"
    );

    return {
      years,
      months: months + 1,
      days,
    };
  };

  return {
    validationSchema,
    initialValues,
    handleAge,
  };
};
