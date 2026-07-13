


import { useState } from "react";
import { IoShieldOutline } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";

import AccountDetailsPage from "./serviceProviderPages/administratorFlow/accountDetailsPage";
import EmailVerificationPage from "./serviceProviderPages/administratorFlow/emailVerificationPage";
import VerificationSuccess from "./serviceProviderPages/administratorFlow/verificationSuccess";
import AccountSetupPage from "./serviceProviderPages/teamMemberFlow/accountSetupPage";

const ServiceProvider = () => {
  const [step, setStep] = useState<
    | "accountType"
    | "accountDetails"
    | "emailVerification"
    | "verificationSuccess"
    | "teamMember"
  >("accountType");

  // Administrator Flow
  if (step === "accountDetails") {
    return (
      <AccountDetailsPage
        onNext={() => setStep("emailVerification")}
      />
    );
  }

  if (step === "emailVerification") {
    return (
      <EmailVerificationPage
        onNext={() => setStep("verificationSuccess")}
      />
    );
  }

  if (step === "verificationSuccess") {
    return <VerificationSuccess />;
  }

  // Team Member Flow
  if (step === "teamMember") {
    return <AccountSetupPage />;
  }

  return (
    <div   className="
 
    p-4 sm:p-6 md:p-6
   
  
  
  ">
      {/* Heading */}
      <div className=" flex flex-col items-center gap-5">
        <h1 className="text-center text-[40px] font-bold leading-[48px] tracking-[-1.2px] text-[#191C1E]">
          Choose your Account Type
        </h1>

        <p className="text-center text-[17px] font-normal leading-[29.25px] text-[#434654]">
          Select the role that best matches your responsibilities within the
          organization.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-6 flex flex-col gap-20 md:flex-row">
        {/* Administrator */}
        <div
          onClick={() => setStep("accountDetails")}
          className="flex w-[300px] flex-1 cursor-pointer flex-col gap-2.5 rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
        >
          <IoShieldOutline size={25} />

          <h2 className="text-xl font-semibold">
            Organization Administrator
          </h2>

          <p>
            Register a new service provider entity. Full access to billing,
            team management, organization settings.
          </p>

          <p className="font-medium text-[#003D9B]">
            Select Administrator
          </p>
        </div>

        {/* Team Member */}
        <div
          onClick={() => setStep("teamMember")}
          className="flex w-[300px] flex-1 cursor-pointer flex-col gap-2.5 rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
        >
          <MdPeopleAlt size={25} />

          <h2 className="text-xl font-semibold">
            Team Member
          </h2>

          <p>
            For independent professionals seeking to offer their services.
          </p>

          <p className="font-medium text-[#003D9B]">
            Select Team Member
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <a href="/login" className="font-medium text-[#003D9B]">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ServiceProvider;