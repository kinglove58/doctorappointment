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
import React from "react";

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

const RenderField = ({field, props}:{field:<any>, props:CustomProps}) => {
  return <input type="text" placeholder="John Doe" />;
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
        </FormItem>
      )}
    />
  );
};

export default CustomField;
