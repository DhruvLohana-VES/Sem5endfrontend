# 🏥 Blood Donor Management System

A comprehensive healthcare management platform built with React, featuring modules for **Blood Donors**, **Patients**, and **Caretakers**. This application streamlines blood donation requests, medication adherence tracking, and elderly care management.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Features

### 🩸 **Blood Donor Module**
- **Dashboard**: Real-time statistics, donation history, and nearby emergency requests
- **Active Requests**: Browse and accept blood donation requests with advanced filtering
  - Blood group compatibility guide
  - Urgency level indicators (High/Medium/Low)
  - Distance tracking and hospital contact information
  - Interactive modals with detailed request information
- **My Donations**: Complete donation history with impact tracking
  - Achievement system (Bronze/Silver/Gold badges)
  - Lives saved calculator (units × 3)
  - Hero score and community ranking
  - Detailed donation records with thank-you messages
- **Profile Management**: Availability toggle, eligibility checklist, and pre-donation tips

### 💊 **Patient Module**
- **Medication Tracking**: Comprehensive medication adherence monitoring
- **Health Records**: Medical history and appointment management
- **Reminders**: Automated medication and appointment notifications
- **Reports**: Health analytics and progress tracking

### 👴 **Caretaker Module**
- **Elderly Care**: Monitor and manage care for elderly patients
- **Task Management**: Daily care routines and medication schedules
- **Health Monitoring**: Vital signs tracking and alerts
- **Communication**: Coordinate with healthcare providers

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and context |
| **Vite** | Lightning-fast build tool and dev server |
| **TailwindCSS 3.3** | Utility-first CSS framework |
| **React Query** | Data fetching and state management |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Beautiful icon library |
| **date-fns** | Date formatting and manipulation |
| **React Toastify** | Toast notifications |

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/DhruvLohana-VES/Sem5endfrontend.git
   cd Sem5endfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_USE_MOCK_API=true
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

---

## 🎯 Usage

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Blood Donor** | donor@demo.com | Demo@123 |
| **Patient** | patient@demo.com | Demo@123 |
| **Caretaker** | caretaker@demo.com | Demo@123 |

### Key User Flows

#### 🩸 **Blood Donor Flow**
1. Login with donor credentials
2. View dashboard with donation statistics and badges
3. Browse active blood requests with filters
4. Click on a request to view detailed information
5. Accept requests and track donation history
6. Monitor achievement progress and community impact

#### 💊 **Patient Flow**
1. Login with patient credentials
2. View medication schedule and upcoming appointments
3. Mark medications as taken
4. Access health records and reports
5. Receive automated reminders

#### 👴 **Caretaker Flow**
1. Login with caretaker credentials
2. Monitor assigned elderly patients
3. Manage daily care tasks and medications
4. Track vital signs and health metrics
5. Communicate with healthcare providers

---

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.jsx       # Main layout with navigation
│   ├── ProtectedRoute.jsx
│   ├── NotificationDropdown.jsx
│   ├── LoadingSpinner.jsx
│   ├── Modal.jsx
│   └── ConfirmDialog.jsx
├── config/
│   └── axios.js         # Axios configuration with interceptors
├── contexts/
│   └── AuthContext.jsx  # Authentication context provider
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── patient/
│   │   ├── Dashboard.jsx
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── LoadingSpinner.jsx
│   ├── ErrorBoundary.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── donor/          # Blood Donor module
│   │   ├── Dashboard.jsx
│   │   ├── Requests.jsx
│   │   ├── Donations.jsx
│   │   └── Profile.jsx
│   ├── patient/        # Patient module
│   │   ├── Dashboard.jsx
│   │   ├── Medications.jsx
│   │   └── Doses.jsx
│   ├── caretaker/      # Caretaker module
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── Medications.jsx
│   │   └── Reports.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js          # API service layer
│   └── auth.js         # Authentication utilities
├── context/
│   └── AuthContext.jsx # Global authentication state
├── App.jsx             # Main app component with routing
└── main.jsx            # Application entry point
```

---

## 🎨 Design Features

- **🌙 Dark Mode Support**: Seamless light/dark theme switching
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **✨ Animations**: Smooth transitions and micro-interactions
- **🎯 Accessibility**: WCAG compliant with keyboard navigation
- **🚀 Performance**: Lazy loading and code splitting
- **💅 Modern UI**: Gradient backgrounds, glassmorphism effects

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build production-ready bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🌐 API Integration

The application supports both **Mock API** and **Real Backend** modes:

### Mock API Mode (Development)
```env
VITE_USE_MOCK_API=true
```
- Uses local mock data for rapid development
- No backend server required
- Perfect for frontend development and testing

### Real Backend Mode (Production)
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-backend-api.com/api
```
- Connects to actual backend server
- Full CRUD operations
- Real-time data synchronization

---

## 🔐 Authentication Flow

1. Users register with email, password, full name, and role (patient/caretaker/donor)
2. Upon login, JWT token is stored in localStorage
3. Token is automatically attached to all API requests
4. Auto-logout on 401 (unauthorized) responses
5. Protected routes redirect based on authentication and role

---

## 🎨 Color Scheme

- **Primary (Medical Blue):** `#3B82F6`
- **Success (Green):** `#10B981`
- **Warning (Yellow):** `#F59E0B`
- **Danger (Red):** `#EF4444`
- **Blood Donor (Red):** `#DC2626`

## 📱 Responsive Design

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Mobile-first approach with hamburger menu navigation on smaller screens.

---

## 📊 Key Features Showcase

### Blood Donor Achievements
- **Bronze Badge**: 1-9 donations
- **Silver Badge**: 10-24 donations  
- **Gold Badge**: 25+ donations
- **Hero Score**: Points based on total impact
- **Lives Saved**: Automatic calculation (units × 3)

### Adherence Reporting
Caretakers can view detailed reports including:
- Adherence rate percentage
- Total doses in period
- Doses taken vs missed
- Visual charts and analytics
- Customizable time periods (7, 30, 90 days)
- Color-coded adherence levels:
  - ✅ **Excellent:** ≥ 80%
  - ⚠️ **Fair:** 60-79%
  - ❌ **Poor:** < 60%

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Dhruv Lohana** - [@DhruvLohana-VES](https://github.com/DhruvLohana-VES)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS approach
- Lucide for beautiful icons
- Open source community for inspiration

---

## 📞 Support

For support, create an issue in the repository or contact the development team.

---

<div align="center">
  
### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Dhruv Lohana

</div>

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

**Static Hosting:**
- Upload `dist/` folder to any static hosting service
- Configure server to serve `index.html` for all routes (SPA)

## 📝 TODO / Future Enhancements

- [ ] Add dark mode support
- [ ] Implement push notifications
- [ ] Add medication reminder settings
- [ ] Export reports to PDF
- [ ] Add medication images/icons
- [ ] Implement real-time updates with WebSockets
- [ ] Add medication refill reminders
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard
- [ ] Integration with pharmacy APIs
- [ ] Voice commands for marking doses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for lightning-fast build tools
- TailwindCSS for utility-first styling
- All open-source contributors

---

**Built with ❤️ for better medication adherence**
