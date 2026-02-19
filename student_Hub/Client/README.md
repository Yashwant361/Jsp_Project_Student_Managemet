## Client 
src/
│
├── app/                     # Global app setup
│   ├── store.js
│   ├── App.jsx
│   └── routes.jsx
│
├── layouts/                 # All layout wrappers
│   ├── MainLayout.jsx
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── features/                # Feature-based structure (VERY IMPORTANT)
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── api.js
│   │   └── authSlice.js
│   │
│   ├── user/
│   │   ├── pages/
│   │   │   └── Profile.jsx
│   │   ├── api.js
│   │   └── userSlice.js
│   │
│   └── subjects/
│       ├── pages/
│       │   └── Subjects.jsx
│       ├── api.js
│       └── subjectSlice.js
│
├── components/              # Reusable UI components
│   ├── Navbar.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   └── Modal.jsx
│
├── hooks/                   # Custom hooks
│   └── useAuth.js
│
├── context/
│   └── userContext.jsx
│
├── utils/
│   └── axiosInstance.js
│
├── styles/
│   └── index.css
│
└── main.jsx


## Backend
server/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── modules/                # Feature-based (like frontend)
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.service.js
│   │   │
│   │   ├── user/
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.routes.js
│   │   │   └── user.service.js
│   │   │
│   │   └── subject/
│   │       ├── subject.model.js
│   │       ├── subject.controller.js
│   │       ├── subject.routes.js
│   │       └── subject.service.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   └── app.js
│
├── .env
├── package.json
└── server.js
