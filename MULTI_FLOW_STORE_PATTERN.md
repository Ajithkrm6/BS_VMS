# Multi-Flow Zod Store Pattern - BJAC Analysis & Implementation Guide

## Overview

The BJAC project uses a **clean, schema-first approach** for managing complex multi-step flows. This guide explains the pattern and how to apply it to the BS-BenchSales application.

---

## Architecture Pattern

```
┌─────────────────────────────────────────────────────┐
│         Schema Definitions (step-1.ts, etc)         │
│  - Draft schema (partial, for UI state)             │
│  - Official schema (complete, for submission)       │
│  - Field requirements & conditions                  │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│    Store Integration (index.ts)                     │
│  - Zustand store with immer + devtools             │
│  - State mutations using parsed schemas             │
│  - Progress tracking & validation                   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│    Type Definitions (index.headers.ts)              │
│  - Strongly typed actions & state                   │
│  - Safe parameter types for each step               │
└─────────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. Schema-First Design

Define all data shapes as Zod schemas **first**, then build the store around them.

### 2. Two-Schema Approach

- **Draft Schema**: Partial validation, allows empty fields
- **Official Schema**: Complete validation, required fields enforced
- Both derived from same base, ensuring consistency

### 3. Step-Based Organization

Each step is a separate file with:

- Fields definition
- Requirements logic
- Validation rules

### 4. No Hardcoded Logic

All business logic lives in Zod schemas, not in store actions.

---

## File Structure Pattern

```
stores/
  purchase/                 # Feature flow
    schema/
      index.ts              # Combines all steps
      step-1.ts             # Step 1 schema & requirements
      step-2.ts             # Step 2 schema & requirements
    api-wrappers/           # External API calls
      update-cart-item.ts
    index.ts                # Zustand store
    index.headers.ts        # TypeScript definitions
```

---

## Implementation Pattern

### Step 1: Define Schema (step-1.ts)

```typescript
import { z } from 'zod';
import { formText, formToggle, formAddress } from '~/schema/fields';
import { createConditionalRequirement, createRequirementsFromSchema } from '~/schema/utils';

// Define individual fields using helpers
const { titledTo } = formText('titledTo').alwaysRequired;
const { titlingAddress } = formAddress('titlingAddress').alwaysRequired;
const { areYouShipping } = formToggle('areYouShipping').alwaysRequired;

// Combine into base schema
const schemaBase = z.object({
  [titledTo.name]: titledTo.schema,
  [titlingAddress.name]: titlingAddress.schema,
  [areYouShipping.name]: areYouShipping.schema,
});

// Define conditional requirements
const billOfLadingRequired = createConditionalRequirement({
  requiredPath: 'billOfLading',
  requiredMessage: 'Bill of Lading is required when shipping',
  determinants: schemaBase.pick({ areYouShipping: true }),
  requiredCondition: (data) => data.areYouShipping === true,
  validFieldCondition: (data) => (data.billOfLading?.length ?? 0) > 0,
});

// Create requirements function that combines all validations
const requirements = createRequirementsFromSchema(schemaBase, async (data, ctx) => {
  const billOfLadingReq = await billOfLadingRequired.required(data, ctx);
  return new RequiredDetails(true, false, {
    [titledTo.name]: titledTo.required,
    [billOfLading.name]: billOfLadingReq.value,
  });
});

// Apply to schema
const schema = schemaBase.superRefine(async (data, ctx) => {
  await requirements(data, ctx);
});

// Export wrapped version
export const { step1 } = wrapInName('step1', {
  schema,
  fields: schemaBase.shape,
  requirements,
});
```

### Step 2: Combine Steps (schema/index.ts)

```typescript
import { step1 } from './step-1';
import { step2 } from './step-2';
import { z } from 'zod';

// Combine all steps into single schema
const schemaBase = z.object(step1.fields).safeExtend(step2.fields);

