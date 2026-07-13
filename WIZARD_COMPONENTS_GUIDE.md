# Wizard Components Guide - Complete Multi-Step Flow System

## Overview

A complete, production-ready wizard component system using **shadcn UI** components. Designed for clean, multi-step flows with automatic state management through Zod stores.

---

## Components

### 1. **StepNavigation**

Back/Next button navigation for steps.

```tsx
import { StepNavigation } from '~/components/Wizard';

<StepNavigation
  onBack={() => setStep((prev) => prev - 1)}
  backLabel="Back"
  backDisabled={false}

  onNext={() => setStep((prev) => prev + 1)}
  nextLabel="Next"
  nextDisabled={!isFormValid}
  nextLoading={isSaving}
/>;
```

**Props:**

- `onNext?: () => void | Promise<void>` - Next action handler
- `nextLabel?: string` - Default: "Next"
- `nextDisabled?: boolean` - Disable next button
- `nextLoading?: boolean` - Show loading state
- `onBack?: () => void` - Back action handler
- `backLabel?: string` - Default: "Back"
- `backDisabled?: boolean` - Disable back button
- `backLoading?: boolean` - Show loading state
- `children?: React.ReactNode` - Main content
- `noticeExtra?: React.ReactNode` - Extra notice area
- `responsiveLayout?: boolean` - Responsive styling

---

### 2. **StepProgress**

Animated progress bar showing step completion.

```tsx
import { StepProgress } from '~/components/Wizard';

<StepProgress value={75} label="Personal Information" showPercentage={true} size="md" />;
```

**Props:**

- `value: number` - Progress (0-100) **[Required]**
- `label?: string | React.ReactNode` - Progress label
- `showPercentage?: boolean` - Show % text
- `size?: 'sm' | 'md' | 'lg'` - Default: "md"
- `className?: string` - Custom CSS

---

### 3. **ModalSaveChangesBlocker**

Modal dialog for unsaved changes confirmation.

```tsx
import { ModalSaveChangesBlocker } from '~/components/Wizard';

<ModalSaveChangesBlocker
  isOpen={hasUnsavedChanges}
  blocker={navigationBlocker}
  save={async () => {
    await submitForm();
  }}
  isDisabled={!isFormValid}
  isPending={isSaving}
/>;
```

**Props:**

- `isOpen: boolean` - Modal visibility **[Required]**
- `blocker?: { state, proceed?, reset? }` - Navigation blocker object
- `save?: () => void | Promise<void>` - Save action
- `discard?: () => void` - Discard action
- `isDisabled?: boolean` - Disable save button
- `isPending?: boolean` - Show loading state
- `title?: string` - Default: "Unsaved Changes"
- `description?: string` - Custom message
- `labels?: { save?, discard?, cancel? }` - Custom labels

---

### 4. **StepIndicator**

Visual step progress indicator with completion status.

```tsx
import { StepIndicator } from '~/components/Wizard';

const steps = [
  { id: 'basic', label: 'Basic Info', description: 'Your name and email' },
  { id: 'address', label: 'Address', description: 'Where you live' },
  { id: 'payment', label: 'Payment', description: 'Payment method' },
];

<StepIndicator
  steps={steps}
  currentStep={1}
  clickable={true}
  onStepClick={(index) => setStep(index)}
  showDescriptions={true}
  size="md"
  orientation="horizontal"
/>;
```

**Props:**

- `steps: Step[]` - Array of steps **[Required]**
- `currentStep: number` - Current step index **[Required]**
- `onStepClick?: (index: number) => void` - Step click handler
- `clickable?: boolean` - Allow clicking steps
- `showDescriptions?: boolean` - Show step descriptions
- `size?: 'sm' | 'md' | 'lg'` - Default: "md"
- `orientation?: 'horizontal' | 'vertical'` - Default: "horizontal"
- `className?: string` - Custom CSS

---

### 5. **StepContainer**

Wrapper for step content with consistent styling.

```tsx
import { StepContainer } from '~/components/Wizard';

<StepContainer
  title="Personal Information"
  description="Enter your basic details"
  isLoading={false}
  animate={true}
>
  {/* Form fields */}
</StepContainer>;
```

