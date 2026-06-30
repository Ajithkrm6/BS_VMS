#!/usr/bin/null

# 📦 Job Postings (Opportunities) Module - Complete Example

This is a complete, production-ready example of how to create a feature module in BS-VMS with:

- ✅ Redux state management (Module Store)
- ✅ API services
- ✅ Custom React hooks
- ✅ Route pages
- ✅ Type safety with TypeScript
- ✅ Feature flag integration

---

## 📁 What Was Created

```
app/modules/opportunities/
├── module.config.ts                      # Module registration & config
├── README.md                             # Module documentation
│
├── types/
│   └── opportunities.ts                  # TypeScript interfaces
│       ├── JobPosting
│       ├── JobApplication
│       ├── JobFilter
│       └── OpportunitiesState
│
├── stores/
│   └── opportunitiesSlice.ts            # Redux Toolkit slice
│       ├── Initial state
│       ├── 20+ reducer actions
│       └── Exported actions & reducer
│
├── services/
│   └── opportunitiesAPI.ts              # API service
│       ├── getJobs()
│       ├── getJobById()
│       ├── createJob()
│       ├── updateJob()
│       ├── deleteJob()
│       ├── getApplications()
│       ├── submitApplication()
│       └── updateApplicationStatus()
│
├── hooks/
│   └── useOpportunities.ts              # Custom React hooks
│       ├── useJobs()
│       ├── useSelectedJob()
│       ├── useCreateJob()
│       ├── useUpdateJob()
│       ├── useDeleteJob()
│       ├── useJobFilters()
│       ├── useJobPagination()
│       ├── useApplyJob()
│       └── useApplicationStatus()
│
├── pages/
│   ├── OpportunitiesPage.tsx            # Job listings page
│   │   ├── Job list display
│   │   ├── Search & filter
│   │   ├── Pagination
│   │   └── Responsive design
│   │
│   └── JobDetailsPage.tsx               # Job details page
│       ├── Full job information
│       ├── Requirements
│       ├── Salary range
│       ├── Application form
│       └── Timeline
│
└── components/                          # (Ready for custom components)
    └── (can add JobCard, JobForm, etc.)
```

---

## 🎯 What Each File Does

### 📋 `module.config.ts` - Module Registration

```typescript
Registers:
- Module name: 'opportunities'
- Feature flag: 'jobPostings'
- Routes: /opportunities, /opportunities/:id
- Redux store: opportunities reducer
- Permissions: read, create, edit
```

### 🏗️ `types/opportunities.ts` - Type Definitions

```typescript
Defines:
- JobPosting interface (20+ fields)
- JobApplication interface
- JobFilter interface
- OpportunitiesState interface
```

### 🧩 `stores/opportunitiesSlice.ts` - State Management

```typescript
Manages:
- jobs array
- filteredJobs array
- selectedJob selection
- filters and search
- pagination (page, itemsPerPage)
- loading and error states

Provides:
- 20+ reducer actions
- State updates based on API responses
```

### 📡 `services/opportunitiesAPI.ts` - API Calls

```typescript
Provides:
- GET /api/opportunities - list jobs
- GET /api/opportunities/:id - get job
- POST /api/opportunities - create job
- PUT /api/opportunities/:id - update job
- DELETE /api/opportunities/:id - delete job
- POST /api/opportunities/:id/applications - apply
- PUT /api/applications/:id - update app status
```

### 🎣 `hooks/useOpportunities.ts` - Custom Hooks

```typescript
Simplifies API access:
- useJobs() - get & manage jobs
- useSelectedJob() - select job details
- useCreateJob() - create new job
- useUpdateJob() - update job
- useDeleteJob() - delete job
- useJobFilters() - manage filters
- useJobPagination() - handle pagination
- useApplyJob() - submit application
- useApplicationStatus() - change app status
```

### 📄 `pages/OpportunitiesPage.tsx` - List View

```typescript
Displays:
- All job postings
- Search box
- Department filter
- Employment type filter
- Job cards with:
  - Title, department, location
  - Salary range
  - Applicant count
  - Posted/closing dates
```

### 📄 `pages/JobDetailsPage.tsx` - Detail View

