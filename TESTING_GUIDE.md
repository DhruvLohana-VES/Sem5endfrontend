# 🎉 TESTING GUIDE - Mock Mode Ready!

## ✅ What Just Happened?

Your app is now configured to work **WITHOUT a backend**! 

### New Features Added:
1. ✅ **Mock API Service** (`src/services/mockApi.js`)
2. ✅ **API Wrapper** (Automatically switches between real/mock)
3. ✅ **Static Demo Data** (3 patients, medications, doses, notifications)
4. ✅ **Demo Accounts** (Pre-configured login credentials)
5. ✅ **Helper Scripts** (One-click mock mode toggle)

---

## 🚀 Start Testing NOW!

### Option 1: Double-Click Script (Easiest)
```
📁 Double-click: start-mock.bat
```
This will:
- Enable mock mode automatically
- Show demo account credentials
- Start the dev server
- Open at http://localhost:3000

### Option 2: Manual Start
```powershell
npm run dev
```
Then open: http://localhost:3000

---

## 🔐 Login Credentials

### 👨‍⚕️ Caretaker Account
```
Email:    caretaker@demo.com
Password: Demo@123
```

**What you can test:**
- View 3 patients (Amit, Priya, Suresh)
- Add new medications
- Edit/Delete medications
- View adherence reports with charts
- Check notifications
- Invite patients

### 👤 Patient Account
```
Email:    patient@demo.com
Password: Demo@123
```

**What you can test:**
- View personal dashboard
- See today's doses (3 scheduled)
- Mark doses as taken
- View all medications
- Check dose history
- View notifications

---

## 📊 Pre-loaded Demo Data

### Patients
1. **Amit Sharma** - 85% adherence, 2 medications
2. **Priya Patel** - 92% adherence, 1 medication
3. **Suresh Reddy** - 78% adherence, inactive

### Medications for Amit
- **Metformin** 500mg - Twice daily (8:00, 20:00)
- **Lisinopril** 10mg - Once daily (9:00)

### Today's Schedule
- ✅ Metformin 8:00 AM - Taken
- ✅ Lisinopril 9:00 AM - Taken
- ⏰ Metformin 8:00 PM - Pending

### Notifications
- 🔔 Dose reminders
- 📋 Medication updates
- ⚠️ Adherence alerts
- 👥 Patient links

---

## 🎯 Testing Checklist

### As Caretaker
- [ ] Login with caretaker@demo.com
- [ ] View dashboard - see patient overview
- [ ] Go to "Patients" - see 3 patients
- [ ] Click on "Amit Sharma"
- [ ] View his medications
- [ ] Click "Add Medication" - fill form - submit
- [ ] Edit a medication - change dosage - save
- [ ] Delete a medication - confirm
- [ ] Go to "Reports" tab
- [ ] Select patient & view adherence chart
- [ ] Check notifications (bell icon)

### As Patient
- [ ] Logout from caretaker
- [ ] Login with patient@demo.com
- [ ] View dashboard - see stats
- [ ] Check adherence rate (85%)
- [ ] See "Today's Doses" section
- [ ] Click "Mark as Taken" on pending dose
- [ ] Go to "Medications" page
- [ ] View active medications list
- [ ] Go to "Doses" page
- [ ] View dose history with filters
- [ ] Check notifications dropdown

### UI/UX Testing
- [ ] Resize browser window - test responsive design
- [ ] Click hamburger menu (mobile view)
- [ ] Test all navigation links
- [ ] Submit forms with validation errors
- [ ] Check loading spinners
- [ ] Verify toast messages (success/error)
- [ ] Test modals (open/close)
- [ ] Check confirmation dialogs

---

## 🔄 Switch Modes

### Enable Mock Mode (No Backend)
```powershell
# Double-click:
start-mock.bat

# OR manually edit .env:
VITE_USE_MOCK_API=true
```

### Enable Real API (Backend Required)
```powershell
# Double-click:
start-real.bat

# OR manually edit .env:
VITE_USE_MOCK_API=false
```

**⚠️ Important:** Restart dev server after changing `.env`!

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| **MOCK_MODE.md** | Complete mock mode guide |
| **README.md** | Main project documentation |
| **QUICKSTART.md** | 5-minute tutorial |
| **SETUP.md** | Installation & troubleshooting |
| **DOCUMENTATION.md** | Architecture deep dive |
| **COMPONENTS.md** | Component reference |
| **STRUCTURE.md** | Visual project structure |

---

## 💡 Tips

### Mock Mode is Great For:
✅ Testing UI/UX without backend hassle
✅ Demos and presentations
✅ Frontend development
✅ Training new users
✅ Quick prototyping

### Use Real API When:
✅ Testing actual authentication
✅ Database persistence needed
✅ Multi-user scenarios
✅ Production deployment
✅ Backend integration testing

---

## 🐛 Troubleshooting

### App won't start?
1. Run `npm install` first
2. Check Node.js version (should be 16+)
3. Delete `node_modules` and reinstall

### Mock mode not working?
1. Check `.env` has `VITE_USE_MOCK_API=true`
2. Restart dev server (`Ctrl+C` then `npm run dev`)
3. Clear browser cache/localStorage

### Can't login?
1. Use exact credentials (case-sensitive):
   - `caretaker@demo.com` / `Demo@123`
   - `patient@demo.com` / `Demo@123`
2. Check browser console for errors
3. Make sure mock mode is enabled

### Changes not appearing?
1. Restart dev server
2. Hard refresh browser (`Ctrl+Shift+R`)
3. Clear localStorage

---

## 🎨 What's Different in Mock Mode?

| Feature | Real API | Mock API |
|---------|----------|----------|
| Login | Database auth | Hardcoded accounts |
| Data persistence | PostgreSQL | In-memory (session) |
| API delay | Network latency | 500ms simulated |
| Validation | Backend strict | Frontend only |
| Multi-user | Supported | Single session |
| Real-time | WebSockets | Static updates |

---

## 🚀 Ready to Test!

### Quick Commands
```powershell
# Install dependencies (if not done)
npm install

# Start with mock mode
start-mock.bat
# OR
npm run dev

# Access the app
http://localhost:3000

# Login
caretaker@demo.com / Demo@123
```

---

## 📞 Need Help?

1. **Read Documentation**
   - MOCK_MODE.md - Mock API details
   - SETUP.md - Installation issues
   - README.md - General info

2. **Check Console**
   - Browser DevTools (F12)
   - Terminal output

3. **Common Fixes**
   - Restart dev server
   - Clear browser data
   - Reinstall dependencies

---

## 🎉 Happy Testing!

**You can now test the entire application without setting up a backend!**

All features are functional with realistic demo data. Perfect for:
- UI/UX testing
- Demos
- Development
- Learning

---

**Last Updated:** October 12, 2025
**Mock Mode Status:** ✅ ENABLED (check `.env`)