// Combine requirements
const requirements = createRequirementsFromSchema(schemaBase, async (data, ctx) => {
  const [step1Reqs, step2Reqs] = await Promise.all([
    step1.requirements(data, ctx),
    step2.requirements(data, ctx),
  ]);
  return new RequiredDetails(true, false, {
    ...step1Reqs.subfields,
    ...step2Reqs.subfields,
  });
});

// Apply combined validation
const schema = schemaBase.superRefine(async (data, ctx) => {
  await requirements(data, ctx);
});

// Defaults
const defaults = {
  titledTo: '',
  titlingAddress: { ...formAddress(null).defaults },
  areYouShipping: null,
};

// Export everything
export const { confirmPurchaseDetails } = wrapInName('confirmPurchaseDetails', {
  schema,
  fields: schemaBase.shape,
  requirements,
  defaults,
  step1,
  step2,
});
```

### Step 3: Create Store (index.ts)

```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';
import { confirmPurchaseDetails } from './schema';
import type { State, Actions } from './index.headers';

const defaults = {
  ...confirmPurchaseDetails.defaults,
  purchaseId: null,
} satisfies State;

export const usePurchaseConfirmation = create<State & Actions>()(
  persist(
    immer(
      devtools(
        (set, get) => ({
          ...defaults,

          // For each step, provide 4 standard actions:

          async submitStep1(given) {
            // 1. Parse using official schema
            const parsed = await confirmPurchaseDetails.step1.schema.parseAsync(given);

            // 2. Make API calls if needed
            const purchaseId = get().purchaseId;
            if (purchaseId) {
              await updateCartItemDeliveryMethod(purchaseId, parsed);
            }

            // 3. Update state with immer
            set((state) => {
              Object.assign(state, parsed);
            });
          },

          async getStep1() {
            // Return both parsed status and values
            const step = await retrieveParsedSchemaValues(
              confirmPurchaseDetails.step1.schema,
              confirmPurchaseDetails.step1.fields
            ).retrieve(get());
            return step;
          },

          async progressStep1() {
            // Calculate completion percentage
            const progress = await getStepProgress(
              confirmPurchaseDetails.step1.schema,
              confirmPurchaseDetails.step1.fields,
              confirmPurchaseDetails.step1.requirements
            ).retrieve(get());
            return progress;
          },

          async requirementsStep1(determinants) {
            // Get requirements for conditional logic
            return confirmPurchaseDetails.step1.requirements(determinants);
          },

          // Repeat for Step 2, Step 3, etc...
        }),
        { name: 'purchase-confirmation' }
      )
    ),
    {
      name: 'purchase-confirmation-storage',
    }
  )
);
```

### Step 4: Define Types (index.headers.ts)

```typescript
import type { confirmPurchaseDetails } from './schema';
import type { step1 } from './schema/step-1';
import type { step2 } from './schema/step-2';
import type { GetStepResult, GetStepProgressResult } from '~/schema/utils';
import type { z } from 'zod';

// Type each step's schema
type Step1Schema = typeof step1.schema;
type Step1Fields = typeof step1.fields;
type Step2Schema = typeof step2.schema;
type Step2Fields = typeof step2.fields;

// State is the input type of combined schema
export type State = z.input<typeof confirmPurchaseDetails.schema> & {
  purchaseId: string | null;
};

// Actions define what the store can do
export type Actions = {
  setPurchaseId(id: string): void;

  // For each step, provide 4 actions
  submitStep1(given: z.input<Step1Schema>): Promise<void>;
  getStep1(): Promise<GetStepResult<Step1Schema, Step1Fields>>;
  progressStep1(): Promise<GetStepProgressResult>;
  requirementsStep1(
    determinants: PartialDeep<z.input<Step1Schema>>
  ): ReturnType<typeof step1.requirements>;

  submitStep2(given: z.input<Step2Schema>): Promise<void>;
  getStep2(): Promise<GetStepResult<Step2Schema, Step2Fields>>;
  progressStep2(): Promise<GetStepProgressResult>;
  requirementsStep2(
    determinants: PartialDeep<z.input<Step2Schema>>
  ): ReturnType<typeof step2.requirements>;
};
```

---

## Using the Store in Components

### Example 1: Multi-Step Form

```typescript
import { usePurchaseConfirmation } from "~/stores/purchase"

