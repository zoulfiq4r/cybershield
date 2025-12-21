# CyberShield Backend Setup

## Prerequisites
- XAMPP installed and running (Apache + MySQL)
- Node.js installed

## Setup Steps

### 1. Create Database
1. Start XAMPP and run Apache + MySQL
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Click "New" to create a database named `cybershield`
4. Click "Import" and import the `database.sql` file
   - OR manually run the SQL queries from `database.sql`

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
- Check `.env` file
- Default settings:
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD= (empty for XAMPP default)
  - DB_NAME=cybershield
  - JWT_SECRET=your_super_secret_key_change_this_in_production
- Optional email notifications (for admin on new messages):
  - ADMIN_EMAIL=admin@example.com
  - MAIL_HOST=smtp.yourprovider.com
  - MAIL_PORT=587
  - MAIL_USER=smtp_username
  - MAIL_PASS=smtp_password
  - MAIL_FROM="CyberShield <no-reply@yourdomain.com>"
  - MAIL_SECURE=false # set true when using port 465

### 4. Run the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Server will run on: http://localhost:5000

## Schema Notes
- `users` now includes `role` (0=user, 1=admin). Promote an account by running:
  ```sql
  UPDATE users SET role = 1 WHERE email = 'admin@example.com';
  ```
- `messages` stores contact submissions. `reviewed` is 0/1, and `user_id` links to the sender when authenticated.

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Create new user
  - Body: `{ name, email, password }`
  
- **POST** `/api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns `{ token, user: { id, name, email, role } }`

### Messages
- **POST** `/api/messages` - Submit a message (auth optional; include Bearer token to link user)
  - Body: `{ name, email, message }`

- **GET** `/api/messages` - List all messages (admin only, Bearer token required)

- **PATCH** `/api/messages/:id/review` - Mark a message as reviewed (admin only, Bearer token required)

## Testing
1. Make sure XAMPP MySQL is running
2. Make sure backend server is running (port 5000)
3. Make sure frontend is running (port 3000)
4. Try registering a new account
5. Try logging in

## Troubleshooting
- **Error connecting to MySQL**: Check XAMPP MySQL is running
- **Port 5000 already in use**: Change PORT in `.env`
- **CORS errors**: Backend CORS is enabled for all origins
