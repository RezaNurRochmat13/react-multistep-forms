import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const stepSchemas = [
  z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    age: z.string().min(1, "Age is required"),
  }),
  z.object({
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
  }),
  z.object({
    seat: z.string().min(1, "Seat is required"),
    food: z.string().min(1, "Food is required"),
    allergies: z.string().min(1, "Allergies is required"),
  }),
];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(stepSchemas[step]),
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [step, reset]);

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setFormData((prevData) => ({ ...prevData, ...getValues() }));
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log("Form data submitted:", finalData);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Multi-Step Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {Object.keys(stepSchemas[step].shape).map((field) => (
          <div key={field} className="flex flex-col mb-4">
            <label className="text-lg font-semibold mb-2">{field}</label>
            <Controller
              name={field}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field].message}</p>
            )}
          </div>
        ))}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="py-2 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < stepSchemas.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
