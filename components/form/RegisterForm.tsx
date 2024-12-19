"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomField from "../ui/CustomField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { formFieldType } from "./PatientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    console.log("Submit Button Active");
    try {
      const userData = {
        name,
        email,
        phone,
      };

      const newUser = await createUser(userData);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          {" "}
          <h1>Welcome</h1>
          <p className="text-dark-700">we will like to know more about you</p>
        </section>{" "}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="name"
          label="full Name"
          placeholder="john Doe"
          iconAlt="user"
          iconSrc="/assets/icons/user.svg"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="email"
            label="email"
            placeholder="johndoe@gmail.com"
            iconAlt="user"
            iconSrc="/assets/icons/email.svg"
          />
          <CustomField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="phone"
            placeholder="(555) 223 556"
          />
        </div>{" "}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.DATE_PICKER}
            control={form.control}
            name="birthday"
            label="Date of Birth"
          />
          <CustomField
            fieldType={formFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => <FormControl></FormControl>}
          />
        </div>
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
