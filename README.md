# LifeLink BD — Blood Donation & Emergency Platform

LifeLink BD is a blood donation and emergency support platform designed to connect blood donors with people who need blood. The platform aims to simplify blood request management, donor coordination, and payment processing through a user-friendly web application.

## Features

- **Homepage:** Introduces LifeLink BD and its mission.
- **About Us:** Explains the platform's mission, vision, values, and blood donation process.
- **Donor Registration:** Provides an entry point for users who want to become blood donors.
- **Requester Flow:** Allows requesters to submit blood requests with the required blood group, units, hospital details, urgency, date, and reason.
- **Payment Integration:** Connects blood request creation with the payment gateway using the payment URL returned by the backend.
- **Authentication:** Login and role-based navigation for supported user roles.
- **Role-Based Dashboards:** Navigation for administrators, donors, and requesters.
- **Responsive UI:** Designed to work across desktop and mobile screen sizes.
- **Custom 404 Page:** Provides navigation when a page cannot be found.

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) — React framework
- [React](https://react.dev/) — UI development
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Shadcn/ui](https://ui.shadcn.com/) — UI components
- [TanStack Form](https://tanstack.com/form) — Form state and validation
- [TanStack Query](https://tanstack.com/query) — Server-state management
- [Zod](https://zod.dev/) — Schema validation
- [ofetch](https://github.com/unjs/ofetch) — HTTP requests
- [Lucide React](https://lucide.dev/) — Icons

### Backend

The frontend integrates with a separately developed backend built with:

- Node.js and Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod validation
- JWT authentication
- Redis for supported caching and OTP workflows
- bKash payment integration

## User Roles

| Role | Purpose |
|---|---|
| `SUPER_ADMIN` | Platform-wide administration |
| `ADMIN` | Administrative operations |
| `DONOR` | Donor profile and donation-related activities |
| `REQUESTER` | Blood request and payment-related activities |

Available functionality depends on the user's role and the backend implementation.

## Blood Request Workflow

1. The requester fills in the blood request form.
2. The frontend validates the submitted information.
3. TanStack Query sends the request to the backend.
4. The backend creates the blood request and returns a payment URL.
5. The frontend redirects the requester to the payment gateway.
6. The backend verifies the payment result and updates the payment status.

**Note:** Being redirected to the payment gateway does not itself mean the payment has succeeded. Payment confirmation must come from the backend.

## Getting Started

### Prerequisites

Make sure you have installed:

- [Bun](https://bun.sh/) — JavaScript runtime and package manager
- Node.js — a version compatible with your installed Next.js version
- Access to the LifeLink BD backend API

### 1. Clone the repository

```bash
git clone <your-frontend-repository-url>
cd <your-frontend-folder>
```

Replace the placeholders with your actual repository URL and folder name.

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Replace the URL with your actual backend API base URL when necessary. The variable name must match the one used by your API client.

Never expose private API secrets, payment credentials, or server-side environment variables through `NEXT_PUBLIC_` variables.

### 4. Start the development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
bun run build
```

To run the production build locally:

```bash
bun run start
```

These commands assume the standard Next.js scripts are configured in `package.json`.

## Project Structure

A simplified example of the frontend structure:

```text
src/
├── app/
│   ├── about-us/
│   │   └── page.tsx
│   ├── requester/
│   │   └── create-request/
│   │       └── page.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── page.tsx
├── assets/
│   └── svg/
├── components/
│   ├── ui/
│   └── requester/
├── hooks/
├── lib/
├── services/
└── types/
```

The actual directory structure may differ depending on your project configuration.

## Architecture and Development Approach

- **Static Site Generation (SSG):** Suitable for public pages such as the homepage and About Us page when their content does not require per-request personalization.
- **TanStack Form:** Manages form values, validation, and submission.
- **TanStack Query:** Handles API mutations, queries, loading states, and server-state synchronization.
- **Reusable Components:** Shared UI components help keep the code maintainable.
- **TypeScript:** Provides type safety for API payloads, responses, and application logic.
- **Role-Based Navigation:** Dashboard links depend on the authenticated user's role.

Pages that depend on authentication, personalized data, or payment results require appropriate dynamic rendering or client-side data fetching rather than assuming all pages can be statically generated.

## Future Improvements

- Requester dashboard with blood request history
- Blood request listing, filtering, and search
- Donor availability and matching
- Payment status and transaction history
- Request status tracking
- Admin dashboard and donor approval
- Improved loading, error, and empty states
- Automated testing and accessibility improvements

## Author

**Md Zilhaj Un Noor**

- GitHub: [ZilhajSajid](https://github.com/ZilhajSajid)
- LinkedIn: [Md Zilhaj Un Noor](https://www.linkedin.com/in/md-zilhaj-un-noor/)

---

*LifeLink BD — Every drop matters. Every life counts.*