import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex w-full gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list flex w-full items-stretch rounded-none border-b border-gray-200",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-muted p-[3px]",
        line: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative flex-1 inline-flex items-center justify-center",

        "px-2 sm:px-3 md:px-4 py-3",

        "text-xs sm:text-sm md:text-base",

        "font-medium",

        "whitespace-nowrap",

        "border-b-2 border-transparent",

        "text-muted-foreground",

        "transition-all duration-200",

        "hover:text-foreground",

        "focus:outline-none",
        "focus-visible:ring-0",

        "disabled:pointer-events-none",
        "disabled:opacity-50",

        // Active state
        "[&[aria-selected='true']]:font-bold",
        "[&[aria-selected='true']]:text-black",
        "[&[aria-selected='true']]:border-black",

        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "w-full flex-1 outline-none",
        className
      )}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
};