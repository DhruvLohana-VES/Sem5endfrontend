# Complete Setup Guide

## 🎯 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- ✅ **Backend API** running on `http://localhost:5001`
- ✅ **Code Editor** (VS Code recommended)
- ✅ **Modern Browser** (Chrome, Firefox, Edge, Safari)

---

## 🚀 Installation Methods

### Method 1: Automatic Installation (Recommended)

**For Windows:**

1. **Double-click** `install.bat` in the project folder
2. Wait for dependencies to install
3. Choose 'Y' when asked to start the dev server
4. Open browser to `http://localhost:3000`

**That's it!** 🎉

---

### Method 2: Manual Installation

1. **Open PowerShell or Command Prompt**

2. **Navigate to project directory:**
   ```bash
   cd "C:\Users\Dhruv Lohana\Desktop\CC Frontend"
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   ⏱️ This will take 2-5 minutes

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:3000
   ```

---

## 🔧 Configuration

### Environment Variables

The `.env` file is already configured:

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

**To change backend URL:**
1. Open `.env` file
2. Change the URL
3. Restart dev server

---

## 👥 Creating Test Accounts

### Step 1: Create a Caretaker Account

1. Go to `http://localhost:3000/register`
2. Fill in the form:
   ```
   Full Name: John Caretaker
   Email: john@caretaker.com
   Password: Test@123
   Confirm Password: Test@123
   Role: Caretaker (select this)
   ```
3. Click **"Create account"**
4. You'll be redirected to login

### Step 2: Create a Patient Account

1. **Open a new incognito/private window** (or logout)
2. Go to `http://localhost:3000/register`
3. Fill in the form:
   ```
   Full Name: Jane Patient
   Email: jane@patient.com
   Password: Test@123
   Confirm Password: Test@123
   Role: Patient (select this)
   ```
4. Click **"Create account"**

### Step 3: Link Patient to Caretaker

1. **Login as Caretaker** (john@caretaker.com)
2. Click **"Patients"** in navigation
3. Click **"Invite Patient"** button
4. Enter patient email: `jane@patient.com`
5. Click **"Send Invite"**
6. ✅ Patient is now linked!

---

## 📋 Testing the Features

### As Caretaker

#### 1. Add a Medication

1. Login as caretaker
2. Go to **Patients** page
3. Click **"Manage Medications"** for Jane Patient
4. Click **"Add Medication"**
5. Fill in the form:
   ```
   Medication Name: Aspirin
   Dosage: 500mg
   Schedule Type: Daily
   Schedule Details: 8:00 AM, 2:00 PM, 8:00 PM
   Instructions: Take with food
   ```
6. Click **"Add Medication"**
7. ✅ Medication added!

#### 2. View Reports

1. Go to **Reports** page
2. Select patient: Jane Patient
3. Choose period: 30 days
4. View adherence statistics and chart

### As Patient

#### 1. View Dashboard

1. Login as patient (jane@patient.com)
2. See today's schedule
3. View upcoming doses
4. Check adherence rate

#### 2. Mark Dose as Taken

1. Go to **Doses** page
2. Find a scheduled dose
3. Click **"Mark as Taken"**
4. Confirm in dialog
5. ✅ Dose marked!

#### 3. View Notifications

1. Click the **bell icon** in header
2. See notification count
3. View recent notifications
4. Mark as read or delete

---

## 🎨 User Interface Guide

### Navigation Structure

**Patient Navigation:**
```
├── Dashboard (Home icon)
├── Medications (Pill icon)
├── Doses (Calendar icon)
├── Notifications (Bell icon)
└── User Menu (Logout)
```

**Caretaker Navigation:**
```
├── Dashboard (Home icon)
├── Patients (Users icon)
├── Reports (Chart icon)
├── Notifications (Bell icon)
└── User Menu (Logout)
```

### Color Coding

- 🔵 **Blue** - Scheduled/Pending
- 🟢 **Green** - Taken/Success
- 🔴 **Red** - Missed/Danger
- 🟡 **Yellow** - Warning/Overdue

### Status Indicators

**Medication Status:**
- ✅ Active - Currently being taken
- ⭕ Inactive - No longer prescribed

**Dose Status:**
- ⏰ Scheduled - Upcoming dose
- ✅ Taken - Completed
- ❌ Missed - Past due, not taken
- ⚠️ Overdue - Scheduled time passed

**Adherence Levels:**
- 🟢 Excellent (≥80%) - Great job!
- 🟡 Fair (60-79%) - Room for improvement
- 🔴 Poor (<60%) - Needs attention

---

## 🔍 Troubleshooting

### Issue: "npm is not recognized"

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/PowerShell
3. Verify: `node --version`

---

### Issue: Cannot connect to backend

**Symptoms:**
- Login fails
- "Network Error" messages
- No data loading

