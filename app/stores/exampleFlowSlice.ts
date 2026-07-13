/**
 * Example Flow Redux Slice
 * Demonstrates multi-step form pattern with Zod validation
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { appLogger } from '~/utils/logging';

const console = appLogger.withTag('store').withTag('example-flow');

// ============================================================================
// SCHEMA DEFINITION
// ============================================================================

// Step 1: Personal Information Schema
const step1Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
});

type Step1Data = z.infer<typeof step1Schema>;

// Step 2: Address Information Schema
const step2Schema = z.object({
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Valid ZIP code is required'),
});

type Step2Data = z.infer<typeof step2Schema>;

// Step 3: Preferences Schema
const step3Schema = z.object({
  newsletter: z.boolean().default(false),
  notifications: z.boolean().default(false),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to terms'),
});

type Step3Data = z.infer<typeof step3Schema>;

// ============================================================================
// STATE TYPES
// ============================================================================

interface ExampleFlowState extends Step1Data, Step2Data, Step3Data {
  errors: Record<string, string>;
  currentStep: number;
  isSubmitting: boolean;
  isSubmitError: string | null;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: ExampleFlowState = {
  // Step 1
  firstName: '',
  lastName: '',
  email: '',
  // Step 2
  address: '',
  city: '',
  state: '',
  zipCode: '',
  // Step 3
  newsletter: false,
  notifications: false,
  agreeToTerms: false,
  // Meta
  errors: {},
  currentStep: 0,
  isSubmitting: false,
  isSubmitError: null,
};

// ============================================================================
// SLICE
// ============================================================================

const exampleFlowSlice = createSlice({
  name: 'exampleFlow',
  initialState,
  reducers: {
    // Update a single field
    updateField: (state, action: PayloadAction<{ field: keyof ExampleFlowState; value: any }>) => {
      const { field, value } = action.payload;
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

    // Validate and submit step 1
    validateStep1: (state) => {
      state.errors = {};
      try {
        step1Schema.parse({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
        });
        console.log('✓ Step 1 validation passed');
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            state.errors[field] = err.message;
          });
        }
        console.error('✗ Step 1 validation failed', state.errors);
      }
    },

    // Validate and submit step 2
    validateStep2: (state) => {
      state.errors = {};
      try {
        step2Schema.parse({
          address: state.address,
          city: state.city,
          state: state.state,
          zipCode: state.zipCode,
        });
        console.log('✓ Step 2 validation passed');
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            state.errors[field] = err.message;
          });
        }
        console.error('✗ Step 2 validation failed', state.errors);
      }
    },

    // Validate and submit step 3
    validateStep3: (state) => {
      state.errors = {};
      try {
        step3Schema.parse({
          newsletter: state.newsletter,
          notifications: state.notifications,
          agreeToTerms: state.agreeToTerms,
        });
        console.log('✓ Step 3 validation passed');
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            const field = err.path[0] as string;
            state.errors[field] = err.message;
          });
        }
        console.error('✗ Step 3 validation failed', state.errors);
      }
    },

    // Submit all steps
    submitAll: (state) => {
      state.isSubmitting = true;
      try {
        // Validate all steps
        const allValid =
          (() => {
            try {
              step1Schema.parse({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
              });
              return true;
            } catch {
              return false;
            }
          })() &&
          (() => {
            try {
              step2Schema.parse({
                address: state.address,
                city: state.city,
                state: state.state,
                zipCode: state.zipCode,
              });
              return true;
            } catch {
              return false;
            }
          })() &&
          (() => {
            try {
              step3Schema.parse({
                newsletter: state.newsletter,
                notifications: state.notifications,
                agreeToTerms: state.agreeToTerms,
              });
              return true;
            } catch {
              return false;
            }
          })();

        if (allValid) {
          console.log('✓ All steps validated. Ready for submission:', {
            step1: { firstName: state.firstName, lastName: state.lastName, email: state.email },
            step2: {
              address: state.address,
              city: state.city,
              state: state.state,
              zipCode: state.zipCode,
            },
            step3: {
              newsletter: state.newsletter,
              notifications: state.notifications,
              agreeToTerms: state.agreeToTerms,
            },
          });
          state.isSubmitting = false;
          state.isSubmitError = null;
        } else {
          throw new Error('Validation failed for one or more steps');
        }
      } catch (error) {
        state.isSubmitting = false;
        state.isSubmitError = error instanceof Error ? error.message : 'Submission failed';
        console.error('✗ Submission failed', state.isSubmitError);
      }
    },

    // Reset to initial state
    reset: () => initialState,

    // Clear errors
    clearErrors: (state) => {
      state.errors = {};
      state.isSubmitError = null;
    },

    // Set current step (for navigation)
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export const {
  updateField,
  validateStep1,
  validateStep2,
  validateStep3,
  submitAll,
  reset,
  clearErrors,
  setCurrentStep,
} = exampleFlowSlice.actions;

export default exampleFlowSlice.reducer;

// Selectors
export const selectExampleFlowState = (state: any) => state.exampleFlow;
export const selectStep1Data = (state: any) => ({
  firstName: state.exampleFlow.firstName,
  lastName: state.exampleFlow.lastName,
  email: state.exampleFlow.email,
});
export const selectStep2Data = (state: any) => ({
  address: state.exampleFlow.address,
  city: state.exampleFlow.city,
  state: state.exampleFlow.state,
  zipCode: state.exampleFlow.zipCode,
});
export const selectStep3Data = (state: any) => ({
  newsletter: state.exampleFlow.newsletter,
  notifications: state.exampleFlow.notifications,
  agreeToTerms: state.exampleFlow.agreeToTerms,
});
export const selectErrors = (state: any) => state.exampleFlow.errors;
export const selectIsSubmitting = (state: any) => state.exampleFlow.isSubmitting;
export const selectSubmitError = (state: any) => state.exampleFlow.isSubmitError;
