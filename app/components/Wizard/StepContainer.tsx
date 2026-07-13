/**
 * Step Container - Wraps step content in a styled card
 * Uses shadcn Card component
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

interface StepContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function StepContainer({
  title,
  description,
  children,
  className = '',
}: StepContainerProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