**Solutions:**
1. **Check backend is running:**
   ```bash
   # In backend directory
   npm start
   ```
   Backend should show: `Server running on port 5001`

2. **Verify backend URL in `.env`:**
   ```env
   VITE_API_BASE_URL=http://localhost:5001/api
   ```

3. **Check firewall:**
   - Windows Firewall might be blocking
   - Allow Node.js through firewall

4. **Test backend directly:**
   - Open browser
   - Go to: `http://localhost:5001/api/`
   - Should see API response

---

### Issue: Port 3000 already in use

**Solution 1:** Kill existing process
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with the number shown)
taskkill /PID [PID] /F
```

**Solution 2:** Use different port

Edit `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001,  // Change to any available port
  }
})
```

---

### Issue: White screen / Nothing loads

**Solutions:**
1. **Check browser console:**
   - Press F12
   - Look for error messages

2. **Clear cache:**
   - Ctrl + Shift + Delete
   - Clear cookies and cache
   - Reload page

3. **Reinstall dependencies:**
   ```bash
   # Delete node_modules
   rm -rf node_modules
   
   # Reinstall
   npm install
   ```

---

### Issue: Login not working

**Checklist:**
- ✅ Backend is running
- ✅ Email and password are correct
- ✅ Account was successfully created
- ✅ No errors in browser console
- ✅ Network tab shows request to `/api/auth/login`

**Debug steps:**
1. Check browser Network tab (F12)
2. Look for failed requests
3. Check response errors
4. Verify backend logs

---

### Issue: Data not updating

**Solution:**
1. **Hard refresh:** Ctrl + Shift + R
2. **Clear React Query cache:**
   - Logout and login again
3. **Check for errors:**
   - Browser console
   - Network tab

---

## 📱 Mobile Testing

### Local Network Testing

1. **Find your computer's IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., `192.168.1.100`)

2. **Ensure your phone is on same WiFi**

3. **Update vite.config.js:**
   ```javascript
   export default defineConfig({
     server: {
       host: '0.0.0.0',  // Allow external connections
       port: 3000,
     }
   })
   ```

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

5. **On your phone, open:**
   ```
   http://192.168.1.100:3000
   ```
   (Replace with your actual IP)

---

## 🛠️ Development Tips

### Hot Reload

- Save any file in `src/`
- Browser automatically refreshes
- No need to restart server

### Developer Tools

1. **React DevTools:**
   - Install browser extension
   - Inspect component tree
   - View props and state

2. **Network Tab:**
   - Monitor API calls
   - Check request/response
   - Debug errors

3. **Console:**
   - View errors
   - See log messages
   - Debug JavaScript

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

---

## 📚 Next Steps

### Learn More

1. **Read Documentation:**
   - `README.md` - Overview
   - `QUICKSTART.md` - Quick reference
   - `DOCUMENTATION.md` - Deep dive
   - `COMPONENTS.md` - Component reference

2. **Explore Code:**
   - Start with `src/App.jsx`
   - Look at component structure
   - Understand data flow

3. **Customize:**
   - Change colors in `tailwind.config.js`
   - Modify components
   - Add new features

### Practice Tasks

1. ✅ Create multiple patient accounts
2. ✅ Add various medications with different schedules
3. ✅ Mark doses and check adherence
4. ✅ View reports for different time periods
5. ✅ Test on mobile device
6. ✅ Try all CRUD operations

---

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` folder

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment for Production

Create `.env.production`:
```env
VITE_API_BASE_URL=https://your-api.com/api
```

---

## 📞 Support

### Getting Help

1. **Check Documentation:**
   - Look through all `.md` files
   - Search for your issue

2. **Common Issues:**
   - Most problems are in this guide
   - Check Troubleshooting section

3. **Browser Console:**
   - Press F12
   - Check for error messages
   - Screenshot errors for help

4. **Community:**
   - Create GitHub issue
   - Ask on Stack Overflow
   - Check existing issues

---

## ✅ Setup Checklist

Before considering setup complete:

- [ ] Node.js installed and verified
- [ ] Dependencies installed (`npm install` successful)
- [ ] Backend API running on port 5001
- [ ] Frontend dev server running on port 3000
- [ ] Can access login page
- [ ] Created caretaker account
- [ ] Created patient account
- [ ] Linked patient to caretaker
- [ ] Added at least one medication
- [ ] Marked a dose as taken
- [ ] Viewed notifications
- [ ] Checked reports page
- [ ] Tested on mobile (optional)

---

## 🎉 Congratulations!

You've successfully set up the Medication Adherence Management System!

**What you can do now:**
- Manage multiple patients
- Track medication adherence
- View detailed reports
- Monitor compliance in real-time
- Customize the system to your needs

**Happy coding!** 🚀

---

**Need help?** Check the documentation or create an issue on GitHub.

**Want to contribute?** Pull requests are welcome!
