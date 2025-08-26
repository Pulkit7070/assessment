# Full-Stack User Management Application

A complete full-stack application demonstrating REST API integration with React frontend.

## Features

- **Backend**: Node.js/Express REST API serving user data
- **Frontend**: React application with custom hooks for data fetching
- **Filtering**: Displays only users with .org email addresses
- **Error Handling**: Comprehensive error states and loading indicators
- **Responsive Design**: Works seamlessly across all device sizes

## Technology Stack

- **Backend**: Node.js, Express.js, CORS
- **Frontend**: React, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## API Endpoints

### GET /api/users
Returns all users in JSON format:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "User Name",
      "email": "user@example.org"
    }
  ],
  "message": "Users retrieved successfully"
}
```

### GET /api/health
Health check endpoint for API status.

## Database Schema

The application simulates a users table with the following structure:
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR)

## Custom React Hook

The `useOrgUsers` hook handles:
- Data fetching from the REST API
- Filtering users with .org email addresses
- Loading and error states
- Refetch functionality

## Installation & Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start both backend and frontend: `npm start`
4. Backend runs on http://localhost:3001
5. Frontend runs on http://localhost:5173

## Development

- Backend server: `npm run dev:server`
- Frontend development: `npm run dev`
- Both simultaneously: `npm start`

## Key Features Demonstrated

- REST API development
- Database simulation and data management
- React component architecture
- Custom hooks implementation
- API integration and error handling
- Data filtering and transformation
- Responsive UI design
- TypeScript integration