```typescript
Displays:
- Full job information
- Job description
- Requirements (education, experience, skills)
- Timeline (posted, closing, applicants)
- Application form sidebar
- Salary range
```

---

## 🔌 Integration Steps

### 1. Enable Feature Flag

```typescript
// app/utils/featureFlags.ts

jobPostings: {
  name: 'jobPostings',
  enabled: true,
  description: 'Job postings and career opportunities',
  rolloutPercentage: 100,
  targetEnvironments: ['development', 'staging', 'production'],
}
```

### 2. Register Module

```typescript
// app/main.tsx

import { opportunitiesModuleConfig } from './modules/opportunities/module.config';

moduleRegistry.registerModule(opportunitiesModuleConfig);
```

### 3. Module Auto-Loads

✅ Routes registered  
✅ Redux reducer injected  
✅ Features available

### 4. Access in Components

```typescript
import { useJobs, useJobFilters } from '~/modules/opportunities/hooks/useOpportunities';
import { useAppSelector } from '~/stores';

export function Dashboard() {
  const user = useAppSelector(state => state.auth.user);
  const { jobs, isLoading } = useJobs();

  return <h1>Welcome {user.name}, {jobs.length} jobs available</h1>;
}
```

---

## 📊 Redux State Structure

```typescript
Redux Store:
{
  // Global (Main Store)
  auth: {
    user: { id, name, email, role },
    isAuthenticated: boolean
  },

  appSettings: {
    theme: 'light' | 'dark',
    language: 'en' | 'es'
  },

  // Module Store (Opportunities)
  opportunities: {
    jobs: [
      { id, title, department, location, salary, description, ... },
      ...
    ],
    filteredJobs: [...],
    applications: [
      { id, jobId, candidateName, email, status, ... },
      ...
    ],
    selectedJob: JobPosting | null,
    filters: { department?, employmentType?, ... },
    isLoading: false,
    error: null,
    totalCount: 150,
    currentPage: 1,
    itemsPerPage: 10
  }
}
```

---

## 🎮 Usage Flow

### User Journey: Browse & Apply for Job

```
1. User visits /opportunities
   └─ OpportunitiesPage loads
      └─ useJobs() → fetchJobs()
         └─ opportunitiesAPI.getJobs()
            └─ Redux: fetchJobsSuccess()
               └─ Display job list (25 jobs, 10 per page)

2. User filters by "Engineering" department
   └─ useJobFilters() → applyFilters()
      └─ Redux: setFilters()
         └─ Display filtered jobs (3 matches)

3. User clicks on job
   └─ Navigate to /opportunities/1
      └─ JobDetailsPage loads
         └─ useSelectedJob() → selectJobById('1')
            └─ opportunitiesAPI.getJobById('1')
               └─ Redux: selectJob()
                  └─ Display full job details

4. User fills application form
   └─ useApplyJob() → applyForJob()
      └─ opportunitiesAPI.submitApplication()
         └─ Redux: addApplication()
            └─ Show success message
               └─ Increment applicant count (25 → 26)
```

---

## 🔐 Security Considerations

### Permissions

Module defines:

```typescript
permissions: [
  'opportunities:read', // View jobs (public)
  'opportunities:create', // Post jobs (admin/recruiter)
  'opportunities:edit', // Edit jobs (admin/recruiter)
];
```

### Implement in Your Code

```typescript
export function PostJobButton() {
  const userRole = useAppSelector(state => state.auth.role);

  if (userRole !== 'recruiter' && userRole !== 'admin') {
    return null; // Don't show button
  }

  return <button onClick={postJob}>Post Job</button>;
}
```

---

## 📝 API Response Format (Expected)

### GET /api/opportunities

```json
{
  "jobs": [
    {
      "id": "J1",
      "title": "Senior Engineer",
      "department": "Engineering",
      "location": "San Francisco",
      "employmentType": "Full-Time",
      "salaryRange": { "min": 120000, "max": 160000, "currency": "USD" },
      "requiredSkills": ["React", "TypeScript", "Node.js"],
      "experience": "5+ years",
      "educationRequired": "Bachelor's in CS",
      "status": "Active",
      "applicants": 24,
      "postedDate": "2026-06-01",
      "closingDate": "2026-07-01",
      "description": "...",
      "createdBy": "HR1",
      "createdAt": "2026-06-01T10:00:00Z",
      "updatedAt": "2026-06-01T10:00:00Z"
    }
  ],
  "total": 150
}
```

