# Vulnerable Demo Backend

⚠️ **WARNING: This application contains intentional security vulnerabilities for educational purposes only.**

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your database:
   - Edit `backend/.env` and add your PostgreSQL DATABASE_URL:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   PORT=3001
   ```

3. Start the server:
```bash
npm start
```

The server will automatically create the `access_logs` table on startup.

## Vulnerabilities

### 1. Open Redirect (GET /track-and-go)
- Takes a `target_url` query parameter
- Logs the access and redirects without validation
- **Risk**: Can be used for phishing attacks

### 2. Application-Layer DoS (GET /status-check)
- Takes a `difficulty` query parameter
- Uses recursive Fibonacci calculation
- **Risk**: High values (45+) block the event loop and freeze the server

## API Endpoints

- `GET /track-and-go?target_url=<url>` - Redirect with tracking
- `GET /status-check?difficulty=<n>` - Server status check
- `GET /logs` - View recent access logs
