/**
 * Job Details Page
 * Display single job posting with application form
 */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '~/components/Common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/Common/Card';
import { Input } from '~/components/Common/Input';
import { useSelectedJob, useApplyJob } from '../hooks/useOpportunities';
import { LoadingSpinner } from '~/components/Layout/Utility/LoadingSpinner';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedJob, selectJobById } = useSelectedJob();
  const { applyForJob } = useApplyJob();

  useEffect(() => {
    if (id) {
      selectJobById(id);
    }
  }, [id]);

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedJob) return;

    const formData = new FormData(e.currentTarget);

    try {
      await applyForJob(selectedJob.id, {
        candidateName: formData.get('candidateName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        jobId: selectedJob.id,
        status: 'Applied',
      });
      alert('Application submitted successfully!');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      alert('Failed to submit application');
      console.error(error);
    }
  };

  if (!selectedJob) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="secondary" className="mb-4">
          ← Back to Opportunities
        </Button>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold">{selectedJob.title}</h1>
          <p className="text-blue-100 mt-2">{selectedJob.department}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-blue-100">
            <span>📍 {selectedJob.location}</span>
            <span>💼 {selectedJob.employmentType}</span>
            <span>⏱️ {selectedJob.experience}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Salary */}
          <Card>
            <CardHeader>
              <CardTitle>💰 Salary Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${selectedJob.salaryRange.min.toLocaleString()} - $
                {selectedJob.salaryRange.max.toLocaleString()} {selectedJob.salaryRange.currency}
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedJob.description}</p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-600">{selectedJob.educationRequired}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                <p className="text-gray-600">{selectedJob.experience}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>⏰ Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Posted</span>
                <span className="font-semibold">
                  {new Date(selectedJob.postedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application Closes</span>
                <span className="font-semibold">
                  {new Date(selectedJob.closingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Applicants</span>
                <span className="font-semibold">{selectedJob.applicants}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Application Form */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Apply for This Job</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input type="text" name="candidateName" placeholder="John Doe" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input type="email" name="email" placeholder="john@example.com" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input type="tel" name="phone" placeholder="+1 (555) 123-4567" required />
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Submit Application
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By applying, you agree to our terms and conditions
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
