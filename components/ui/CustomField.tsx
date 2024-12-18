"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { formFieldType } from "../form/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
interface CustomProps {
  control: Control<any>;
  fieldType: formFieldType;
  name: string;
  label?: string;
  iconAlt?: string;
  iconSrc?: string;
  placeholder?: string;
  disable?: boolean;
  dateformat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;
  switch (fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex  rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <input
              placeholder={placeholder}
              {...field}
              className=" shad-input flex-1 border-0"
            />
          </FormControl>
        </div>
      );
    case formFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="US"
          international
          withCountryCallingCode
          value={(field.value as E164Number) || undefined}
          placeholder={placeholder}
          onChange={field.onChange}
          className="input-phone"
        />
      );

    default:
      break;
  }
};

const CustomField = (props: CustomProps) => {
  const { control, fieldType, name, label, iconAlt, iconSrc, placeholder } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== formFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomField;
