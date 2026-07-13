/**
 * Step Indicator - Shows current step progress
 * Uses only shadcn Button component
 */

import { Button } from '~/components/ui/button';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  clickable?: boolean;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepClick,
  clickable = false,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
          {/* Step Button */}
          <Button
            onClick={() => clickable && index <= currentStep && onStepClick?.(index)}
            disabled={!clickable || index > currentStep}
            variant={
              index < currentStep ? 'default' : index === currentStep ? 'default' : 'outline'
            }
            className={`min-w-10 h-10 rounded-full p-0 ${
              index < currentStep
                ? 'bg-green-600 hover:bg-green-700'
                : index === currentStep
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : ''
            }`}
          >
            {index < currentStep ? '✓' : index + 1}
          </Button>

          {/* Label */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{step.label}</p>
            {step.description && <p className="text-xs text-gray-500">{step.description}</p>}
          </div>

          {/* Divider */}
          {index < steps.length - 1 && (
            <div className="hidden md:block w-8 h-0.5 bg-gray-300 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
