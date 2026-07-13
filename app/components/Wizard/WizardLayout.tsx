/**
 * Wizard Layout - Complete multi-step form layout
 * Uses shadcn components (Button, Card, Separator)
 */

import { StepIndicator } from './StepIndicator';
import { StepContainer } from './StepContainer';
import { StepNavigation } from './StepNavigation';

interface WizardStep {
  id: string;
  label: string;
  description?: string;
}

interface WizardLayoutProps {
  steps: WizardStep[];
  currentStep: number;
  stepTitle?: string;
  stepDescription?: string;
  children: React.ReactNode;
  onNext?: () => void | Promise<void>;
  onBack?: () => void;
  onStepClick?: (index: number) => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLoading?: boolean;
  backLoading?: boolean;
  showIndicator?: boolean;
  stepsClickable?: boolean;
  className?: string;
}

export function WizardLayout({
  steps,
  currentStep,
  stepTitle,
  stepDescription,
  children,
  onNext,
  onBack,
  onStepClick,
  nextLabel,
  backLabel,
  nextDisabled = false,
  backDisabled = false,
  nextLoading = false,
  backLoading = false,
  showIndicator = true,
  stepsClickable = false,
  className = '',
}: WizardLayoutProps) {
  return (
    <div className={`w-full max-w-4xl mx-auto px-4 py-8 md:px-8 ${className}`}>
      {/* Step Indicator */}
      {showIndicator && (
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepClick}
          clickable={stepsClickable}
        />
      )}

      {/* Step Container */}
      <StepContainer className="p-3" title={stepTitle} description={stepDescription}>
        {children}
      </StepContainer>

      {/* Navigation */}
      <StepNavigation
        onNext={onNext}
        onBack={currentStep > 0 ? onBack : undefined}
        nextLabel={currentStep === steps.length - 1 ? nextLabel || 'Submit' : nextLabel || 'Next'}
        backLabel={backLabel}
        nextDisabled={nextDisabled}
        backDisabled={backDisabled || currentStep === 0}
        nextLoading={nextLoading}
        backLoading={backLoading}
        showBack={currentStep > 0}
      />
    </div>
  );
}