**Props:**

- `children: React.ReactNode` - Step content **[Required]**
- `title?: string` - Step title
- `description?: string` - Step description
- `isLoading?: boolean` - Show skeleton loaders
- `className?: string` - Custom CSS
- `animate?: boolean` - Enable animations

---

### 6. **WizardLayout**

Complete wizard layout combining all components.

```tsx
import { WizardLayout } from '~/components/Wizard';

const steps = [
  { id: 'step1', label: 'Step 1' },
  { id: 'step2', label: 'Step 2' },
  { id: 'step3', label: 'Step 3' },
];

<WizardLayout
  steps={steps}
  currentStep={currentStep}
  stepTitle="Personal Information"
  stepDescription="Enter your details"
  stepProgress={33}
  onNext={handleNext}
  onBack={handleBack}
  nextDisabled={!isFormValid}
  nextLoading={isSaving}
  showIndicator={true}
  stepsClickable={true}
  onStepClick={setCurrentStep}
>
  {/* Step content */}
</WizardLayout>;
```

**Props:**

- `steps: WizardStep[]` - Array of steps **[Required]**
- `currentStep: number` - Current step index **[Required]**
- `children: React.ReactNode` - Step content **[Required]**
- `stepTitle?: string` - Title for current step
- `stepDescription?: string` - Description for current step
- `stepProgress?: number` - Progress percentage (0-100)
- `onNext?: () => void | Promise<void>` - Next handler
- `onBack?: () => void` - Back handler
- `onStepClick?: (index: number) => void` - Step click handler
- `showProgress?: boolean` - Default: true
- `showIndicator?: boolean` - Default: true
- `isLoading?: boolean` - Loading state
- `nextDisabled?: boolean` - Disable next button
- `backDisabled?: boolean` - Disable back button
- `nextLoading?: boolean` - Next button loading
- `backLoading?: boolean` - Back button loading
- `stepsClickable?: boolean` - Allow step clicking
- `className?: string` - Custom CSS

---

## Complete Example: Multi-Step Form

```tsx
import { useState } from 'react';
import { WizardLayout } from '~/components/Wizard';
import { usePurchaseConfirmation } from '~/stores/purchase';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

const steps = [
  { id: 'shipping', label: 'Shipping Info' },
  { id: 'payment', label: 'Payment Details' },
  { id: 'review', label: 'Review & Confirm' },
];

export function PurchaseWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { submitStep1, getStep1, progressStep1, submitStep2, getStep2, progressStep2 } =
    usePurchaseConfirmation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    try {
      setIsLoading(true);

      if (currentStep === 0) {
        // Submit step 1
        const formData = await getStep1();
        await submitStep1(formData.value);
      } else if (currentStep === 1) {
        // Submit step 2
        const formData = await getStep2();
        await submitStep2(formData.value);
      } else if (currentStep === 2) {
        // Final submission
        console.log('Submitting form...');
      }

      setCurrentStep((prev) => prev + 1);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setError(null);
  };

  const handleStepClick = (index: number) => {
    if (index <= currentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <WizardLayout
      steps={steps}
      currentStep={currentStep}
      stepTitle={steps[currentStep].label}
      stepProgress={((currentStep + 1) / steps.length) * 100}
      onNext={handleNext}
      onBack={handleBack}
      onStepClick={handleStepClick}
      nextLoading={isLoading}
      stepsClickable={true}
      showIndicator={true}
      showProgress={true}
    >
      {/* Step 1: Shipping */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Shipping Address</Label>
            <Input id="address" placeholder="Enter address" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter city" />
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="card">Card Number</Label>
            <Input id="card" placeholder="Enter card number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="CVV" />
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}

      {/* Step 3: Review */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <p>Please review your information before submitting.</p>
          <div className="rounded bg-gray-100 p-4">
            <h3 className="font-semibold">Summary</h3>
            {/* Display summary */}
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </WizardLayout>
  );
}
```

---

## Integration with Zod Stores

The wizard components work perfectly with the Zod store pattern:

