# Vulnerable Demo Application

⚠️ **WARNING: This application contains intentional security vulnerabilities for educational purposes only. DO NOT deploy to production.**

## Project Structure

```
.
├── backend/          # Express.js API server
│   ├── server.js     # Main server with vulnerable endpoints
│   ├── .env          # Database configuration
│   └── package.json
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx              # Main dashboard
    │   │   └── AttackConsole.jsx     # Attack demonstration page
    │   └── App.jsx
    └── package.json
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env` and add your PostgreSQL connection:
```
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3001
```

Start the backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Vulnerabilities Demonstrated

### 1. Open Redirect Vulnerability
- **Endpoint**: `GET /track-and-go?target_url=<url>`
- **Description**: Redirects to any URL without validation
- **Risk**: Phishing attacks, credential theft
- **Demo**: Use the "Link Tracker" on the home page

### 2. Application-Layer Denial of Service
- **Endpoint**: `GET /status-check?difficulty=<n>`
- **Description**: Recursive Fibonacci calculation blocks Node.js event loop
- **Risk**: Server becomes unresponsive with high values (45+)
- **Demo**: Use the "Attack Console" at `/attack`

## Pages

1. **Home Dashboard** (`/`)
   - Link Tracker: Test the open redirect vulnerability
   - System Status: Check server responsiveness

2. **Attack Console** (`/attack`)
   - DoS Attack demonstration
   - Adjustable intensity slider
   - Real-time attack status

## Educational Purpose

This application is designed to demonstrate:
- How open redirects can be exploited
- How CPU-intensive operations can cause DoS in Node.js
- The importance of input validation and rate limiting
- Security best practices by showing their absence

## Security Best Practices (NOT Implemented Here)

To fix these vulnerabilities:
1. Validate and whitelist redirect URLs
2. Implement rate limiting
3. Use worker threads for CPU-intensive tasks
4. Add input validation and sanitization
5. Implement request timeouts
