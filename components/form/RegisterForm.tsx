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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import Image from "next/image";
import { SelectItem } from "../ui/select";

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
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="14 street"
          />
          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software engr"
          />
        </div>{" "}
        {/* emergency details */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Joshua"
          />

          <CustomField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="phone"
            placeholder="(555) 223 556"
          />
        </div>
        {/* next section info */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>
        <CustomField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Care Physician"
          placeholder="pick a Doctor"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem value={doctor.name} key={doctor.name + i}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={doctor.width}
                  height={doctor.height}
                  alt="physician"
                  className="rounded-full border border-dark-400"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomField>
        {/* insurance details */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="ex: Bluecross"
          />

          <CustomField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="WXC34558890"
          />
        </div>
        {/* allergy textarea */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="list them here"
          />

          <CustomField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="current medication (if any)"
            placeholder="Ibuprone 10mg"
          />
        </div>{" "}
        {/*family history*/}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="any specific disease frm father or mother"
          />

          <CustomField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="any specific disease frm father or mother"
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification Information</h2>
          </div>
        </section>
        <CustomField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Care Physician"
          placeholder="pick a Doctor"
        >
          {Doctors.map((doctor, i) => (
            <SelectItem value={doctor.name} key={doctor.name + i}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={doctor.width}
                  height={doctor.height}
                  alt="physician"
                  className="rounded-full border border-dark-400"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomField>
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
