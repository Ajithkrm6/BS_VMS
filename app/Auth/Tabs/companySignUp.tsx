import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Building2, ShieldCheck, Lock, User, Landmark, Globe, Upload, X } from "lucide-react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";

type CompanySignupForm = {
  businessDisplayName: string;
  legalCompanyName: string;
  companyType: string;
  registrationNumber: string;
  countryOfRegistration: string;
  establishmentDate: string;
  aboutCompany: string;
  registeredAddress: string;
  city: string;
  state: string;
  postalCode: string;
  headCount: string;
  tin: string;
  vatNumber: string;
  taxCountry: string;
  fullName: string;
  phone: string;
  workEmail: string;
  password: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  bankCountry: string;
  website: string;
  linkedin: string;
  terms: boolean;
  privacy: boolean;
  dataProcessing: boolean;
};

function Req() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-3">
      <h2 className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide sm:tracking-[0.2em] text-gray-500">
        <Icon className="h-4 w-4 shrink-0" />
        {title}
        {subtitle && (
          <span className="normal-case font-normal tracking-normal text-gray-400">
            {subtitle}
          </span>
        )}
      </h2>
      <Separator />
    </div>
  );
}

// Working file upload box: click opens native file picker, shows selected
// filename, and lets the user clear/replace it.
function UploadBox({
  label,
  required,
  linkText,
  subText,
  file,
  onChange,
}: {
  label: string;
  required?: boolean;
  linkText: string;
  subText: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Label className="mb-2 block text-sm font-medium">
        {label}
        {required && <Req />}
      </Label>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 p-4 sm:p-6 text-center hover:border-primary/50 cursor-pointer transition-colors"
      >
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <Upload className="h-5 w-5 text-primary mb-1 shrink-0" />
        <span className="text-sm font-medium text-primary break-all max-w-full px-4">
          {file ? file.name : linkText}
        </span>
        <span className="text-xs text-gray-400">{file ? "Click to replace" : subText}</span>
      </div>
    </div>
  );
}

