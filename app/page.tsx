import PatientForm from "@/components/form/PatientForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="flex h-screen max-h-screen ">
      {/* TODO: OTP AUTHENTICATION | passkey */}

      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-h-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
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
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}

export default Home;
