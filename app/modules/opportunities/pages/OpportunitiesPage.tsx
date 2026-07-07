/**
 * Opportunities List Page
 * Display all job postings
 */

import { useEffect, useState } from 'react';
import { Button } from '~/components/Common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Common/Card';
import { Input } from '~/components/Common/Input';
import { useJobs, useJobFilters } from '../hooks/useOpportunities';

export default function OpportunitiesPage() {
  const { jobs, filteredJobs, isLoading, fetchJobs } = useJobs();
  const { filters, applyFilters } = useJobFilters();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    applyFilters({ ...filters, searchText });
  };

  const handleDepartmentFilter = (department: string) => {
    applyFilters({ ...filters, department: department || undefined });
  };

  const displayJobs = filteredJobs.length > 0 ? filteredJobs : jobs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💼 Job Opportunities</h1>
          <p className="text-gray-600 mt-1">Browse and manage open positions</p>
        </div>
        <Button variant="primary">Post New Job</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search jobs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <select
              title="Department"
              className="px-3 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
            <Button variant="primary" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500">Loading job postings...</div>
          </div>
        ) : displayJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No job postings found</p>
            </CardContent>
          </Card>
        ) : (
          displayJobs.map((job: any) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="py-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600 mt-1">{job.department}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {job.employmentType}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        📍 {job.location}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        💰 ${job.salaryRange.min.toLocaleString()} - $
                        {job.salaryRange.max.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-4 text-sm line-clamp-2">{job.description}</p>

                    <div className="mt-4 flex gap-4 text-sm text-gray-600">
                      <span>👥 {job.applicants} applicants</span>
                      <span>⏰ Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                      <span>🎯 Closes: {new Date(job.closingDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="ml-4 flex gap-2">
                    <Button variant="secondary">View Details</Button>
                    <Button variant="primary">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Info */}
      {displayJobs.length > 0 && (
        <div className="text-center text-gray-600 text-sm">
          Showing {displayJobs.length} of {jobs.length} opportunities
        </div>
      )}
    </div>
  );
}
