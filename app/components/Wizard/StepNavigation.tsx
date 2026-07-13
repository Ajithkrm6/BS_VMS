/**
 * Step Navigation - Back and Next buttons for wizard navigation
 * Uses shadcn Button component
 */

import { Button } from '~/components/ui/button';

interface StepNavigationProps {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLoading?: boolean;
  backLoading?: boolean;
  showBack?: boolean;
}

export function StepNavigation({
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  nextDisabled = false,
  backDisabled = false,
  nextLoading = false,
  backLoading = false,
  showBack = true,
}: StepNavigationProps) {
  return (
    <div className="flex gap-2 justify-between mt-6 pt-4 border-t">
      {showBack ? (
        <Button onClick={onBack} variant="outline" disabled={backDisabled || backLoading}>
          {backLoading ? 'Loading...' : backLabel}
        </Button>
      ) : (
        <div />
      )}
      <Button onClick={onNext} disabled={nextDisabled || nextLoading}>
        {nextLoading ? 'Loading...' : nextLabel}
      </Button>
    </div>
  );
}
