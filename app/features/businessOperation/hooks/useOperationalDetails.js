import { useState } from "react";
import * as Yup from "yup";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const validationSchema = Yup.object()
  .shape({
    openingTime: Yup.string().required("Opening time is required"),
    closingTime: Yup.string()
      .required("Closing time is required")
      .test(
        "is-after-opening",
        "Closing time must be after opening time",
        function (value) {
          const { openingTime } = this.parent;
          if (!openingTime || !value) return true;

          const parseTime = (t) => {
            const [time, modifier] = t.split(" ");
            let [hours, minutes] = time.split(":").map(Number);
            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };

          const openMinutes = parseTime(openingTime);
          const closeMinutes = parseTime(value);

          return closeMinutes > openMinutes;
        }
      ),
    prepTime: Yup.number()
      .typeError("Preparation time must be a number")
      .required("Preparation time is required"),
  })
  .test(
    "at-least-one-service",
    "At least one service must be selected",
    (values) => values.dineIn || values.takeaway || values.delivery
  );

const useOperationalDetails = (navigation) => {
  const [showOpeningPicker, setShowOpeningPicker] = useState(false);
  const [showClosingPicker, setShowClosingPicker] = useState(false);
  const [modal, openModel] = useState(false);

  const initialValues = {
    openingTime: "",
    closingTime: "",
    weeklyOff: [],
    dineIn: false,
    takeaway: false,
    delivery: false,
    prepTime: "",
    instructions: "",
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const handleOpeningTimeConfirm = (date, setFieldValue) => {
    const formatted = formatTime(date);
    setFieldValue("openingTime", formatted);
    setShowOpeningPicker(false);
  };

  const handleClosingTimeConfirm = (date, setFieldValue) => {
    const formatted = formatTime(date);
    setFieldValue("closingTime", formatted);
    setShowClosingPicker(false);
  };

  const handleSubmit = (values) => {
    console.log("Operational Details:", values);
    navigation.navigate("NextScreen", { operationalDetails: values });
  };

  return {
    showOpeningPicker,
    setShowOpeningPicker,
    showClosingPicker,
    setShowClosingPicker,
    modal,
    openModel,
    initialValues,
    validationSchema,
    weekdays,
    handleOpeningTimeConfirm,
    handleClosingTimeConfirm,
    handleSubmit,
  };
};

export default useOperationalDetails;
