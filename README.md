# Disease Investigation Platform

A modern, interactive React frontend for disease investigation and drug discovery, designed to integrate with Flask backend APIs.

## 🚀 Features

### Core Functionality
- **Disease Search**: Quickly search existing diseases in the database
- **Disease Definition**: Submit new disease information with molecular details
- **Results Visualization**: Interactive data tables with sorting and filtering
- **CSV Export**: Download investigation results for further analysis
- **Real-time Validation**: Form validation with immediate feedback

### Design & UX
- **Modern UI**: Glassmorphism design with gradient backgrounds
- **Smooth Animations**: Micro-interactions and page transitions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG-compliant with keyboard navigation support
- **Loading States**: Skeleton screens and progress indicators

### Technical Features
- **API Integration**: Robust error handling and retry mechanisms
- **State Management**: React Context for global state
- **Performance**: Optimized rendering and data handling
- **Type Safety**: TypeScript support for better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18 with hooks
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Heroicons
- **HTTP Client**: Fetch API with custom wrapper
- **Development**: Vite for fast development and building

## 📁 Project Structure

```
src/
├── components/
│   ├── DiseaseForm.jsx      # Multi-step forms with validation
│   ├── ResultsTable.jsx     # Interactive data visualization
│   ├── DownloadButton.jsx   # CSV download functionality
│   └── LoadingSpinner.jsx   # Loading states and skeletons
├── App.jsx                  # Main application component
├── api.js                   # API integration layer
├── index.css               # Global styles and animations
└── main.tsx                # Application entry point
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- React development experience
- Basic understanding of REST APIs

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd disease-investigation-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update the `API_BASE_URL` in `src/api.js`:
   ```javascript
   const API_BASE_URL = 'YOUR_NGROK_URL'; // Replace with your Flask backend URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔗 Backend Integration

This frontend is designed to work with a Flask backend. Expected API endpoints:

### Search Existing Disease
```http
POST /api/search
Content-Type: application/json

{
  "disease_name": "COVID-19"
}
```

### Define New Disease
```http
POST /api/investigate
Content-Type: application/json

{
  "diseaseName": "Novel Disease",
  "targetProtein": "Protein X",
  "sequence": "ATCGATCGATCG..."
}
```

### Download Results
```http
GET /api/download/{result_id}
Accept: text/csv
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6) - Main actions and links
- **Secondary**: Teal (#14B8A6) - Secondary actions
- **Accent**: Various gradients for visual interest
- **Neutrals**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body**: 16px base, 1.5 line height
- **Code**: Monospace for sequences

### Spacing
- **System**: 8px base unit
- **Components**: Consistent padding and margins
- **Layout**: Responsive grid system

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Optimizations
- Touch-friendly buttons (44px minimum)
- Optimized forms with large input fields
- Floating action button for downloads
- Simplified navigation

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and descriptions
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Focus Management**: Clear focus indicators

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Custom Hooks Usage

The application uses several custom patterns:

- **Form State Management**: Centralized form handling with validation
- **API Integration**: Custom fetch wrapper with error handling
- **Animation Triggers**: Intersection Observer for scroll animations

### State Management

- **Local State**: Component-level with useState
- **Form State**: Custom form validation and submission
- **API State**: Loading, error, and data states
- **UI State**: Navigation, modals, and interactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_BASE_URL=https://your-ngrok-url.com
VITE_APP_TITLE=Disease Investigation Platform
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Home page loads with animations
- [ ] Search form validates input
- [ ] Define form progresses through steps
- [ ] Results table sorts and filters
- [ ] CSV download works
- [ ] Mobile responsive design
- [ ] Keyboard navigation
- [ ] Error states display correctly

### Performance Considerations

- **Lazy Loading**: Components loaded as needed
- **Debounced Search**: Prevents excessive API calls
- **Memoization**: Optimized re-renders
- **Bundle Size**: Minimized dependencies

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Code Style
- Use functional components with hooks
- Follow Tailwind CSS conventions
- Implement proper error boundaries
- Add TypeScript types for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions and support:

1. **Check the documentation** in this README
2. **Review the code comments** for implementation details
3. **Test the API endpoints** with your Flask backend
4. **Check browser console** for error messages

## 🔮 Future Enhancements

- [ ] Real-time collaboration features
- [ ] Advanced data visualization charts
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Advanced search filters
- [ ] Export to multiple formats
- [ ] Integration with external databases
- [ ] User authentication and profiles