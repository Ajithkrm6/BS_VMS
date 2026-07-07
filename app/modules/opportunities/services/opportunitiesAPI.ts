/**
 * Opportunities API Service
 * Handles job postings API calls
 */

import type { JobPosting, JobApplication } from '../types/opportunities';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const opportunitiesAPI = {
  /**
   * Get all job postings
   * @param page - Page number for pagination
   * @param limit - Items per page
   * @returns Array of job postings
   */
  async getJobs(page: number = 1, limit: number = 10) {
    try {
      const response = await fetch(`${API_BASE}/opportunities?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  /**
   * Get single job posting by ID
   * @param jobId - Job posting ID
   * @returns Job posting details
   */
  async getJobById(jobId: string) {
    try {
      const response = await fetch(`${API_BASE}/opportunities/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  /**
   * Create new job posting
   * @param jobData - Job posting data
   * @returns Created job posting
   */
  async createJob(jobData: Omit<JobPosting, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const response = await fetch(`${API_BASE}/opportunities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          postedDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  /**
   * Update job posting
   * @param jobId - Job posting ID
   * @param jobData - Updated job data
   * @returns Updated job posting
   */
  async updateJob(jobId: string, jobData: Partial<JobPosting>) {
    try {
      const response = await fetch(`${API_BASE}/opportunities/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...jobData,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  /**
   * Delete job posting
   * @param jobId - Job posting ID
   */
  async deleteJob(jobId: string) {
    try {
      const response = await fetch(`${API_BASE}/opportunities/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  },

  /**
   * Get applications for a job
   * @param jobId - Job posting ID
   * @returns Array of applications
   */
  async getApplications(jobId: string) {
    try {
      const response = await fetch(`${API_BASE}/opportunities/${jobId}/applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  /**
   * Submit job application
   * @param jobId - Job posting ID
   * @param applicationData - Application data
   * @returns Created application
   */
  async submitApplication(
    jobId: string,
    applicationData: Omit<JobApplication, 'id' | 'appliedDate'>
  ) {
    try {
      const response = await fetch(`${API_BASE}/opportunities/${jobId}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...applicationData,
          appliedDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  /**
   * Update application status
   * @param applicationId - Application ID
   * @param status - New status
   * @returns Updated application
   */
  async updateApplicationStatus(applicationId: string, status: JobApplication['status']) {
    try {
      const response = await fetch(`${API_BASE}/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },
};
