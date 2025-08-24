# Overview

This is a comprehensive financial advisory platform built for the Indian market, called "FINYTH." The application provides personalized investment recommendations, loan comparisons, and expense analysis. It features a modern full-stack architecture with a React frontend and Express.js backend, designed to help users make informed financial decisions through bond suggestions, loan comparisons, and expense tracking.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React 18 using a component-based architecture. The application uses Wouter for client-side routing and TanStack Query for server state management. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, styled with Tailwind CSS using a custom dark theme optimized for financial applications. The frontend follows a pages-based routing structure with dedicated views for Dashboard, Bonds, Loans, Expenses, and Profile management.

## Backend Architecture
The server runs on Express.js with TypeScript, implementing a RESTful API architecture. The application uses an in-memory storage pattern with a well-defined interface that can be easily swapped for a database implementation. Route handlers are organized by feature area (bonds, loans, transactions, user management) and include comprehensive error handling middleware. The server integrates with Vite in development mode for hot module replacement.

## Data Layer
The application uses Drizzle ORM with PostgreSQL as the target database, configured with the @neondatabase/serverless driver for cloud deployment. The schema defines core entities including users, bonds, loans, transactions, and user investment relationships. Currently implements an in-memory storage layer for development that matches the database schema structure, making database migration straightforward.

## Component Design
The UI components are organized into domain-specific modules (BondCard, LoanCard, TransactionItem) and shared UI primitives. Charts are implemented using Recharts for data visualization. The application includes comprehensive form handling with React Hook Form and Zod validation, integrated through the shared schema definitions.

## State Management
Client state is managed through TanStack Query for server data synchronization, with React's built-in state for local component state. The application implements optimistic updates and proper error handling for all API interactions.

# External Dependencies

## UI and Styling
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui + Radix UI**: Component library providing accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Recharts**: Data visualization library for financial charts

## Data and API
- **Drizzle ORM**: Type-safe SQL query builder and ORM
- **Neon Database**: Serverless PostgreSQL database provider
- **TanStack Query**: Server state management and data fetching
- **Zod**: Schema validation for type-safe data handling

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the entire codebase
- **React Hook Form**: Form state management and validation
- **Wouter**: Lightweight client-side routing

## Production Infrastructure
- **Express.js**: Web server framework
- **connect-pg-simple**: PostgreSQL session store
- **ESBuild**: Production bundling for the server