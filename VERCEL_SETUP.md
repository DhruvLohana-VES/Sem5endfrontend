# Vercel Deployment Instructions

## Environment Variables Setup

After deploying to Vercel, you **MUST** add these environment variables in the Vercel dashboard:

### Steps:
1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (medbuddy-sepia)
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

```
VITE_API_BASE_URL=https://med-backend-gq6h.onrender.com/api
VITE_USE_MOCK_API=false
```

5. **Redeploy** your project for changes to take effect

### Why is this needed?
- `.env` files are in `.gitignore` and not pushed to GitHub
- Vercel needs environment variables configured in its dashboard
- Without these, the app will try to connect to `localhost:5001` which doesn't exist on Vercel

## Troubleshooting

If you see "Network Error" on login:
1. Check browser console for API URL (should show `https://med-backend-gq6h.onrender.com/api`)
2. Verify environment variables are set in Vercel dashboard
3. Verify backend is running: https://med-backend-gq6h.onrender.com/api/health
4. Check backend CORS allows all origins in server.js
