# Complete Guide: Multi-Step Forms (Wizard) for Junior Developers

A step-by-step guide to understanding and building multi-step forms using Redux Toolkit, Zod validation, and shadcn UI components.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Creating Your First Wizard](#creating-your-first-wizard)
4. [Understanding Zod Schemas](#understanding-zod-schemas)
5. [Redux State Management](#redux-state-management)
6. [Building Components](#building-components)
7. [Complete Example](#complete-example)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

---

## Overview

A **multi-step form** (or wizard) lets users complete a complex task by breaking it into smaller steps:

```
Step 1: Personal Info → Step 2: Address → Step 3: Preferences → Step 4: Review
```

### Key Technologies

- **Redux Toolkit** - Manages form state globally
- **Zod** - Validates data with clear error messages
- **shadcn UI** - Pre-built, styled components (Button, Input, Checkbox, etc.)
- **Tailwind CSS** - Styling utility classes

### What You'll Learn

- ✅ Create validation schemas with Zod
- ✅ Build Redux slices for form state
- ✅ Connect components to Redux
- ✅ Handle validation and error display
- ✅ Navigate between steps
- ✅ Submit form data

---

## Architecture

### How It All Works Together

```
User fills form
    ↓
Component dispatches action
    ↓
Redux reducer updates state
    ↓
Zod validates data
    ↓
Component reads updated state
    ↓
UI updates with errors or success
```

### File Structure for a New Wizard

```
app/
├── stores/
│   └── yourWizardSlice.ts          ← Redux state + validation
├── components/
│   └── Wizard/
│       ├── StepIndicator.tsx       ← Shows step progress
│       ├── StepContainer.tsx       ← Wraps step content
│       ├── StepNavigation.tsx      ← Back/Next buttons
│       ├── WizardLayout.tsx        ← Combines all above
│       └── index.ts                ← Exports
└── modules/
    └── yourModule/
        └── pages/
            └── YourWizardPage.tsx  ← Main page component
```

---

## Creating Your First Wizard

### Step 1: Create the Redux Slice

Create a new file: `app/stores/yourWizardSlice.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// ============================================================================
// 1. DEFINE VALIDATION SCHEMAS
// ============================================================================

// Schema for Step 1 - What fields does this step need?
const step1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

// Schema for Step 2
const step2Schema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits'),
});

// ============================================================================
// 2. CREATE TYPE DEFINITIONS
// ============================================================================

// Infer types from schemas (auto-generated from schema)
type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

// Combine all steps into one state
interface YourWizardState extends Step1Data, Step2Data {
  // Meta fields (not part of validation)
  errors: Record<string, string>; // { firstName: "First name is required" }
  currentStep: number; // 0, 1, 2, etc.
  isSubmitting: boolean; // Loading state
  isSubmitError: string | null; // Error message after submit
}

// ============================================================================
// 3. DEFINE INITIAL STATE
// ============================================================================

const initialState: YourWizardState = {
  // Step 1 fields
  firstName: '',
  lastName: '',
  email: '',

  // Step 2 fields
  address: '',
  city: '',
  zipCode: '',

  // Meta
  errors: {},
  currentStep: 0,
  isSubmitting: false,
  isSubmitError: null,
};

// ============================================================================
// 4. CREATE THE SLICE
// ============================================================================

const yourWizardSlice = createSlice({
  name: 'yourWizard',
  initialState,
  reducers: {
    // Update any field in the form
    updateField: (state, action: PayloadAction<{ field: keyof YourWizardState; value: any }>) => {
      const { field, value } = action.payload;

      // Don't update meta fields
      if (
        field !== 'errors' &&
        field !== 'currentStep' &&
        field !== 'isSubmitting' &&
        field !== 'isSubmitError'
      ) {
        (state[field] as any) = value;
        // Clear error for this field when user edits
        delete state.errors[field];
      }
    },

    // Validate step 1
    validateStep1: (state) => {
      state.errors = {}; // Clear previous errors
      try {
        // Try to parse the data against schema
        step1Schema.parse({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
        });
        // If successful, no errors
      } catch (error) {
        // If validation fails, capture error messages
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            state.errors[field] = err.message;
          });
        }
      }
    },

    // Validate step 2
    validateStep2: (state) => {
      state.errors = {};
      try {
        step2Schema.parse({
          address: state.address,
          city: state.city,
          zipCode: state.zipCode,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            state.errors[field] = err.message;
          });
        }
      }
    },

    // Submit all data
    submitAll: (state) => {
      state.isSubmitting = true;
      try {
        // Validate all steps
        step1Schema.parse({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
        });

        step2Schema.parse({
          address: state.address,
          city: state.city,
          zipCode: state.zipCode,
        });

        // If we reach here, all validation passed!
        state.isSubmitting = false;
        state.isSubmitError = null;
      } catch (error) {
        state.isSubmitting = false;
        state.isSubmitError = error instanceof Error ? error.message : 'Submission failed';
      }
    },

    // Reset to initial state
    reset: () => initialState,

    // Clear errors
    clearErrors: (state) => {
      state.errors = {};
    },
  },
});

// ============================================================================
// 5. EXPORT ACTIONS (what components can call)
// ============================================================================

export const { updateField, validateStep1, validateStep2, submitAll, reset, clearErrors } =
  yourWizardSlice.actions;

// ============================================================================
// 6. EXPORT SELECTORS (how components read state)
// ============================================================================

export const selectYourWizardState = (state: any) => state.yourWizard;
export const selectErrors = (state: any) => state.yourWizard.errors;
export const selectIsSubmitting = (state: any) => state.yourWizard.isSubmitting;

// ============================================================================
// 7. EXPORT REDUCER (registered in Redux store)
// ============================================================================

export default yourWizardSlice.reducer;
```

### Step 2: Register in Redux Store

Edit `app/core/stores/index.ts`:

```typescript
import yourWizardReducer from '~/stores/yourWizardSlice';

export const createAppStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      theme: themeReducer,
      exampleFlow: exampleFlowReducer,
      yourWizard: yourWizardReducer, // ← ADD THIS LINE
    },
    // ... rest of config
  });
};
```

### Step 3: Create the Page Component

Create `app/modules/yourModule/pages/YourWizardPage.tsx`:

```typescript
import { useState } from 'react';
import { z } from 'zod';
import { WizardLayout } from '~/components/Wizard';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useAppDispatch, useAppSelector } from '~/core/stores';
import {
  updateField,
  validateStep1,
  validateStep2,
  submitAll,
  reset,
  selectYourWizardState,
  selectErrors,
} from '~/stores/yourWizardSlice';

// Define steps
const STEPS = [
  { id: 'personal', label: 'Personal Info', description: 'Your basic details' },
  { id: 'address', label: 'Address', description: 'Where do you live?' },
  { id: 'review', label: 'Review', description: 'Confirm your information' },
];

// Same schemas as in slice (for validation in component)
const step1Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

const step2Schema = z.object({
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Valid ZIP code is required'),
});

export default function YourWizardPage() {
  // Get Redux state and dispatch
  const dispatch = useAppDispatch();
  const wizardState = useAppSelector(selectYourWizardState);
  const errors = useAppSelector(selectErrors);

  // Component state
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ========== HANDLER FUNCTIONS ==========

  // Called when user types in a field
  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateField({ field: field as any, value }));
    setError(null); // Clear error message
  };

  // Check if current step data is valid
  const canAdvance = (): boolean => {
    try {
      if (currentStep === 0) {
        step1Schema.parse({
          firstName: wizardState.firstName,
          lastName: wizardState.lastName,
          email: wizardState.email,
        });
      } else if (currentStep === 1) {
        step2Schema.parse({
          address: wizardState.address,
          city: wizardState.city,
          zipCode: wizardState.zipCode,
        });
      }
      return true;
    } catch {
      return false;
    }
  };

  // Called when user clicks "Next"
  const handleNext = () => {
    setIsLoading(true);
    setError(null);

    try {
      if (currentStep === 2) {
        // Last step - submit
        dispatch(submitAll());
        alert('✓ Form submitted successfully!');
        dispatch(reset());
        setCurrentStep(0);
        setIsLoading(false);
        return;
      }

      // Check if current step is valid
      if (!canAdvance()) {
        // Dispatch validation to populate error messages
        if (currentStep === 0) dispatch(validateStep1());
        else if (currentStep === 1) dispatch(validateStep2());

        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // Validation passed - dispatch and move to next step
      if (currentStep === 0) dispatch(validateStep1());
      else if (currentStep === 1) dispatch(validateStep2());

      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Called when user clicks "Back"
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  // ========== RENDER ==========

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
    >
      {/* Show error at top of form */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* STEP 1: Personal Info */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={wizardState.firstName}
                onChange={e => handleFieldChange('firstName', e.target.value)}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={wizardState.lastName}
                onChange={e => handleFieldChange('lastName', e.target.value)}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={wizardState.email}
              onChange={e => handleFieldChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Address */}
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Address */}
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              value={wizardState.address}
              onChange={e => handleFieldChange('address', e.target.value)}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-xs text-red-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="New York"
                value={wizardState.city}
                onChange={e => handleFieldChange('city', e.target.value)}
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1">{errors.city}</p>
              )}
            </div>

            {/* ZIP Code */}
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={wizardState.zipCode}
                onChange={e => handleFieldChange('zipCode', e.target.value)}
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && (
                <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Review */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold text-sm mb-2">Personal Information</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>{wizardState.firstName} {wizardState.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span>{wizardState.email}</span>
              </div>
            </div>
          </div>

          <div className="p-3 border rounded bg-gray-50">
            <h3 className="font-semibold text-sm mb-2">Address</h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span>{wizardState.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City:</span>
                <span>{wizardState.city}, {wizardState.zipCode}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </WizardLayout>
  );
}
```

### Step 4: Register Route

Edit your module's `module.config.ts`:

```typescript
import YourWizardPage from './pages/YourWizardPage';

export const landingModuleConfig: ModuleConfig = {
  moduleName: 'landing',
  routes: [
    // ... other routes
    {
      path: '/your-wizard',
      name: 'Your Wizard',
      component: YourWizardPage,
      isPublic: true,
      order: 10,
    },
  ],
};
```

---

## Understanding Zod Schemas

### What is Zod?

Zod is a **validation library** that checks if data matches your expected format.

### Basic Schema Syntax

```typescript
import { z } from 'zod';

// String that must be at least 2 characters
const name = z.string().min(2, 'Name must be at least 2 characters');

// Email that must be valid
const email = z.string().email('Invalid email address');

// Number that must be positive
const age = z.number().min(18, 'Must be 18 or older');

// Boolean (true/false)
const agreed = z.boolean();

// Optional string (can be empty)
const nickname = z.string().optional();

// Combine multiple fields into one object
const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18),
  newsletter: z.boolean().default(false),
});
```

### Common Validations

```typescript
// Strings
z.string()
  .min(5, 'Min 5 chars')
  .max(100, 'Max 100 chars')
  .email('Invalid email')
  .regex(/^\d{5}$/, 'Must be 5 digits'); // ZIP code

// Numbers
z.number().min(0, 'Must be positive').max(150, 'Max 150').int('Must be integer');

// Booleans
z.boolean().refine((val) => val === true, 'You must agree');

// Collections
z.array(z.string()); // Array of strings
z.enum(['option1', 'option2']); // One of these values

// Unions (one or the other)
z.union([z.string(), z.number()]);
```

### Advanced: Custom Validation

```typescript
// Custom validation with refine
const password = z
  .string()
  .min(8, 'Min 8 characters')
  .refine((val) => /[A-Z]/.test(val), 'Must contain uppercase letter')
  .refine((val) => /[0-9]/.test(val), 'Must contain a number');

// Using and for multiple validations
const passwordSchema = z
  .object({
    password: z.string().min(8),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'], // Show error on confirm field
  });
```

### Using Schemas to Validate

```typescript
const userSchema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
});

// Parse (throws error if invalid)
try {
  const result = userSchema.parse({
    firstName: 'J',  // ❌ Too short!
    email: 'john@example.com',
  });
} catch (error) {
  console.error(error.errors);
  // [{ path: ['firstName'], message: 'Min 2 chars' }]
}

// Safe parse (returns result object)
const result = userSchema.safeParse({...});
if (!result.success) {
  console.error(result.error.errors);
}

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>;
// Type User = { firstName: string; email: string }
```

---

## Redux State Management

### What is Redux?

Redux stores your application's **global state** - data that many components need.

Think of it like a **global state box** that all components can read from:

```
Redux Store
├── auth (user login info)
├── theme (dark/light mode)
└── yourWizard
    ├── firstName: "John"
    ├── lastName: "Doe"
    ├── email: "john@example.com"
    └── errors: { firstName: "required" }
```

### Redux Slice Structure

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'myWizard',           // Name of this slice
  initialState: {...},        // Starting state
  reducers: {
    // ACTIONS - what can happen to the state
    updateField: (state, action) => {
      // Modify state directly (Immer handles it)
      state.fieldName = action.payload;
    },

    validateStep: (state) => {
      // Validate and set errors
      state.errors = {...};
    },
  },
});

// Export actions (what components dispatch)
export const { updateField, validateStep } = mySlice.actions;

// Export reducer (for store)
export default mySlice.reducer;

// Export selectors (how components read state)
export const selectMyState = (state) => state.myWizard;
```

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '~/core/stores';
import { updateField, selectMyState } from '~/stores/mySlice';

export function MyComponent() {
  // Get dispatch function
  const dispatch = useAppDispatch();

  // Read from state
  const wizardState = useAppSelector(selectMyState);

  // Dispatch action when user types
  const handleChange = (value) => {
    dispatch(updateField({ field: 'firstName', value }));
  };

  return (
    <input
      value={wizardState.firstName}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
```

### ⚠️ Important: Immer Rule

Redux uses **Immer** which allows you to "mutate" state directly. But there's a rule:

```typescript
// ✅ CORRECT: Modify draft OR return nothing
reducers: {
  updateField: (state, action) => {
    state.value = action.payload;  // Just modify, don't return
  },
}

// ❌ WRONG: Don't modify AND return
reducers: {
  updateField: (state, action) => {
    state.value = action.payload;
    return state;  // ❌ ERROR!
  },
}

// ✅ CORRECT: Return new state
reducers: {
  updateField: (state, action) => {
    return { ...state, value: action.payload };  // Full replacement
  },
}
```

---

## Building Components

### Using shadcn Components

The wizard uses only **shadcn components** (no external dependencies):

```typescript
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

// Input field with error styling
<Input
  value={formData.name}
  onChange={(e) => setName(e.target.value)}
  className={errors.name ? 'border-red-500' : ''}
/>

// Label
<Label htmlFor="name">Full Name *</Label>

// Checkbox
<Checkbox
  id="agreed"
  checked={formData.agreed}
  onCheckedChange={(checked) => setAgreed(checked)}
/>

// Card for grouping content
<Card>
  <CardHeader>
    <CardTitle>Personal Info</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content here */}
  </CardContent>
</Card>

// Button
<Button onClick={() => handleSubmit()}>
  Submit
</Button>
```

### Styling with Tailwind

Use Tailwind utility classes for responsive design:

```typescript
// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>Col 1</div>
  <div>Col 2</div>
</div>

// Spacing
<div className="space-y-4">  {/* 4 space between children */}
  <input />
  <input />
</div>

// Responsive text
<h1 className="text-sm md:text-lg lg:text-2xl">
  Title
</h1>

// Conditional styling
<input
  className={isError ? 'border-red-500' : 'border-gray-300'}
/>
```

---

## Complete Example

### Scenario: "Job Application Wizard"

A form where users apply for a job in 3 steps:

1. **Personal Info**: Name, Email
2. **Experience**: Years, Skills
3. **Review**: Show all data

### File 1: Redux Slice - `app/stores/jobApplicationSlice.ts`

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// STEP 1 Schema
const step1Schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
});

// STEP 2 Schema
const step2Schema = z.object({
  yearsExperience: z.number().min(0, 'Cannot be negative').max(60, 'Invalid value'),
  skills: z.string().min(10, 'Please describe your skills'),
  certifications: z.boolean(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

interface JobApplicationState extends Step1Data, Step2Data {
  errors: Record<string, string>;
  currentStep: number;
  isSubmitting: boolean;
}

const initialState: JobApplicationState = {
  fullName: '',
  email: '',
  phone: '',
  yearsExperience: 0,
  skills: '',
  certifications: false,
  errors: {},
  currentStep: 0,
  isSubmitting: false,
};

const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof JobApplicationState; value: any }>
    ) => {
      const { field, value } = action.payload;
      if (!['errors', 'currentStep', 'isSubmitting'].includes(field)) {
        (state[field] as any) = value;
        delete state.errors[field];
      }
    },

    validateStep1: (state) => {
      state.errors = {};
      try {
        step1Schema.parse({
          fullName: state.fullName,
          email: state.email,
          phone: state.phone,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            state.errors[err.path[0] as string] = err.message;
          });
        }
      }
    },

    validateStep2: (state) => {
      state.errors = {};
      try {
        step2Schema.parse({
          yearsExperience: state.yearsExperience,
          skills: state.skills,
          certifications: state.certifications,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            state.errors[err.path[0] as string] = err.message;
          });
        }
      }
    },

    submitApplication: (state) => {
      state.isSubmitting = true;
      try {
        step1Schema.parse({
          fullName: state.fullName,
          email: state.email,
          phone: state.phone,
        });
        step2Schema.parse({
          yearsExperience: state.yearsExperience,
          skills: state.skills,
          certifications: state.certifications,
        });
        state.isSubmitting = false;
        console.log('Application submitted!');
      } catch (error) {
        state.isSubmitting = false;
      }
    },

    reset: () => initialState,
  },
});

