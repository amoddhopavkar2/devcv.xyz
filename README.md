# Resume Builder

A modern web application for creating professional resumes with LaTeX templates. The application provides a Google Docs-like interface for easy editing and supports popular LaTeX resume templates.

## Features

- Beautiful, responsive UI built with Material-UI
- Support for popular LaTeX resume templates (Jake's Resume, FAANGPath, etc.)
- Real-time preview of resume changes
- Export to PDF and LaTeX formats
- Template customization options
- Mobile-friendly design

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components and styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- RESTful API architecture
- LaTeX template processing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- LaTeX distribution (for PDF generation)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

2. Install dependencies:
```bash
npm run install-all
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
resume-builder/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       └── App.tsx        # Main application component
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
└── package.json           # Project dependencies
```

## API Endpoints

- `GET /api/templates` - Get all available templates
- `GET /api/templates/:id` - Get a specific template
- `GET /api/resume/:id` - Get resume data
- `POST /api/resume/:id` - Save resume data
- `POST /api/resume/:id/generate` - Generate PDF from resume

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 