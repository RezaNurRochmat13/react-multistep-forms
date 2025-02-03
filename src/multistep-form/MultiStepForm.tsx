import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age is required"),
});

const step2Schema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

const step3Schema = z.object({
  seat: z.string().min(1, "Seat is required"),
  food: z.string().min(1, "Food is required"),
  allergies: z.string().min(1, "Allergies is required"),
});

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  // Initialize form with a single hook and conditional validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(
      step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      email: "",
      seat: "",
      food: "",
      allergies: "",
    },
  });

  // Handle form submission - capture all form values at the last step
  const onSubmit = (data: any) => {
    console.log("Form data submitted:", data);
    // Optionally handle form submission (e.g., send to an API)
  };

  // Handle next/prev step transitions, keeping values intact
  const goToNextStep = async () => {
    const isValid = await trigger(); // Validate current step
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Multi-Step Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">First Name</label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Last Name</label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Age</label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={goToNextStep}
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Phone</label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="py-2 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goToNextStep}
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Seat</label>
              <Controller
                name="seat"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.seat && (
                <p className="text-red-500 text-sm mt-1">{errors.seat.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Food</label>
              <Controller
                name="food"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.food && (
                <p className="text-red-500 text-sm mt-1">{errors.food.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold mb-2">Allergies</label>
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="p-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
              {errors.allergies && (
                <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="py-2 px-6 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
