/**
 * Opportunities Redux Slice
 * Manages job postings state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  JobPosting,
  JobFilter,
  JobApplication,
  OpportunitiesState,
} from '../types/opportunities';

const initialState: OpportunitiesState = {
  jobs: [],
  filteredJobs: [],
  applications: [],
  selectedJob: null,
  filters: {},
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  itemsPerPage: 10,
};

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    // Fetch Jobs
    fetchJobsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    fetchJobsSuccess: (state, action: PayloadAction<{ jobs: JobPosting[]; total: number }>) => {
      state.jobs = action.payload.jobs;
      state.filteredJobs = action.payload.jobs;
      state.totalCount = action.payload.total;
      state.isLoading = false;
    },

    fetchJobsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Select Job
    selectJob: (state, action: PayloadAction<JobPosting>) => {
      state.selectedJob = action.payload;
    },

    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },

    // Create Job
    createJobStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    createJobSuccess: (state, action: PayloadAction<JobPosting>) => {
      state.jobs.push(action.payload);
      state.filteredJobs.push(action.payload);
      state.totalCount += 1;
      state.isLoading = false;
    },

    createJobError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Update Job
    updateJobStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    updateJobSuccess: (state, action: PayloadAction<JobPosting>) => {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        state.filteredJobs = state.filteredJobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
      }
      if (state.selectedJob?.id === action.payload.id) {
        state.selectedJob = action.payload;
      }
      state.isLoading = false;
    },

    updateJobError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Delete Job
    deleteJobStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    deleteJobSuccess: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      state.filteredJobs = state.filteredJobs.filter((job) => job.id !== action.payload);
      state.totalCount -= 1;
      state.isLoading = false;
    },

    deleteJobError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Filters
    setFilters: (state, action: PayloadAction<JobFilter>) => {
      state.filters = action.payload;
      // Apply filters to jobs
      let filtered = state.jobs;

      if (action.payload.department) {
        filtered = filtered.filter((job) => job.department === action.payload.department);
      }

      if (action.payload.employmentType) {
        filtered = filtered.filter((job) => job.employmentType === action.payload.employmentType);
      }

      if (action.payload.status) {
        filtered = filtered.filter((job) => job.status === action.payload.status);
      }

      if (action.payload.searchText) {
        const text = action.payload.searchText.toLowerCase();
        filtered = filtered.filter(
          (job) =>
            job.title.toLowerCase().includes(text) || job.description.toLowerCase().includes(text)
        );
      }

      state.filteredJobs = filtered;
      state.currentPage = 1; // Reset to first page
    },

    clearFilters: (state) => {
      state.filters = {};
      state.filteredJobs = state.jobs;
      state.currentPage = 1;
    },

    // Pagination
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    // Applications
    fetchApplicationsSuccess: (state, action: PayloadAction<JobApplication[]>) => {
      state.applications = action.payload;
    },

    addApplication: (state, action: PayloadAction<JobApplication>) => {
      state.applications.push(action.payload);
      // Increment applicants count for the job
      const job = state.jobs.find((j) => j.id === action.payload.jobId);
      if (job) {
        job.applicants += 1;
      }
    },

    updateApplicationStatus: (
      state,
      action: PayloadAction<{ applicationId: string; status: JobApplication['status'] }>
    ) => {
      const app = state.applications.find((a) => a.id === action.payload.applicationId);
      if (app) {
        app.status = action.payload.status;
      }
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsError,
  selectJob,
  clearSelectedJob,
  createJobStart,
  createJobSuccess,
  createJobError,
  updateJobStart,
  updateJobSuccess,
  updateJobError,
  deleteJobStart,
  deleteJobSuccess,
  deleteJobError,
  setFilters,
  clearFilters,
  setCurrentPage,
  fetchApplicationsSuccess,
  addApplication,
  updateApplicationStatus,
} = opportunitiesSlice.actions;

export default opportunitiesSlice.reducer;
