import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { User, Briefcase, Upload, ShieldCheck, X } from 'lucide-react';
 
import { Button } from '~/components/ui/button';
import { Input } from '~/components/Common/Input';
 
import { Label } from '~/components/ui/label';
import { Separator } from '~/components/ui/separator';
import { Checkbox } from '~/components/ui/checkbox';
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
 
type FreelancerSignupForm = {
  name: string;
  email: string;
  phone: string;
 
  password: string;
  confirmPassword: string;
 
  yearsExperience: string;
  linkedinUrl: string;
 
  desiredRate: string;
  rateBasis: string;
  currency: string;
 
  availableFrom: string;
  skills: string;
 
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptDataProcessing: boolean;
};
 
function Req() {
  return <span className="ml-0.5 text-red-500">*</span>;
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
      <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        <Icon className="h-4 w-4" />
        {title}
 
        {subtitle && (
          <span className="normal-case font-normal tracking-normal text-gray-400">{subtitle}</span>
        )}
      </h2>
 
      <Separator />
    </div>
  );
}
 
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
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
 
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed border-gray-300 p-6 text-center transition-colors hover:border-primary/50"
      >
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
 
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </button>
        )}
 
        <Upload className="mb-1 h-5 w-5 text-primary" />
 
        <span className="break-all px-4 text-sm font-medium text-primary">
          {file ? file.name : linkText}
        </span>
 
        <span className="text-xs text-gray-400">{file ? 'Click to replace' : subText}</span>
      </div>
    </div>
  );
}
 
export default function FreelancerSignUp() {
  const { register, control, handleSubmit } = useForm<FreelancerSignupForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
 
      password: '',
      confirmPassword: '',
 
      yearsExperience: '',
 
      linkedinUrl: '',
 
      desiredRate: '',
      rateBasis: 'Hourly',
      currency: 'USD',
 
      availableFrom: '',
      skills: '',
 
      acceptTerms: false,
      acceptPrivacy: false,
      acceptDataProcessing: false,
    },
  });
 
  const [resume, setResume] = useState<File | null>(null);
 
  const onSubmit = (data: FreelancerSignupForm) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
 
    const payload = {
      ...data,
 
      yearsExperience: Number(data.yearsExperience),
 
      desiredRate: Number(data.desiredRate),
 
      skills: data.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
 
      resume,
    };
 
    console.log(payload);
  };
 
  return (
    <div
      className="
      rounded-2xl
      bg-white
      shadow-sm
      p-4
      sm:p-6
      md:p-8
     
    "
      style={{
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
        {/* ================= PERSONAL INFORMATION ================= */}
 
        <section className="space-y-5">
          <SectionHeader icon={User} title="Personal Information" />
 
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Full Name
                <Req />
              </Label>
 
              <Input placeholder="Enter your full name" {...register('name')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Email
                <Req />
              </Label>
 
              <Input type="email" placeholder="Enter your email" {...register('email')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Password
                <Req />
              </Label>
 
              <Input type="password" placeholder="Enter password" {...register('password')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Confirm Password
                <Req />
              </Label>
 
              <Input
                type="password"
                placeholder="Confirm password"
                {...register('confirmPassword')}
              />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Phone Number
                <Req />
              </Label>
 
              <Input placeholder="+1 9876543210" {...register('phone')} />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Years of Experience
                <Req />
              </Label>
 
              <Input type="number" placeholder="5" {...register('yearsExperience')} />
            </div>
          </div>
        </section>
 
        {/* ================= PROFESSIONAL INFORMATION ================= */}
 
        <section className="space-y-5">
          <SectionHeader icon={Briefcase} title="Professional Information" />
 
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Primary Skills
                <Req />
              </Label>
 
              <Input placeholder="React, Node.js, TypeScript" {...register('skills')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Desired Rate
                <Req />
              </Label>
 
              <Input type="number" placeholder="50" {...register('desiredRate')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">LinkedIn Profile</Label>
 
              <Input placeholder="https://linkedin.com/in/username" {...register('linkedinUrl')} />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Rate Basis
                <Req />
              </Label>
 
              <Controller
                control={control}
                name="rateBasis"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select Rate Basis" />
                    </SelectTrigger>
 
                    <SelectContent>
                      <SelectItem value="Hourly">Hourly</SelectItem>
 
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">
                Currency
                <Req />
              </Label>
 
              <Controller
                control={control}
                name="currency"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
 
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
 
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
 
            <div>
              <Label className="mb-2 block text-sm font-medium">Available From</Label>
 
              <Input type="date" {...register('availableFrom')} />
            </div>
          </div>
        </section>
        {/* ================= RESUME ================= */}
 
        <section className="space-y-5">
          <SectionHeader icon={Upload} title="Resume" />
 
          <UploadBox
            label="Resume"
            required
            linkText="Upload Resume"
            subText="PDF, DOC, DOCX • Max 5MB"
            file={resume}
            onChange={setResume}
          />
        </section>
 
        {/* ================= AGREEMENT ================= */}
 
        <section className="space-y-4">
          <SectionHeader icon={ShieldCheck} title="Agreement" />
 
          <div className="space-y-3">
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register('acceptTerms')} />
 
              <span>
                I accept the{' '}
                <span className="cursor-pointer text-primary underline">Terms & Conditions</span>
              </span>
            </label>
 
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register('acceptPrivacy')} />
 
              <span>
                I accept the{' '}
                <span className="cursor-pointer text-primary underline">Privacy Policy</span>
              </span>
            </label>
 
            <label className="flex items-start gap-2 text-sm">
              <Checkbox className="mt-0.5 shrink-0" {...register('acceptDataProcessing')} />
 
              <span>
                I accept the{' '}
                <span className="cursor-pointer text-primary underline">
                  Data Processing Agreement
                </span>
              </span>
            </label>
          </div>
        </section>
 
        {/* ================= SUBMIT ================= */}
 
        <div className="pt-2">
          <Button
            type="submit"
            className="h-12 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
          >
            SIGN UP
          </Button>
        </div>
      </form>
    </div>
  );
}
 