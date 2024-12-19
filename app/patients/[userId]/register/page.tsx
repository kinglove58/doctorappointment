import Image from "next/image";
import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-h-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <div className="mt-20 text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left ">
              © 2024 CarePulse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[396px]"
      />
    </div>
  );
};

export default Register;
