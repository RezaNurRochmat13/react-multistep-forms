import { useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  age: z.number().min(1, 'Age is required'),
});

const step2Schema = z.object({
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

const step3Schema = z.object({
  seat: z.string().min(1, 'Seat is required'),
  food: z.string().min(1, 'Food is required'),
  allergies: z.string().min(1, 'Allergies is required'),
});

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  // Create form instances with validation for each step
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: zodResolver(step === 1 ? step1Schema : step === 2 ? step2Schema : step3Schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      phone: '',
      email: '',
      seat: '',
      food: '',
      allergies: '',
    }
  });

  useEffect(() => {
    setValue('firstName', getValues('firstName'));
    setValue('lastName', getValues('lastName'));
    setValue('age', getValues('age'));
    setValue('phone', getValues('phone'));
    setValue('email', getValues('email'));
    setValue('seat', getValues('seat'));
    setValue('food', getValues('food'));
    setValue('allergies', getValues('allergies'));
  }, [step, setValue, getValues]);

  const onSubmit = (data: unknown) => {
    console.log('Form data submitted:', data)
    // Optionally handle form submission to API
  };

  return (
    <div>
      <h1>Multi-Step Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div>
            <div>
              <label>First Name</label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>

            <div>
              <label>Last Name</label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>

            <div>
              <label>Age</label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>

            <button type="button" onClick={() => setStep(2)}>Next</button>
            <button type="submit">Submit</button>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div>
            <div>
              <label>Phone</label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div>
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <button type="button" onClick={() => setStep(1)}>Back</button>
            <button type="button" onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {/* Step 3: Seat, Food, Allergies */}
        {step === 3 && (
          <div>
            <div>
              <label>Seat</label>
              <Controller
                name="seat"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.seat && <p>{errors.seat.message}</p>}
            </div>
            <div>
              <label>Food</label>
              <Controller
                name="food"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.food && <p>{errors.food.message}</p>}
            </div>
            <div>
              <label>Allergies</label>
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.allergies && <p>{errors.allergies.message}</p>}
            </div>

            <button type="button" onClick={() => setStep(2)}>Back</button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
}
