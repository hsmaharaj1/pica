# Partner Portal Frontend

A React-based frontend application for partner management and onboarding. This portal provides a streamlined interface for partners to register, login, and manage their dashboard.

## Features

- **Authentication**
  - Phone number-based login with OTP verification
  - Secure session management
  
- **User Management**
  - Partner registration/signup flow
  - Profile management
  - Password recovery

- **Dashboard**
  - Partner overview and statistics
  - Activity monitoring
  - Resource management

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Shadcn/ui Components
- React Router v6
- React Query for state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd partner-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (not required for now):
```env
VITE_API_URL=your_backend_api_url
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route pages
├── assets/            # All the assets
└── App.jsx           # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.