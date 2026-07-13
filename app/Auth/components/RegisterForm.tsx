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
    <div className="w-full">
<Tabs
  defaultValue="company"
  orientation="horizontal"
  className="w-full flex flex-col items-center    md:w-[100%]
  
    lg:w-[100%]
    lg:-ml-[.5%]
    xl:w-[130%]
    xl:-ml-[12.5%]"
>
 
<TabsList
  variant="line"
  className="
    w-full
    flex
    flex-row
    justify-between
    items-center 
    mb-6
    border-b
    border-gray-50

    "
>


  <TabsTrigger value="company" className="flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center whitespace-nowrap tracking-tight"
 >
       Company
  </TabsTrigger>

  <TabsTrigger value="freelancer" className="flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center whitespace-nowrap tracking-tight"
 >
        Freelancer
  </TabsTrigger>

  <TabsTrigger value="service" className="flex-1 px-0.5 sm:px-2 md:px-4 py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium text-center  whitespace-nowrap
    tracking-tight">
      Service Provider
  </TabsTrigger>


  
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


































// import { useState } from 'react';
// import { useAuth } from '~/hooks/useAuth';
// import { Button } from '~/components/Common/Button';
// import { Input } from '~/components/Common/Input';
// import type { UserRole } from '~/types/auth';

// interface RegisterFormProps {
//   onSuccess?: () => void;
//   onToggleLogin?: () => void;
// }

// export function RegisterForm({ onSuccess, onToggleLogin }: RegisterFormProps) {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     name: '',
//     role: 'vendor' as UserRole,
//     company: '',
//     phone: '',
//   });

//   const { register, isLoading, error, clearError } = useAuth();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     clearError();

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const result = await register(
//         formData.email,
//         formData.password,
//         formData.name,
//         formData.role,
//         formData.company,
//         formData.phone
//       );

//       if (result.meta.requestStatus === 'fulfilled') {
//         onSuccess?.();
//       }
//     } catch (err) {
//       console.error('Registration failed:', err);
//     }
//   };

//   return (
    // <div className="w-full max-w-md">
    //   <div className="bg-white rounded-lg shadow-md p-8">
    //     <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

    //     {error && (
    //       <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
    //         {error}
    //       </div>
    //     )}

    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       {/* Name */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
    //         <Input
    //           type="text"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           placeholder="Enter your full name"
    //           required
    //           disabled={isLoading}
    //         />
    //       </div>

    //       {/* Email */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
    //         <Input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           placeholder="Enter your email"
    //           required
    //           disabled={isLoading}
    //         />
    //       </div>

    //       {/* Role */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">I am a</label>
    //         <select
    //           title="Select your role"
    //           name="role"
    //           value={formData.role}
    //           onChange={handleChange}
    //           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           disabled={isLoading}
    //         >
    //           <option value="vendor">Vendor</option>
    //           <option value="customer">Customer</option>
    //           <option value="admin">Admin</option>
    //         </select>
    //       </div>

    //       {/* Company (for vendors) */}
    //       {formData.role === 'vendor' && (
    //         <div>
    //           <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
    //           <Input
    //             type="text"
    //             name="company"
    //             value={formData.company}
    //             onChange={handleChange}
    //             placeholder="Enter your company name"
    //             disabled={isLoading}
    //           />
    //         </div>
    //       )}

    //       {/* Phone */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">Phone</label>
    //         <Input
    //           type="tel"
    //           name="phone"
    //           value={formData.phone}
    //           onChange={handleChange}
    //           placeholder="Enter your phone number"
    //           disabled={isLoading}
    //         />
    //       </div>

    //       {/* Password */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
    //         <Input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           placeholder="Enter a password (min 6 characters)"
    //           required
    //           disabled={isLoading}
    //         />
    //       </div>

    //       {/* Confirm Password */}
    //       <div>
    //         <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
    //         <Input
    //           type="password"
    //           name="confirmPassword"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //           placeholder="Confirm your password"
    //           required
    //           disabled={isLoading}
    //         />
    //       </div>

    //       <Button type="submit" className="w-full" disabled={isLoading}>
    //         {isLoading ? 'Creating account...' : 'Create Account'}
    //       </Button>
    //     </form>

    //     <div className="mt-6 text-center text-sm text-gray-600">
    //       Already have an account?{' '}
    //       <button onClick={onToggleLogin} className="text-blue-600 hover:text-blue-700 font-medium">
    //         Sign in here
    //       </button>
    //     </div>
    //   </div>
    // </div>
//   );
// }
