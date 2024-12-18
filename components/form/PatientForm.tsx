"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import CustomField from "../ui/CustomField";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
export enum formFieldType {
  INPUT = "input",
  SKELETON = "skeleton",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  CHECKBOX = "checkbox",
  DATE_PICKER = "date_picker",
  SELECT = "select",
}

const PatientForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit({
    name,
    phone,
    email,
  }: z.infer<typeof userFormValidation>) {
    setIsLoading(true);
    try {
      //   const userData = {
      //     name,
      //     phone,
      //     email,
      //   };
      //   const user = await createUser(userData);
      //   if (user) router.push(`/patients/${user.id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        />{" "}
        <CustomField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="Email"
          label="email"
          placeholder="johndoe@gmail.com"
          iconAlt="user"
          iconSrc="/assets/icons/email.svg"
        />
        <CustomField
          fieldType={formFieldType.PHONE_INPUT}
          control={form.control}
          name="Phone number"
          label="phone"
          placeholder="(555) 223 556"
        />
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