export const { updateField, validateStep1, validateStep2, submitApplication, reset } =
  jobApplicationSlice.actions;
export const selectJobAppState = (state: any) => state.jobApplication;
export const selectJobAppErrors = (state: any) => state.jobApplication.errors;
export default jobApplicationSlice.reducer;
```

### File 2: Page Component - `app/modules/jobs/pages/JobApplicationPage.tsx`

```typescript
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
  submitApplication,
  reset,
  selectJobAppState,
  selectJobAppErrors,
} from '~/stores/jobApplicationSlice';

const STEPS = [
  { id: 'personal', label: 'Personal Info', description: 'Your contact details' },
  { id: 'experience', label: 'Experience', description: 'Your background' },
  { id: 'review', label: 'Review', description: 'Confirm your application' },
];

// Schemas (same as slice)
const step1Schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
});

const step2Schema = z.object({
  yearsExperience: z.number().min(0).max(60),
  skills: z.string().min(10),
  certifications: z.boolean(),
});

export default function JobApplicationPage() {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(selectJobAppState);
  const errors = useAppSelector(selectJobAppErrors);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (field: string, value: any) => {
    dispatch(updateField({ field: field as any, value }));
    setError(null);
  };

  const canAdvance = (): boolean => {
    try {
      if (currentStep === 0) {
        step1Schema.parse({
          fullName: appState.fullName,
          email: appState.email,
          phone: appState.phone,
        });
      } else if (currentStep === 1) {
        step2Schema.parse({
          yearsExperience: appState.yearsExperience,
          skills: appState.skills,
          certifications: appState.certifications,
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

    if (currentStep === 2) {
      dispatch(submitApplication());
      alert('✓ Application submitted!');
      dispatch(reset());
      setCurrentStep(0);
      setIsLoading(false);
      return;
    }

    if (!canAdvance()) {
      if (currentStep === 0) dispatch(validateStep1());
      else if (currentStep === 1) dispatch(validateStep2());
      setError('Please check your entries');
      setIsLoading(false);
      return;
    }

    if (currentStep === 0) dispatch(validateStep1());
    else if (currentStep === 1) dispatch(validateStep2());

    setCurrentStep(prev => prev + 1);
    setIsLoading(false);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
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
    >
      {error && <div className="mb-4 p-3 bg-red-100 rounded text-red-700">{error}</div>}

      {/* STEP 1 */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div>
            <Label>Full Name *</Label>
            <Input
              value={appState.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className={errors.fullName ? 'border-red-500' : ''}
            />
            {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={appState.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label>Phone (10 digits) *</Label>
            <Input
              value={appState.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <Label>Years of Experience *</Label>
            <Input
              type="number"
              value={appState.yearsExperience}
              onChange={(e) => handleFieldChange('yearsExperience', parseInt(e.target.value) || 0)}
              className={errors.yearsExperience ? 'border-red-500' : ''}
            />
            {errors.yearsExperience && <p className="text-red-600 text-xs mt-1">{errors.yearsExperience}</p>}
          </div>

          <div>
            <Label>Your Skills *</Label>
            <textarea
              value={appState.skills}
              onChange={(e) => handleFieldChange('skills', e.target.value)}
              className={`w-full p-2 border rounded ${errors.skills ? 'border-red-500' : ''}`}
              placeholder="Describe your professional skills..."
              rows={4}
            />
            {errors.skills && <p className="text-red-600 text-xs mt-1">{errors.skills}</p>}
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="certs"
              checked={appState.certifications}
              onCheckedChange={(checked) => handleFieldChange('certifications', checked)}
            />
            <Label htmlFor="certs">I have relevant certifications</Label>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {currentStep === 2 && (
        <div className="space-y-3">
          <div className="p-3 border rounded bg-blue-50">
            <div className="font-bold">Full Name: {appState.fullName}</div>
            <div>Email: {appState.email}</div>
            <div>Phone: {appState.phone}</div>
          </div>

          <div className="p-3 border rounded bg-blue-50">
            <div className="font-bold">Experience: {appState.yearsExperience} years</div>
            <div className="mt-2">Skills: {appState.skills}</div>
            <div className="mt-2">Certifications: {appState.certifications ? '✓ Yes' : '✗ No'}</div>
          </div>
        </div>
      )}
    </WizardLayout>
  );
}
```

---

## Common Patterns

### Pattern 1: Conditional Steps

Skip steps based on user input:

```typescript
const STEPS = [
  { id: 'personal', label: 'Personal', },
  { id: 'company', label: 'Company', },
  ...
];

// Only show company step if they're a business
const visibleSteps = userType === 'business'
  ? STEPS
  : STEPS.filter(s => s.id !== 'company');
```

### Pattern 2: Auto-save to LocalStorage

Persist form data:

```typescript
// On mount
useEffect(() => {
  const saved = localStorage.getItem('myWizardData');
  if (saved) {
    dispatch(loadFromStorage(JSON.parse(saved)));
  }
}, []);

// On change
useEffect(() => {
  localStorage.setItem('myWizardData', JSON.stringify(appState));
}, [appState]);
```

### Pattern 3: Progress Indicator

Show percentage complete:

```typescript
const progress = ((currentStep + 1) / STEPS.length) * 100;

<div className="w-full bg-gray-200 h-2 rounded">
  <div
    className="bg-blue-500 h-2 rounded"
    style={{ width: `${progress}%` }}
  />
</div>
```

### Pattern 4: Multiple Form Instances

Different wizards on same page:

```typescript
// Create separate slices
export const slice1 = createSlice({ name: 'wizard1', ... });
export const slice2 = createSlice({ name: 'wizard2', ... });

// Register both in store
reducer: {
  wizard1: slice1Reducer,
  wizard2: slice2Reducer,
}

// Use in components with different selectors
const state1 = useAppSelector(selectWizard1);
const state2 = useAppSelector(selectWizard2);
```

---

## Troubleshooting

### Error: "Immer producer returned a new value _and_ modified its draft"

**Problem**: Returning AND modifying state in reducer

```typescript
// ❌ WRONG
reducers: {
  updateField: (state, action) => {
    state.value = action.payload;
    return state;  // ERROR!
  },
}
```

**Solution**: Just modify, don't return

```typescript
// ✅ CORRECT
reducers: {
  updateField: (state, action) => {
    state.value = action.payload;  // Only modify
  },
}
```

### Error: "Cannot read property of undefined"

**Problem**: Component rendered before Redux registered slice

**Solution**: Make sure slice is added to store:

```typescript
// app/core/stores/index.ts
reducer: {
  yourWizard: yourWizardReducer,  // Must be here
}
```

### Form data disappears on refresh

**Problem**: No persistence to localStorage/database

**Solution**: Save data after each step or on unmount

```typescript
useEffect(() => {
  const data = JSON.stringify(appState);
  localStorage.setItem('formData', data);
}, [appState]);
```

### Validation errors not showing

**Problem**: Component not reading error state

```typescript
// ❌ Wrong
const errors = appState.errors; // Gets entire object

// ✅ Correct
const errors = useAppSelector(selectErrors); // Gets from Redux selector
```

### Next button doesn't advance step

**Problem**: `canAdvance()` returns false due to validation schema mismatch

**Solution**: Make sure schemas match slice AND component

```typescript
// Slice
const step1Schema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
});

// Component - MUST BE IDENTICAL
const step1Schema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
});
```

---

## Checklist: Building Your Wizard

- [ ] Create Redux slice with schemas and reducers
- [ ] Register slice reducer in `app/core/stores/index.ts`
- [ ] Create page component with form fields
- [ ] Duplicate validation schemas from slice to component
- [ ] Add field handlers (`handleFieldChange`, `canAdvance`, `handleNext`)
- [ ] Create STEPS array with labels and descriptions
- [ ] Build JSX for each step
- [ ] Add error display under each field
- [ ] Test validation (try submitting with empty fields)
- [ ] Test navigation (back/next buttons)
- [ ] Test form data persists across steps
- [ ] Register route in module config
- [ ] Test in browser

---

## Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Zod Validation Docs](https://zod.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Example Wizard Page](./app/modules/landing/pages/ExampleWizardPage.tsx)

---

## Quick Reference

### Imports Every Wizard Needs

```typescript
import { useState } from 'react';
import { z } from 'zod';
import { WizardLayout } from '~/components/Wizard';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { useAppDispatch, useAppSelector } from '~/core/stores';
```

### Redux Slice Template

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

const step1Schema = z.object({
  field1: z.string().min(2),
  field2: z.string().email(),
});

type Step1Data = z.infer<typeof step1Schema>;

interface WizardState extends Step1Data {
  errors: Record<string, string>;
  currentStep: number;
}

const initialState: WizardState = {
  field1: '',
  field2: '',
  errors: {},
  currentStep: 0,
};

const slice = createSlice({
  name: 'myWizard',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      (state[field] as any) = value;
      delete state.errors[field];
    },
    validateStep1: (state) => {
      state.errors = {};
      try {
        step1Schema.parse(state);
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            state.errors[err.path[0] as string] = err.message;
          });
        }
      }
    },
  },
});

export const { updateField, validateStep1 } = slice.actions;
export default slice.reducer;
```

---

Happy coding! 🚀