export function PurchaseWizard() {
  const [step, setStep] = useState(1)

  const {
    submitStep1,
    getStep1,
    progressStep1,
    submitStep2,
    getStep2,
    progressStep2,
  } = usePurchaseConfirmation()

  // Step 1 Form
  const handleStep1Submit = async (formData: typeof step1Draft) => {
    try {
      await submitStep1(formData)
      setStep(2)
    } catch (error) {
      showError(error)
    }
  }

  // Get progress
  const step1Progress = await progressStep1()
  const step2Progress = await progressStep2()

  return (
    <div>
      <ProgressBar value={step === 1 ? step1Progress : step2Progress} />
      {step === 1 && <Step1Form onSubmit={handleStep1Submit} />}
      {step === 2 && <Step2Form onSubmit={handleStep2Submit} />}
    </div>
  )
}
```

### Example 2: Get Current State

```typescript
export function PurchaseSummary() {
  const { getStep1, getStep2 } = usePurchaseConfirmation()

  const step1Data = await getStep1()
  // Returns: { parsed: true | false, value: { ...data } }

  if (step1Data.parsed) {
    return <ValidSummary data={step1Data.value} />
  } else {
    return <DraftSummary data={step1Data.value} />
  }
}
```

### Example 3: Check Requirements

```typescript
export function Step1Fields() {
  const { requirementsStep1 } = usePurchaseConfirmation()

  const reqs = await requirementsStep1({
    areYouShipping: true,
    billOfLading: [],
  })

  // reqs.subfields tells you which fields are required
  return (
    <form>
      {reqs.subfields.billOfLading && (
        <input required placeholder="Bill of Lading" />
      )}
    </form>
  )
}
```

---

## Pattern for Multiple Flows in Same Module

If a module has multiple independent flows (like Bid module with Agreement, Method, Payment):

### Option 1: Separate Stores (Recommended)

```
stores/bid/
  agreement/
    schema.ts
    index.ts
    index.headers.ts
  method/
    schema.ts
    index.ts
    index.headers.ts
  payment/
    schema.ts
    index.ts
    index.headers.ts
```

**Benefits:**

- Clear separation of concerns
- Each store is simple and focused
- Easy to test independently
- Combine stores at higher level if needed

### Option 2: Single Store with Namespaced Steps

```typescript
// If flows share state, combine in single store
export const useBidFlow = create<BidState & BidActions>()((set, get) => ({
  // Agreement flow
  agreement: { ...agreementDefaults },
  async submitAgreement(data) { ... },

  // Method flow
  method: { ...methodDefaults },
  async submitMethod(data) { ... },

  // Payment flow
  payment: { ...paymentDefaults },
  async submitPayment(data) { ... },
}))
```

---

## Utility Functions Used

### `createRequirementsFromSchema()`

Combines schema with custom requirement logic.

```typescript
const requirements = createRequirementsFromSchema(schema, async (data, ctx) => {
  // Your logic to determine what's required
  return new RequiredDetails(true, false, {
    field1: true,
    field2: conditionalValue,
  });
});
```

### `retrieveParsedSchemaValues()`

Gets current state and returns parsed or partial data.

```typescript
const result = await retrieveParsedSchemaValues(schema, fields).retrieve(get());
// { parsed: true, value: {...} } or { parsed: false, value: {...} }
```

### `getStepProgress()`

Calculates what percentage of a step is complete.

```typescript
const progress = await getStepProgress(schema, fields, requirements).retrieve(get());
// { complete: boolean, percent: number }
```

### `wrapInName()`

Wraps a value in an object with a key name for exports.

```typescript
export const { step1 } = wrapInName('step1', { schema, fields, requirements });
// Results in: { step1: { name: "step1", schema, fields, requirements } }
```

---

## Best Practices

### ✅ Do's

1. **Define schemas first** - Let the schema define the truth
2. **Use draft + official schemas** - Allows UI to show partial state
3. **Separate files by step** - Each step in its own file
4. **Reuse field helpers** - `formText`, `formAddress`, etc.
5. **Type everything** - Use index.headers.ts for all type definitions
6. **Test schemas independently** - Test validation logic in isolation
7. **Use conditional requirements** - Keep conditional logic in schema
8. **Combine at top level** - Index.ts combines all steps

### ❌ Don'ts

1. **Don't hardcode validation** - Put it in Zod
2. **Don't mix logic in actions** - Actions should only call schema
3. **Don't create complex state** - Keep state flat from schema
4. **Don't ignore draft/official distinction** - Use for partial saves
5. **Don't skip type definitions** - Always use index.headers.ts
6. **Don't modify schema from store** - Schema is source of truth
7. **Don't create custom validators** - Use Zod refinements

---

## Migration Path for BS-BenchSales

### Phase 1: Extract Schema Structure

```
app/stores/[module]/
  schema/
    index.ts          # Combine all steps
    step-1.ts         # First flow step
    step-2.ts         # Second flow step
