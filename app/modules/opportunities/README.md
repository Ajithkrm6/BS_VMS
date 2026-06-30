#!/usr/bin/null

# 💼 Opportunities Module

Job postings and career opportunity management system.

## 📁 Module Structure

```
app/modules/opportunities/
├── module.config.ts           # Module configuration
├── types/
│   └── opportunities.ts       # TypeScript types
├── stores/
│   └── opportunitiesSlice.ts  # Redux state management
├── services/
│   └── opportunitiesAPI.ts    # API calls
├── hooks/
│   └── useOpportunities.ts    # Custom React hooks
├── pages/
│   ├── OpportunitiesPage.tsx  # Job listings page
│   └── JobDetailsPage.tsx     # Single job details
├── components/                # (Optional) UI components
└── README.md                  # This file
```

## 🎯 Features

### ✅ Job Management

- **List Jobs**: Display all job postings with filtering and search
- **View Details**: View complete job details and requirements
- **Create Jobs**: Post new job opportunities (admin only)
- **Edit Jobs**: Update existing job postings
- **Delete Jobs**: Remove closed or obsolete jobs

### ✅ Job Applications

- **Apply for Jobs**: Submit applications with candidate information
- **Track Applications**: View all applications for each job
- **Update Status**: Change application status (Applied → Interview → Accepted/Rejected)
- **Applicant Count**: Track number of applicants per job

### ✅ Filtering & Search

- Search by job title or description
- Filter by department, employment type, and salary range
- Pagination support for large job lists

## 🏗️ Architecture

### Type System (`types/opportunities.ts`)

```typescript
JobPosting; // Single job posting
JobApplication; // Job application
JobFilter; // Filter criteria
OpportunitiesState; // Redux state shape
```

### State Management (`stores/opportunitiesSlice.ts`)

Manages:

- Job postings list and details
- Job applications
- Filters and search
- Pagination
- Loading states and errors

### API Service (`services/opportunitiesAPI.ts`)

Provides async methods:

- `getJobs()` - Fetch all jobs
- `getJobById(id)` - Get single job
- `createJob()` - Create new job
- `updateJob()` - Update job details
- `deleteJob()` - Delete job
- `getApplications()` - Get applications for a job
- `submitApplication()` - Submit new application
- `updateApplicationStatus()` - Change application status

### Custom Hooks (`hooks/useOpportunities.ts`)

Simplified access to state and API:

- `useJobs()` - Fetch and manage jobs
- `useSelectedJob()` - Handle single job selection
- `useCreateJob()` - Create new job
- `useUpdateJob()` - Update job
- `useDeleteJob()` - Delete job
- `useJobFilters()` - Manage filters
- `useJobPagination()` - Handle pagination
- `useApplyJob()` - Submit application
- `useApplicationStatus()` - Update application status

### Pages

- **OpportunitiesPage** - List all jobs with search/filter
- **JobDetailsPage** - Single job view with application form

## 🔌 Integration

### Module Configuration

```typescript
// app/modules/opportunities/module.config.ts
export const opportunitiesModuleConfig: ModuleConfig = {
  name: 'opportunities',
  featureFlag: 'jobPostings',
  description: 'Job postings and career opportunities',
  routes: [
    { path: '/opportunities', name: 'Opportunities', ... },
    { path: '/opportunities/:id', name: 'Job Details', ... },
  ],
  stores: [{ name: 'opportunities' }],
};
```

### Feature Flag

Add to `app/utils/featureFlags.ts`:

```typescript
jobPostings: {
  name: 'jobPostings',
  enabled: true,
  description: 'Job postings and career opportunities',
  rolloutPercentage: 100,
  targetEnvironments: ['development', 'staging', 'production'],
}
```

### Register in app/main.tsx

```typescript
import { opportunitiesModuleConfig } from './modules/opportunities/module.config';

moduleRegistry.registerModule(opportunitiesModuleConfig);
```

## 📊 Data Flow

### Fetching Jobs

```
User visits /opportunities
  → OpportunitiesPage component
  → useJobs() hook
  → fetchJobs() action
  → opportunitiesAPI.getJobs()
  → Redux store updated
  → Component re-renders with job list
```

### Creating a Job (HR/Admin)

```
HR fills form → createJob() → opportunitiesAPI.createJob()
  → API POST /opportunities
  → Redux: addJobSuccess()
  → Job added to list
  → Modal closes
  → List updates
```

### Applying for Job

```
Candidate fills form → useApplyJob() → opportunitiesAPI.submitApplication()
  → API POST /opportunities/:id/applications
  → Redux: addApplication()
  → Success message
  → Applicant count incremented
```

