# 🎭 Mock API Mode - Testing Without Backend

## ✅ Mock Mode Ab Enabled Hai!

Backend nahi hai? No problem! Mock API automatically static data ke saath kaam karega.

---

## 🔐 Demo Accounts (Static)

### 👨‍⚕️ **Caretaker Login**
```
Email: caretaker@demo.com
Password: Demo@123
```

### 👤 **Patient Login**
```
Email: patient@demo.com
Password: Demo@123
```

---

## 🎯 Mock Mode Features

✅ **Fully Functional** - Sab features kaam karenge
✅ **No Backend Required** - API calls mock data return karenge
✅ **Realistic Delays** - 500ms delay for realistic experience
✅ **Persistent Changes** - Session ke dauran changes save rahenge
✅ **Pre-loaded Data** - 3 patients, medications, doses, notifications

---

## 📊 Pre-loaded Static Data

### Patients (3)
- Amit Sharma (ID: 2) - 85% adherence
- Priya Patel (ID: 3) - 92% adherence  
- Suresh Reddy (ID: 4) - 78% adherence

### Medications
- **Metformin** - 500mg, twice daily (8:00, 20:00)
- **Lisinopril** - 10mg, once daily (9:00)
- **Aspirin** - 75mg, once daily (8:00)

### Today's Doses
- Metformin 8:00 AM ✅ Taken
- Lisinopril 9:00 AM ✅ Taken
- Metformin 8:00 PM ⏰ Pending

### Notifications (4)
- Dose reminders
- Medication updates
- Adherence alerts
- Patient links

---

## 🚀 Quick Start

### 1️⃣ **Verify Mock Mode is ON**
Open `.env` file:
```env
VITE_USE_MOCK_API=true
```

### 2️⃣ **Start Dev Server**
```powershell
npm run dev
```

### 3️⃣ **Login as Caretaker**
- Email: `caretaker@demo.com`
- Password: `Demo@123`
- Navigate: Dashboard → Patients → Medications → Reports

### 4️⃣ **Test Features**
✅ View 3 pre-loaded patients
✅ Add new medications
✅ Edit/Delete medications
✅ View adherence reports with charts
✅ Check notifications

### 5️⃣ **Login as Patient**
- Logout
- Email: `patient@demo.com`
- Password: `Demo@123`
- Navigate: Dashboard → Medications → Doses

### 6️⃣ **Test Patient Features**
✅ View dashboard with stats
✅ See today's doses
✅ Mark doses as taken
✅ View medication list
✅ Check dose history

---

## 🔄 Switch Between Mock & Real API

### **Enable Mock Mode** (No Backend)
`.env`:
```env
VITE_USE_MOCK_API=true
```

### **Enable Real API** (Backend Required)
`.env`:
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:5001/api
```

**Important:** `.env` file change hone ke baad dev server restart karo!

---

## 💡 What Works in Mock Mode?

| Feature | Status | Notes |
|---------|--------|-------|
| Login | ✅ | Static accounts |
| Register | ✅ | Creates temp user |
| Dashboard | ✅ | Pre-loaded stats |
| View Patients | ✅ | 3 static patients |
| Add Medication | ✅ | In-memory save |
| Edit Medication | ✅ | Updates mock data |
| Delete Medication | ✅ | Removes from mock |
| Mark Dose Taken | ✅ | Updates status |
| View Reports | ✅ | 30-day chart data |
| Notifications | ✅ | 4 static items |
| Invite Patient | ✅ | Shows success |

---

## 🎨 Testing Scenarios

### Scenario 1: Caretaker Workflow
1. Login as caretaker
2. View dashboard → See patient overview
3. Go to "Patients" → See 3 patients
4. Click patient → View their medications
5. Add new medication → Fill form → Submit
6. Edit medication → Update dosage → Save
7. Delete medication → Confirm → Deleted
8. Go to "Reports" → Select patient → View charts

### Scenario 2: Patient Workflow
1. Login as patient
2. View dashboard → See adherence rate (85%)
3. See "Today's Doses" section → 3 doses
4. Mark dose as taken → Status updates
5. Go to "Medications" → See active meds
6. Go to "Doses" → View history
7. Check notifications → 2 unread

### Scenario 3: UI/UX Testing
1. Test responsive design → Resize window
2. Mobile menu → Click hamburger
3. Notifications dropdown → Click bell icon
4. Forms validation → Submit empty form
5. Modals → Open/close dialogs
6. Loading states → See spinners
7. Toast messages → Success/Error alerts

---

## 📝 Mock Data Structure

### Users
```javascript
{
  id: '1',
  email: 'caretaker@demo.com',
  role: 'caretaker',
  name: 'Dr. Rajesh Kumar',
  phone: '+91 98765 43210'
}
```

### Medications
```javascript
{
  id: '1',
  patientId: '2',
  name: 'Metformin',
  dosage: '500mg',
  frequency: 'twice daily',
  timing: ['08:00', '20:00'],
  isActive: true
}
```

### Doses
```javascript
{
  id: '1',
  medicationId: '1',
  scheduledTime: '2025-10-12T08:00:00Z',
  status: 'taken', // pending, taken, missed
  takenAt: '2025-10-12T08:15:00Z'
}
```

---

## 🔧 Customizing Mock Data

Want to add more data? Edit `src/services/mockApi.js`:

```javascript
// Add more patients
const MOCK_PATIENTS = [
  // ... existing patients
  {
    id: '5',
    name: 'Your Patient Name',
    email: 'newpatient@demo.com',
    adherenceRate: 88,
  },
];

// Add more medications
const MOCK_MEDICATIONS = [
  // ... existing medications
  {
    id: '4',
    name: 'Atorvastatin',
    dosage: '20mg',
    // ... more fields
  },
];
```

---

## ⚠️ Limitations

❌ **No Persistence** - Page refresh = data reset
❌ **No Real-time** - Notifications won't auto-update
❌ **Single Session** - Different tabs share same data
❌ **Limited Validation** - Less strict than real backend

---

## 🎯 Best Use Cases

✅ **UI/UX Testing** - Test layouts and interactions
✅ **Demo/Presentation** - Show features without backend
✅ **Frontend Development** - Build UI independently
✅ **Quick Prototyping** - Test ideas quickly
✅ **Training** - Teach users without breaking real data

---

## 🚀 When to Switch to Real API?

Switch when you need:
- Real authentication
- Database persistence
- Multi-user testing
- Production deployment
- Backend integration testing

---

## 📞 Need Help?

1. Check console for errors
2. Verify `.env` has `VITE_USE_MOCK_API=true`
3. Restart dev server after `.env` change
4. Clear browser localStorage if needed

---

## 🎉 Ready to Test!

```powershell
# Start the app
npm run dev

# Open browser
http://localhost:3000

# Login with:
caretaker@demo.com / Demo@123
# OR
patient@demo.com / Demo@123
```

**Happy Testing! 🎭**