```

### Phase 2: Create Store with Standard Pattern

```typescript
export const use[Feature]Flow = create<State & Actions>()((set, get) => ({
  ...defaults,
  submitStep1() { ... },
  getStep1() { ... },
  progressStep1() { ... },
  requirementsStep1() { ... },
}))
```

### Phase 3: Add Type Definitions

```
app/stores/[module]/
  index.headers.ts    # All types
  index.ts            # Implementation
```

---

## Example: Landing Page Flow for BS-BenchSales

If we apply this to BS-BenchSales landing page signup:

### Step 1: Define Schema

**app/stores/auth/schema/step-1.ts**

```typescript
import { z } from 'zod';

const { firstName } = formText('firstName').alwaysRequired;
const { email } = formEmail('email').alwaysRequired;

const schemaBase = z.object({
  [firstName.name]: firstName.schema,
  [email.name]: email.schema,
});

const requirements = createRequirementsFromSchema(schemaBase, async (data, ctx) => {
  return new RequiredDetails(true, false, {
    [firstName.name]: firstName.required,
    [email.name]: email.required,
  });
});

export const { step1 } = wrapInName('step1', {
  schema: schemaBase.superRefine(async (data, ctx) => {
    await requirements(data, ctx);
  }),
  fields: schemaBase.shape,
  requirements,
});
```

### Step 2: Create Store

**app/stores/auth/index.ts**

```typescript
export const useAuthSignup = create<State & Actions>()(
  immer(
    devtools(
      (set, get) => ({
        firstName: '',
        email: '',

        async submitStep1(given) {
          const parsed = await step1.schema.parseAsync(given);
          set((state) => {
            Object.assign(state, parsed);
          });
        },

        async getStep1() {
          return retrieveParsedSchemaValues(step1.schema, step1.fields).retrieve(get());
        },
      }),
      { name: 'auth-signup' }
    )
  )
);
```

### Step 3: Use in Component

```typescript
export function SignupForm() {
  const { submitStep1, progressStep1 } = useAuthSignup()
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (data) => {
    try {
      await submitStep1(data)
      const newProgress = await progressStep1()
      setProgress(newProgress.percent)
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Form fields */}
    </Form>
  )
}
```

---

## Summary

The BJAC pattern provides:

- ✅ Schema-first design
- ✅ Clean separation by step
- ✅ Type-safe throughout
- ✅ Easy progress tracking
- ✅ Conditional requirements handling
- ✅ Reusable components
- ✅ Scalable to many steps
- ✅ Simple to test

This is **production-proven** and ready to adopt in BS-BenchSales! 🚀