export default function CompanySignUp() {
  const { register, control, handleSubmit } = useForm<CompanySignupForm>({
    defaultValues: {
      businessDisplayName: "",
      legalCompanyName: "",
      companyType: "",
      registrationNumber: "",
      countryOfRegistration: "",
      establishmentDate: "",
      aboutCompany: "",
      registeredAddress: "",
      city: "",
      state: "",
      postalCode: "",
      headCount: "",
      tin: "",
      vatNumber: "",
      taxCountry: "",
      fullName: "",
      phone: "",
      workEmail: "",
      password: "",
      accountHolder: "",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      bankCountry: "",
      website: "",
      linkedin: "",
      terms: false,
      privacy: false,
      dataProcessing: false,
    },
  });

  // Files are kept outside react-hook-form state (RHF doesn't track File
  // objects well by default) and merged in manually on submit.
  
  const [files, setFiles] = useState<{
    registrationDoc: File | null;
    addressProof: File | null;
    governmentId: File | null;
    bankProof: File | null;
  }>({
    registrationDoc: null,
    addressProof: null,
    governmentId: null,
    bankProof: null,
  });

  const onSubmit = (data: CompanySignupForm) => {
    console.log("FORM DATA:", data);
    console.log("FILES:", files);
  };

  return (
<div
  className="
    rounded-2xl
    border-none
    bg-white
    shadow-sm
    p-4 sm:p-6 md:p-8
  
  
  "

  style={{
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  }}
>      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8 sm:space-y-10" >
        {/* ================= COMPANY IDENTITY ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader icon={Building2} title="Company Identity" />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Business Display Name<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Name shown to others on platform"
                {...register("businessDisplayName")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Legal Company Name<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="As per official registration"
                {...register("legalCompanyName")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Company Type<Req />
              </Label>
              <Controller
                control={control}
                name="companyType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="llp">LLP</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Registration Number<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="e.g. CIN / EIN / Company No."
                {...register("registrationNumber")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Country of Registration<Req />
              </Label>
              <Controller
                control={control}
                name="countryOfRegistration"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Establishment Date<Req />
              </Label>
              <Input
                type="date"
                className="h-11 w-full rounded-md"
                {...register("establishmentDate")}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-2 block text-sm font-medium">About Company</Label>
              <Textarea
                className="min-h-28 sm:min-h-32 w-full resize-none"
                placeholder="Brief description of your company, services, and industry..."
                {...register("aboutCompany")}
              />
            </div>

            <div className="md:col-span-2">
              <Label className="mb-2 block text-sm font-medium">
                Registered Address<Req />
              </Label>
              <Textarea
                className="min-h-20 sm:min-h-24 w-full resize-none"
                placeholder="Street address, building, suite"
                {...register("registeredAddress")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                City<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="City"
                {...register("city")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">State / Province</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="State or province"
                {...register("state")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Postal Code<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="ZIP / Postal code"
                {...register("postalCode")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Head Count</Label>
              <Controller
                control={control}
                name="headCount"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select head count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 members</SelectItem>
                      <SelectItem value="11-50">11-50 members</SelectItem>
                      <SelectItem value="51-200">51-200 members</SelectItem>
                      <SelectItem value="200+">200+ members</SelectItem>
                    </SelectContent>
                  </Select>
                )}    
              />
            </div>
          </div>
        </section>

        {/* ================= TAX & COMPLIANCE ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader icon={ShieldCheck} title="Tax & Compliance" />
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Tax Identification Number (TIN)<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="e.g. EIN, PAN, VAT number"
                {...register("tin")}
              />
              <p className="mt-1 text-xs text-gray-400">
                Varies by country: EIN (USA), PAN/GST (India), VAT (EU)
              </p>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">VAT / GST Number</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Optional — if registered for VAT/GST"
                {...register("vatNumber")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Tax Country<Req />
              </Label>
              <Controller
                control={control}
                name="taxCountry"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select tax jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </section>

        {/* ================= BUSINESS VERIFICATION DOCUMENTS ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader icon={Lock} title="Business Verification Documents" />
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <UploadBox
              label="Business Registration Document"
              required
              linkText="Upload registration proof"
              subText="Certificate of Incorporation, Business License · PDF/JPG, MAX 5MB"
              file={files.registrationDoc}
              onChange={(f) => setFiles((prev) => ({ ...prev, registrationDoc: f }))}
            />
            <UploadBox
              label="Proof of Address"
              required
              linkText="Upload address proof"
              subText="Utility bill, Lease agreement · PDF/JPG, MAX 5MB"
              file={files.addressProof}
              onChange={(f) => setFiles((prev) => ({ ...prev, addressProof: f }))}
            />
          </div>
        </section>

        {/* ================= AUTHORIZED REPRESENTATIVE ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader icon={User} title="Authorized Representative" subtitle="(KYC)" />
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Full Name<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Legal full name"
                {...register("fullName")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Phone Number<Req />
              </Label>
              <div className="flex h-11 w-full items-center rounded-md border border-input overflow-hidden">
                <span className="px-3 text-sm text-gray-500 border-r h-full flex items-center bg-gray-50 shrink-0">
                  +1
                </span>
                <input
                  className="flex-1 h-full px-3 text-sm outline-none placeholder:text-gray-400 min-w-0"
                  placeholder="OTP will be sent"
                  {...register("phone")}
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Work Email<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="representative@yourcompany.com"
                {...register("workEmail")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">
                Password<Req />
              </Label>
              <Input
                className="h-11 w-full rounded-md"
                type="password"
                placeholder="*********"
                {...register("password")}
              />
            </div>

            <div className="md:col-span-2">
              <UploadBox
                label="Government ID"
                required
                linkText="Upload government ID"
                subText="Passport, National ID, Driver's License · PDF/JPG, MAX 5MB"
                file={files.governmentId}
                onChange={(f) => setFiles((prev) => ({ ...prev, governmentId: f }))}
              />
            </div>
          </div>
        </section>

        {/* ================= BANKING DETAILS ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader
            icon={Landmark}
            title="Banking Details"
            subtitle="(optional — required for transactions)"
          />
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">Account Holder Name</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Name on bank account"
                {...register("accountHolder")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Bank Name</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Name of bank"
                {...register("bankName")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Account Number / IBAN</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="Account number or IBAN"
                {...register("accountNumber")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">SWIFT / BIC Code</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="International bank code"
                {...register("swiftCode")}
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium">Bank Country</Label>
              <Controller
                control={control}
                name="bankCountry"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <UploadBox
              label="Bank Proof"
              linkText="Upload bank document"
              subText="Cancelled cheque, Bank statement · PDF/JPG, MAX 5MB"
              file={files.bankProof}
              onChange={(f) => setFiles((prev) => ({ ...prev, bankProof: f }))}
            />
          </div>
        </section>

        {/* ================= ONLINE PRESENCE ================= */}
        <section className="space-y-4 sm:space-y-5">
          <SectionHeader icon={Globe} title="Online Presence" />
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">Company Website</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="https://yourcompany.com"
                {...register("website")}
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">LinkedIn Company Page</Label>
              <Input
                className="h-11 w-full rounded-md"
                placeholder="https://linkedin.com/company/..."
                {...register("linkedin")}
              />
            </div>
          </div>
        </section>

        {/* ================= AGREEMENT ================= */}
        <section className="space-y-4">
          <SectionHeader icon={ShieldCheck} title="Agreement" />
          <div className="space-y-2">
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register("terms")} />
              <span>
                I accept the{" "}
                <span className="text-primary underline cursor-pointer">Terms & Conditions</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register("privacy")} />
              <span>
                I accept the{" "}
                <span className="text-primary underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register("dataProcessing")} />
              <span>
                I accept the{" "}
                <span className="text-primary underline cursor-pointer">
                  Data Processing Agreement
                </span>{" "}
                (GDPR / global compliance)
              </span>
            </label>
          </div>
        </section>

        <div className="pt-2">
          <Button type="submit" 
          // className="h-12 w-full rounded-md text-base font-semibold"
          className="h-12 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
          >
            SIGNUP
          </Button>
        </div>
      </form>
    </div>
  );
}
















