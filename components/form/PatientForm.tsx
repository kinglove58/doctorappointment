"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomField from "../ui/CustomField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum formFieldType {
  INPUT = "input",
  SKELETON = "skeleton",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date_picker",
  SELECT = "select",
}

const PatientForm = () => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="header">
          <h1>Hi there</h1>
          <p className="text-dark-700">Please schedule your appointment </p>
        </section>
        <CustomField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="name"
          label="full name"
          placeholder="john Doe"
          iconAlt="user"
          iconSrc="/assets/icons/user.svg"
        />
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
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