## 🎨 Component Patterns

### Using Jobs in a Component

```typescript
import { useJobs } from '~/modules/opportunities/hooks/useOpportunities';

export function MyJobsComponent() {
  const { jobs, isLoading, error, fetchJobs } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>{job.title}</div>
      ))}
    </div>
  );
}
```

### Creating a Job

```typescript
import { useCreateJob } from '~/modules/opportunities/hooks/useOpportunities';

export function CreateJobForm() {
  const { createJob, isLoading, error } = useCreateJob();

  const handleSubmit = async (data) => {
    try {
      await createJob(data);
      alert('Job posted successfully!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Job'}
      </button>
    </form>
  );
}
```

### Filtering Jobs

```typescript
import { useJobFilters } from '~/modules/opportunities/hooks/useOpportunities';

export function JobSearch() {
  const { filters, applyFilters } = useJobFilters();

  const handleFilter = (department) => {
    applyFilters({
      ...filters,
      department,
    });
  };

  return (
    <select onChange={(e) => handleFilter(e.target.value)}>
      <option>All Departments</option>
      <option value="Engineering">Engineering</option>
      <option value="Sales">Sales</option>
    </select>
  );
}
```

## 🔐 Permissions

Module defines permissions:

```typescript
permissions: [
  'opportunities:read', // View opportunities
  'opportunities:create', // Post jobs
  'opportunities:edit', // Edit jobs
];
```

Implement in your auth system based on user roles.

## 📡 API Endpoints

The module expects these endpoints:

```
GET    /api/opportunities           // List jobs
POST   /api/opportunities           // Create job
GET    /api/opportunities/:id       // Get job
PUT    /api/opportunities/:id       // Update job
DELETE /api/opportunities/:id       // Delete job

GET    /api/opportunities/:id/applications              // Get applications
POST   /api/opportunities/:id/applications              // Submit application
PUT    /api/applications/:applicationId                 // Update status
```

## 🚀 Usage Example

### 1. Enable Feature Flag

```typescript
// app/utils/featureFlags.ts
jobPostings: { enabled: true, ... }
```

### 2. Register Module

```typescript
// app/main.tsx
import { opportunitiesModuleConfig } from './modules/opportunities/module.config';
moduleRegistry.registerModule(opportunitiesModuleConfig);
```

### 3. Navigate to Jobs

```
http://localhost:5173/opportunities
```

### 4. Post a Job

- Click "Post New Job" button
- Fill in job details
- Submit

### 5. Apply for Job

- View job details
- Fill in application form
- Submit

## 🔄 Redux State Shape

```typescript
{
  opportunities: {
    jobs: JobPosting[],              // All jobs
    filteredJobs: JobPosting[],       // Filtered results
    applications: JobApplication[],   // All applications
    selectedJob: JobPosting | null,   // Currently viewed job
    filters: JobFilter,               // Applied filters
    isLoading: boolean,               // API loading state
    error: string | null,             // Error message
    totalCount: number,               // Total jobs
    currentPage: number,              // Current page
    itemsPerPage: number,             // Items per page
  }
}
```

## 🧪 Testing

### Test Fetching Jobs

```typescript
it('should fetch jobs', async () => {
  const { result } = renderHook(() => useJobs());
  await result.current.fetchJobs();
  expect(result.current.jobs).toHaveLength(> 0);
});
```

### Test Filtering

```typescript
it('should filter jobs by department', async () => {
  const { result } = renderHook(() => useJobFilters());
  act(() => {
    result.current.applyFilters({ department: 'Engineering' });
  });
  expect(result.current.filters.department).toBe('Engineering');
});
```

## 📚 Documentation

- [Main Store vs Module Store](../../VENDOR_MANAGEMENT_UPDATE.md#architecture)
- [Feature Flags](../../FEATURE_FLAGS_GUIDE.md)
- [Module System](../../DEVELOPERS_COMPLETE_GUIDE.md#module-system)

## 🎯 Future Enhancements

- [ ] Email notifications for applications
- [ ] Advanced filtering (skills matching)
- [ ] Candidate ranking system
- [ ] Job posting templates
- [ ] Interview scheduling
- [ ] Offer letter generation
- [ ] Analytics and reporting
- [ ] Bulk job import/export

## 📝 Notes

- Module only loads when `jobPostings` feature flag is enabled
- API calls are configured in `opportunitiesAPI.ts`
- All state is managed via Redux Toolkit
- Custom hooks provide convenient access patterns
- Type-safe with full TypeScript support

---

**Module Version**: 1.0.0  
**Last Updated**: 2026  
**Status**: ✅ Production Ready
