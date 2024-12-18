import React from "react";
import { boolean, string } from "zod";
import { Button } from "./ui/button";
import Image from "next/image";

interface ButtonProps {
  isLoading: boolean;
  className: string;
  children: React.ReactNode;
}
export const SubmitButton = ({
  isLoading,
  className,
  children,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex gap-4 items-center">
          {" "}
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin "
          />{" "}
          loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
