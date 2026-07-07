/**
 * Opportunities Hooks
 * Custom React hooks for job postings
 */

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/stores';
import { opportunitiesAPI } from '../services/opportunitiesAPI';
import {
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
  addApplication,
  updateApplicationStatus,
} from '../stores/opportunitiesSlice';
import type { JobPosting, JobFilter, JobApplication } from '../types/opportunities';

/**
 * Hook to fetch all jobs
 */
export function useJobs() {
  const dispatch = useAppDispatch();
  const { jobs, filteredJobs, isLoading, error, totalCount, currentPage, itemsPerPage } =
    useAppSelector((state) => (state as any).opportunities || {});

  const fetchJobs = useCallback(
    async (page = 1) => {
      try {
        dispatch(fetchJobsStart());
        const data = await opportunitiesAPI.getJobs(page, itemsPerPage);
        dispatch(fetchJobsSuccess({ jobs: data.jobs, total: data.total }));
      } catch (err) {
        dispatch(fetchJobsError((err as Error).message));
      }
    },
    [dispatch, itemsPerPage]
  );

  return { jobs, filteredJobs, isLoading, error, totalCount, currentPage, fetchJobs };
}

/**
 * Hook to manage selected job
 */
export function useSelectedJob() {
  const dispatch = useAppDispatch();
  const selectedJob = useAppSelector((state) => (state as any).opportunities?.selectedJob);

  const selectJobById = useCallback(
    async (jobId: string) => {
      try {
        const job = await opportunitiesAPI.getJobById(jobId);
        dispatch(selectJob(job));
      } catch (error) {
        console.error('Error selecting job:', error);
      }
    },
    [dispatch]
  );

  const clearJob = useCallback(() => {
    dispatch(clearSelectedJob());
  }, [dispatch]);

  return { selectedJob, selectJobById, clearJob };
}

/**
 * Hook to create job posting
 */
export function useCreateJob() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => (state as any).opportunities || {});

  const createJob = useCallback(
    async (jobData: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        dispatch(createJobStart());
        const newJob = await opportunitiesAPI.createJob(jobData);
        dispatch(createJobSuccess(newJob));
        return newJob;
      } catch (err) {
        const errorMsg = (err as Error).message;
        dispatch(createJobError(errorMsg));
        throw err;
      }
    },
    [dispatch]
  );

  return { createJob, isLoading, error };
}

/**
 * Hook to update job posting
 */
export function useUpdateJob() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => (state as any).opportunities || {});

  const updateJob = useCallback(
    async (jobId: string, jobData: Partial<JobPosting>) => {
      try {
        dispatch(updateJobStart());
        const updated = await opportunitiesAPI.updateJob(jobId, jobData);
        dispatch(updateJobSuccess(updated));
        return updated;
      } catch (err) {
        const errorMsg = (err as Error).message;
        dispatch(updateJobError(errorMsg));
        throw err;
      }
    },
    [dispatch]
  );

  return { updateJob, isLoading, error };
}

/**
 * Hook to delete job posting
 */
export function useDeleteJob() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => (state as any).opportunities || {});

  const deleteJob = useCallback(
    async (jobId: string) => {
      try {
        dispatch(deleteJobStart());
        await opportunitiesAPI.deleteJob(jobId);
        dispatch(deleteJobSuccess(jobId));
      } catch (err) {
        const errorMsg = (err as Error).message;
        dispatch(deleteJobError(errorMsg));
        throw err;
      }
    },
    [dispatch]
  );

  return { deleteJob, isLoading, error };
}

/**
 * Hook to manage filters
 */
export function useJobFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => (state as any).opportunities?.filters);

  const applyFilters = useCallback(
    (newFilters: JobFilter) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return { filters, applyFilters, resetFilters };
}

/**
 * Hook to manage pagination
 */
export function useJobPagination() {
  const dispatch = useAppDispatch();
  const { currentPage, itemsPerPage, totalCount } = useAppSelector(
    (state) => (state as any).opportunities || {}
  );

  const goToPage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const totalPages = itemsPerPage ? Math.ceil(totalCount / itemsPerPage) : 0;

  return { currentPage, itemsPerPage, totalCount, totalPages, goToPage };
}

/**
 * Hook to submit job application
 */
export function useApplyJob() {
  const dispatch = useAppDispatch();

  const applyForJob = useCallback(
    async (jobId: string, applicationData: Omit<JobApplication, 'id' | 'appliedDate'>) => {
      try {
        const application = await opportunitiesAPI.submitApplication(jobId, applicationData);
        dispatch(addApplication(application));
        return application;
      } catch (error) {
        console.error('Error applying for job:', error);
        throw error;
      }
    },
    [dispatch]
  );

  return { applyForJob };
}

/**
 * Hook to update application status (HR/Admin)
 */
export function useApplicationStatus() {
  const dispatch = useAppDispatch();

  const updateStatus = useCallback(
    async (applicationId: string, status: JobApplication['status']) => {
      try {
        const updated = await opportunitiesAPI.updateApplicationStatus(applicationId, status);
        dispatch(updateApplicationStatus({ applicationId, status }));
        return updated;
      } catch (error) {
        console.error('Error updating application status:', error);
        throw error;
      }
    },
    [dispatch]
  );

  return { updateStatus };
}