```tsx
import { usePurchaseConfirmation } from '~/stores/purchase';

export function MyWizardForm() {
  const { submitStep1, getStep1, progressStep1, requirementsStep1 } = usePurchaseConfirmation();

  const handleNext = async () => {
    try {
      // Get current state
      const currentData = await getStep1();

      // Submit if valid
      await submitStep1(currentData.value);

      // Get progress
      const progress = await progressStep1();
      console.log(`${progress.percent}% complete`);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <WizardLayout
      // ... props
      onNext={handleNext}
    >
      {/* Content */}
    </WizardLayout>
  );
}
```

---

## Theming

All components use **`useComponentTheme()` hook** for automatic theme support:

```tsx
// Automatically adapts to all 6 themes
// Light, Dark, Brand, Ocean, Sunset, High Contrast Dark

const componentTheme = useComponentTheme();

// All colors already applied:
// - buttonPrimary, buttonPrimaryText, buttonPrimaryHover
// - textPrimary, textSecondary, textMuted
// - cardBg, cardText, cardBorder
// - And more...
```

---

## Best Practices

### ✅ Do's

1. **Use WizardLayout for complete flows** - Combines everything
2. **Use Zod stores for state** - Store pattern handles validation
3. **Show progress bars** - Helps users know how far along they are
4. **Make steps clickable** - Allow backtracking to previous steps
5. **Validate before next** - Check form validity before enabling next
6. **Show loading states** - Disable buttons during submission
7. **Display errors clearly** - Show validation errors under fields

### ❌ Don'ts

1. Don't skip validation - Always validate before next
2. Don't disable back button - Users need to go back
3. Don't show confusing step labels - Be clear and concise
4. Don't make too many steps - Break into 3-5 manageable steps
5. Don't save to wrong store - Use the Zod store pattern
6. Don't hardcode colors - Use `useComponentTheme()`

---

## Advanced Patterns

### Pattern 1: Unsaved Changes Blocker

```tsx
import { useBlocker } from 'react-router-dom';
import { ModalSaveChangesBlocker } from '~/components/Wizard';

export function FormWithBlocker() {
  const [isDirty, setIsDirty] = useState(false);
  const blocker = useBlocker(isDirty);

  return (
    <>
      <form onChange={() => setIsDirty(true)}>{/* form fields */}</form>

      <ModalSaveChangesBlocker
        isOpen={blocker.state === 'blocked'}
        blocker={blocker}
        save={async () => {
          await submitForm();
          setIsDirty(false);
        }}
        discard={() => {
          blocker.proceed?.();
          setIsDirty(false);
        }}
      />
    </>
  );
}
```

### Pattern 2: Conditional Steps

```tsx
const [showPayment, setShowPayment] = useState(false);

const steps = [
  { id: 'info', label: 'Info' },
  ...(showPayment ? [{ id: 'payment', label: 'Payment' }] : []),
  { id: 'review', label: 'Review' },
];

// When user enables payment in step 1
const handleEnablePayment = () => {
  setShowPayment(true);
};
```

### Pattern 3: Auto-Save on Step Change

```tsx
const handleNext = async () => {
  try {
    // Auto-save current step
    await submitStep1(formData);

    // Then move to next
    setCurrentStep((prev) => prev + 1);
  } catch (error) {
    showError(error);
  }
};
```

---

## Troubleshooting

### Q: Steps aren't clickable?

**A:** Set `stepsClickable={true}` on WizardLayout.

### Q: Progress bar not updating?

**A:** Pass `stepProgress` prop with value 0-100.

### Q: Buttons disabled unexpectedly?

**A:** Check `nextDisabled` and `backDisabled` props.

### Q: Modal not showing?

**A:** Ensure `isOpen={true}` when unsaved changes exist.

### Q: Animations not working?

**A:** Install `motion/react`: `npm install motion`

---

## Summary

- ✅ 6 powerful components
- ✅ shadcn UI based
- ✅ Full theme support
- ✅ Zod store integration
- ✅ Production-ready
- ✅ Fully typed
- ✅ Responsive design
- ✅ Accessible (ARIA labels)

**Ready to use in all multi-step flows!** 🚀
