/**
 * Example Wizard Flow Page
 * Complete multi-step form using Redux Toolkit + shadcn components
 */

import { useState } from 'react';
import { z } from 'zod';
import { WizardLayout } from '~/components/Wizard';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '~/core/stores';
import {
  updateField,
  validateStep1,
  validateStep2,
  validateStep3,
  submitAll,
  reset,
  selectExampleFlowState,
  selectErrors,
} from '~/stores/exampleFlowSlice';

// Validation schemas (must match exampleFlowSlice)
const step1Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

const step2Schema = z.object({
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code is required'),
});

const step3Schema = z.object({
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(false),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to terms'),
});

const STEPS = [
  {
    id: 'personal',
    label: 'Personal Information',
    description: 'Your basic details',
  },
  {
    id: 'address',
    label: 'Address',
    description: 'Where do you live?',
  },
  {
    id: 'preferences',
    label: 'Preferences',
    description: 'Customize your experience',
  },
  {
    id: 'review',
    label: 'Review & Submit',
    description: 'Confirm everything',
  },
];

export default function ExampleWizardPage() {
  const dispatch = useAppDispatch();
  const flowState = useAppSelector(selectExampleFlowState);
  const errors = useAppSelector(selectErrors);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (field: string, value: unknown) => {
    dispatch(updateField({ field: field as any, value }));
    setError(null);
  };

  // Validate before moving to next step
  const canAdvance = (): boolean => {
    try {
      if (currentStep === 0) {
        step1Schema.parse({
          firstName: flowState.firstName,
          lastName: flowState.lastName,
          email: flowState.email,
        });
      } else if (currentStep === 1) {
        step2Schema.parse({
          address: flowState.address,
          city: flowState.city,
          state: flowState.state,
          zipCode: flowState.zipCode,
        });
      } else if (currentStep === 2) {
        step3Schema.parse({
          newsletter: flowState.newsletter,
          notifications: flowState.notifications,
          agreeToTerms: flowState.agreeToTerms,
        });
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    setError(null);

    try {
      if (currentStep === 3) {
        // Submit on last step
        dispatch(submitAll());
        alert('✓ Form submitted successfully!');
        dispatch(reset());
        setCurrentStep(0);
        setIsLoading(false);
        return;
      }

      // Validate current step
      if (!canAdvance()) {
        // Dispatch validation to populate error messages
        if (currentStep === 0) dispatch(validateStep1());
        else if (currentStep === 1) dispatch(validateStep2());
        else if (currentStep === 2) dispatch(validateStep3());

        setError(
          currentStep === 2 ? 'You must agree to the terms' : 'Please fill in all required fields'
        );
        setIsLoading(false);
        return;
      }

      // Validation passed, dispatch and move to next step
      if (currentStep === 0) dispatch(validateStep1());
      else if (currentStep === 1) dispatch(validateStep2());
      else if (currentStep === 2) dispatch(validateStep3());

      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
    }
  };

  return (
    <WizardLayout
      steps={STEPS}
      currentStep={currentStep}
      stepTitle={STEPS[currentStep].label}
      stepDescription={STEPS[currentStep].description}
      onNext={handleNext}
      onBack={handleBack}
      nextLoading={isLoading}
      nextDisabled={isLoading}
      showIndicator={true}
      stepsClickable={false}
      className=" p-6"
    >
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Personal Information */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={flowState.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={flowState.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={flowState.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Address Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={flowState.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="New York"
                value={flowState.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="NY"
                value={flowState.state}
                onChange={(e) => handleFieldChange('state', e.target.value)}
                maxLength={2}
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={flowState.zipCode}
                onChange={(e) => handleFieldChange('zipCode', e.target.value)}
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preferences */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="flex items-start gap-2 p-3 border rounded bg-gray-50">
            <Checkbox
              id="newsletter"
              checked={flowState.newsletter}
              onCheckedChange={(checked) => handleFieldChange('newsletter', checked)}
            />
            <div>
              <Label htmlFor="newsletter" className="cursor-pointer font-medium">
                Subscribe to Newsletter
              </Label>
              <p className="text-xs text-gray-600">Get updates on new features</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 border rounded bg-gray-50">
            <Checkbox
              id="notifications"
              checked={flowState.notifications}
              onCheckedChange={(checked) => handleFieldChange('notifications', checked)}
            />
            <div>
              <Label htmlFor="notifications" className="cursor-pointer font-medium">
                Enable Push Notifications
              </Label>
              <p className="text-xs text-gray-600">Real-time account notifications</p>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 border rounded bg-red-50 border-red-200">
            <Checkbox
              id="agreeToTerms"
              checked={flowState.agreeToTerms}
              onCheckedChange={(checked) => handleFieldChange('agreeToTerms', checked)}
            />
            <div>
              <Label htmlFor="agreeToTerms" className="cursor-pointer font-medium">
                I agree to the Terms & Conditions *
              </Label>
              <p className="text-xs text-gray-600">Please read our terms and privacy policy</p>
            </div>
          </div>
          {errors.agreeToTerms && <p className="text-xs text-red-600">{errors.agreeToTerms}</p>}
        </div>
      )}

      {/* Step 4: Review */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold text-sm mb-2">Personal Information</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>
                  {flowState.firstName} {flowState.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{flowState.email}</span>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold text-sm mb-2">Address</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Street:</span>
                <span>{flowState.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City, State:</span>
                <span>
                  {flowState.city}, {flowState.state} {flowState.zipCode}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold text-sm mb-2">Preferences</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Newsletter:</span>
                <span>{flowState.newsletter ? '✓ Yes' : '✗ No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Notifications:</span>
                <span>{flowState.notifications ? '✓ Yes' : '✗ No'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Terms Agreed:</span>
                <span>{flowState.agreeToTerms ? '✓ Yes' : '✗ No'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </WizardLayout>
  );
}