---

## 🧪 Example: Creating a Job (HR Admin)

```typescript
import { useCreateJob } from '~/modules/opportunities/hooks/useOpportunities';

export function CreateJobForm() {
  const { createJob, isLoading, error } = useCreateJob();

  const handleSubmit = async (formData) => {
    try {
      const newJob = await createJob({
        title: 'Product Manager',
        department: 'Product',
        location: 'New York',
        employmentType: 'Full-Time',
        description: 'We are looking for...',
        salaryRange: { min: 100000, max: 140000, currency: 'USD' },
        requiredSkills: ['Product Strategy', 'Analytics', 'Leadership'],
        experience: '3-5 years',
        educationRequired: "Bachelor's Degree",
        closingDate: '2026-07-30',
        status: 'Active',
        createdBy: 'HR1'
      });

      alert('Job posted successfully!');
      // Refresh list
      fetchJobs();
    } catch (err) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Job Title" required />
      <textarea name="description" placeholder="Job Description" required />
      {/* More fields... */}
      <button disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Job'}
      </button>
    </form>
  );
}
```

---

## 🧪 Example: Applying for a Job (Candidate)

```typescript
import { useApplyJob } from '~/modules/opportunities/hooks/useOpportunities';

export function JobDetailsPage() {
  const { selectedJob } = useSelectedJob();
  const { applyForJob } = useApplyJob();

  const handleApply = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await applyForJob(selectedJob.id, {
        candidateName: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        jobId: selectedJob.id,
        status: 'Applied'
      });

      alert('Application submitted successfully!');
      e.target.reset();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleApply}>
      <input name="name" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" required />
      <button type="submit">Apply Now</button>
    </form>
  );
}
```

---

## ✅ Verification Checklist

- [x] Module configuration created
- [x] Types defined
- [x] Redux slice created with 20+ actions
- [x] API service with 8 methods
- [x] Custom hooks (9 hooks)
- [x] Page components (2 pages)
- [x] TypeScript: 0 errors
- [x] Build: Successful
- [x] Feature flag ready
- [x] Module ready to integrate

---

## 🚀 Next Steps

1. **Enable the Feature Flag**

   ```bash
   # app/utils/featureFlags.ts
   jobPostings: { enabled: true, ... }
   ```

2. **Register the Module**

   ```typescript
   // app/main.tsx
   moduleRegistry.registerModule(opportunitiesModuleConfig);
   ```

3. **Verify It Works**

   ```bash
   npm run dev
   # Visit http://localhost:5173/opportunities
   ```

4. **Connect Backend API**
   - Update `VITE_API_URL` in `.env`
   - Point to your job postings API

5. **Customize**
   - Add more fields to job posting
   - Add file upload for resumes
   - Add email notifications
   - Add analytics

---

## 📚 Related Documentation

- [STORE_ARCHITECTURE_GUIDE.md](./STORE_ARCHITECTURE_GUIDE.md) - Detailed store explanation
- [STORE_QUICK_REFERENCE.md](./STORE_QUICK_REFERENCE.md) - Quick reference with examples
- [app/modules/opportunities/README.md](./app/modules/opportunities/README.md) - Module documentation
- [DEVELOPERS_COMPLETE_GUIDE.md](./DEVELOPERS_COMPLETE_GUIDE.md) - Complete development guide
- [FEATURE_FLAGS_GUIDE.md](./FEATURE_FLAGS_GUIDE.md) - Feature flags documentation

---

## 💡 Key Learning Points

### Main Store (Global)

- ✅ Always loaded
- ✅ Access from anywhere
- ✅ Examples: `auth.user`, `appSettings.theme`

### Module Store (Feature)

- ✅ Loads with feature flag
- ✅ Access within module
- ✅ Examples: `opportunities.jobs`, `opportunities.filters`

### Best Practice

- Use Main Store for cross-module data (authentication, settings)
- Use Module Store for feature-specific data (jobs, vendors, records)
- Use Local Component State for UI state (form inputs, modal open)

---

**Complete**: ✅  
**Version**: 1.0.0  
**Status**: Production Ready 🚀
