# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Node.js
If you don't have Node.js installed:
- Download from: https://nodejs.org/
- Install version 16 or higher
- Verify installation: Open PowerShell and run `node --version`

### Step 2: Install Dependencies
Open PowerShell in the project directory and run:
```powershell
npm install
```

This will install all required packages (may take a few minutes).

### Step 3: Start the Backend API
Make sure your Express.js backend is running on `http://localhost:5001`

If not started:
```powershell
# Navigate to your backend directory
cd path\to\backend
npm start
```

### Step 4: Start the Frontend
In this project directory, run:
```powershell
npm run dev
```

### Step 5: Open in Browser
Open your browser and go to:
```
http://localhost:3000
```

## 📝 Create Your First Accounts

### Register as Caretaker:
1. Click "Sign up"
2. Fill in:
   - Full Name: John Caretaker
   - Email: caretaker@test.com
   - Password: password123
   - Role: **Caretaker**
3. Click "Create account"
4. Login with the same credentials

### Register as Patient:
1. Open a new incognito window (or logout)
2. Click "Sign up"
3. Fill in:
   - Full Name: Jane Patient
   - Email: patient@test.com
   - Password: password123
   - Role: **Patient**
4. Click "Create account"
5. Login with the same credentials

### Link Patient to Caretaker:
1. Login as caretaker (caretaker@test.com)
2. Go to "Patients" page
3. Click "Invite Patient"
4. Enter patient email: patient@test.com
5. Click "Send Invite"

### Add Medication:
1. As caretaker, click on "Manage Medications" for the patient
2. Click "Add Medication"
3. Fill in:
   - Name: Aspirin
   - Dosage: 500mg
   - Schedule Type: Daily
   - Schedule Details: 8:00 AM, 2:00 PM, 8:00 PM
   - Instructions: Take with food
4. Click "Add Medication"

### Mark Dose as Taken (Patient):
1. Login as patient (patient@test.com)
2. Go to "Doses" page
3. Click "Mark as Taken" for any scheduled dose
4. Confirm

### View Reports (Caretaker):
1. Login as caretaker
2. Go to "Reports" page
3. Select the patient
4. Choose reporting period (7, 30, or 90 days)
5. View adherence statistics and charts

## 🎨 Features to Try

### For Patients:
- ✅ Dashboard with today's schedule
- ✅ View all medications
- ✅ Mark doses as taken
- ✅ Check notifications
- ✅ View adherence rate

### For Caretakers:
- ✅ Add/remove patients
- ✅ Manage medications for each patient
- ✅ View adherence reports with charts
- ✅ Monitor patient compliance
- ✅ Receive notifications

## ⚠️ Troubleshooting

### "npm is not recognized"
- Install Node.js from https://nodejs.org/
- Restart PowerShell after installation

### Backend API not connecting
- Make sure backend is running on port 5001
- Check `.env` file has correct API URL
- Verify no firewall blocking

### Build errors
- Delete `node_modules` folder
- Run `npm install` again
- Clear browser cache

### Port 3000 already in use
- Change port in `vite.config.js`:
  ```javascript
  server: {
    port: 3001, // Use different port
  }
  ```

## 📱 Mobile Testing

To test on mobile device:
1. Make sure your phone and computer are on the same WiFi
2. Find your computer's IP address:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)
3. On your phone, open browser and go to:
   ```
   http://[YOUR-IP]:3000
   ```
   Example: `http://192.168.1.100:3000`

## 🔄 Development Workflow

### Making Changes:
1. Edit files in `src/` directory
2. Save - Vite will auto-reload the page
3. Check browser for changes

### Adding New Features:
1. Create new component in `src/components/`
2. Or create new page in `src/pages/`
3. Import and use in other files
4. Test thoroughly

### Before Deployment:
1. Run `npm run build`
2. Test production build: `npm run preview`
3. Fix any errors
4. Deploy `dist/` folder

## 🆘 Need Help?

- Check README.md for detailed documentation
- Review code comments in source files
- Check browser console for errors
- Verify backend API is responding

## 🎉 You're All Set!

Start building and customizing your medication adherence system!
