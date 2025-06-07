# Skip Rental Project
## Overview
A modern, responsive web application for skip rental services built with React and TypeScript. The application features an intuitive user interface for selecting and renting skips of various sizes.

## Technologies Used
### Core Technologies
- React : Frontend library for building user interfaces
- TypeScript : Adds static typing to JavaScript for better development experience
- Vite : Next-generation frontend tooling for faster development and building
### UI Framework and Styling
- Material-UI (MUI) : React component library implementing Google's Material Design
- Tailwind CSS : Utility-first CSS framework for rapid UI development
- Emotion : CSS-in-JS library for component-scoped styling
### Routing
- React Router : Handles client-side routing
### Icons
- Material Icons : Icon set from Material Design
- Lucide React : Modern icon set for React applications
## Project Architecture
### Directory Structure
```
src/
├── components/     # Reusable UI 
components
├── data/          # Static data and mock 
APIs
├── types/         # TypeScript type 
definitions
└── App.tsx        # Main application 
component
```
### Key Features
- Responsive Design : Fully responsive layout that adapts to different screen sizes
- Component-Based Architecture : Modular components for better maintainability
- Type Safety : Strong typing with TypeScript for reduced runtime errors
- Filter System : Dynamic filtering for skip sizes and features
- Modern UI : Gradient-based design with smooth animations and transitions
### Design Patterns
- Controlled Components : Form handling with React state
- Custom Hooks : For reusable stateful logic
- Memo and Callbacks : Performance optimization with React's useMemo and useCallback
- Prop Drilling : Component communication through props
### Styling Approach
- Hybrid Styling : Combination of Material-UI's styled components and Tailwind utility classes
- Theme Customization : Extended Material-UI theme for consistent styling
- Responsive Utilities : Mobile-first approach with Material-UI's useMediaQuery hook
## Development Tools
- ESLint : Code linting and style enforcement
- PostCSS : CSS processing and transformation
- TypeScript ESLint : TypeScript-specific linting rules