import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { Button } from '~/components/Common/Button';
import { Input } from '~/components/Common/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent} from "../../components/ui/tabs"
import CompanySignUp from "../Tabs/companySignUp";
import FreelancerSignUp from "../Tabs/freelancerSignUp";
import ServiceProvider from "../Tabs/serviceProvider";
import type { UserRole } from '~/types/auth';
//import signupSideImage from "~/assets/images/signup-side-image.png";

interface RegisterFormProps {
  onSuccess?: () => void;
  onToggleLogin?: () => void;
}


 
export function RegisterForm({ onSuccess, onToggleLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'vendor' as UserRole,
    company: '',
    phone: '',
  });

   const { register, isLoading, error, clearError } = useAuth();
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await register(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
        formData.company,
        formData.phone
      );

      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess?.();
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div >

      {/* // my tabs code */}

      {/* <Tabs defaultValue="company" className="w-full flex flex-col items-center" >
        <TabsList variant="line" className="w-full flex justify-center gap-6 sm:gap-8 bg-transparent border-b border-gray-200 px-2 pb-0 mb-6 flex-wrap">
          <TabsTrigger value="company" className="flex-none whitespace-nowrap px-2 py-3 font-medium transition-all duration-200">
            Company Signup
          </TabsTrigger>
          <TabsTrigger value="freelancer" className="flex-none whitespace-nowrap px-2 py-3 font-medium transition-all duration-200">
            Freelancer Signup
          </TabsTrigger>
          <TabsTrigger value="service" className="flex-none whitespace-nowrap px-2 py-3 font-medium transition-all duration-200">
            Service Provider
          </TabsTrigger>
        </TabsList>
        <TabsList
  variant="line"
  className="
    w-full
    flex
    overflow-x-auto
    whitespace-nowrap
    border-b
    border-gray-200
    bg-transparent
    mb-6
    no-scrollbar
  "
>
  <TabsTrigger value="company" className="flex-shrink-0 px-4 py-3">
    Company Signup
  </TabsTrigger>

  <TabsTrigger value="freelancer" className="flex-shrink-0 px-4 py-3">
    Freelancer Signup
  </TabsTrigger>

  <TabsTrigger value="service" className="flex-shrink-0 px-4 py-3">
    Service Provider
  </TabsTrigger>
</TabsList>
        <TabsContent value="company" className="w-full focus-visible:outline-none">
          <CompanySignUp />
        </TabsContent>
        <TabsContent value="freelancer" className="w-full focus-visible:outline-none">
          <FreelancerSignUp />
        </TabsContent>
        <TabsContent value="service" className="w-full focus-visible:outline-none">
          <ServiceProvider />
        </TabsContent>
      </Tabs> */}


{/* // test tabs code */}

      <Tabs
  defaultValue="company"
  orientation="horizontal"
  className="w-full flex flex-col"
 
>
  {/* <TabsList
    variant="line"
    className="
      w-full
      flex
      flex-col
      sm:flex-row
      sm:justify-center
      sm:gap-6
      md:gap-8
      border-b
      bg-transparent
      border-gray-200
      mb-6
    "
  >
    <TabsTrigger
      value="company"
      className="w-full sm:w-auto text-center py-3 px-4"
    >
      Company Signup
    </TabsTrigger>

    <TabsTrigger
      value="freelancer"
      className="w-full sm:w-auto text-center py-3 px-4"
    >
      Freelancer Signup
    </TabsTrigger>

    <TabsTrigger
      value="service"
      className="w-full sm:w-auto text-center py-3 px-4"
    >
      Service Provider
    </TabsTrigger>
  </TabsList> */}

  {/* <TabsList
  variant="line"
  className="
    w-full
    flex
    flex-row
    justify-start
    gap-2
    sm:gap-4
    md:gap-6
    border-b
    border-gray-200
    bg-transparent
    mb-6
    overflow-x-auto
    whitespace-nowrap
    scrollbar-hide
  "
> */}
<TabsList
  variant="line"
  className="
    w-full
    flex
    flex-row
   
  
    bg-transparent
    mb-2
  "

  
>


  <TabsTrigger value="company" className="flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center whitespace-nowrap tracking-tight">
       Company
  </TabsTrigger>

  <TabsTrigger value="freelancer" className=" flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center  whitespace-nowrap
    tracking-tight">
        Freelancer
  </TabsTrigger>

  <TabsTrigger value="service" className="flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center  whitespace-nowrap
    tracking-tight">
      Service Provider
  </TabsTrigger>


  {/* <TabsTrigger value="company" className="flex-shrink-0 px-4 py-3">
    Company 
  </TabsTrigger>

  <TabsTrigger value="freelancer" className="flex-shrink-0 px-4 py-3">
    Freelancer 
  </TabsTrigger>

  <TabsTrigger value="service" className="flex-shrink-0 px-4 py-3">
    Service Provider
  </TabsTrigger> */}
</TabsList>

<TabsContent value="company">
    <CompanySignUp />
  </TabsContent>

  <TabsContent value="freelancer">
    <FreelancerSignUp />
  </TabsContent>

  <TabsContent value="service">
    <ServiceProvider />
  </TabsContent>

  
</Tabs>
    </div>
  );
 }


































