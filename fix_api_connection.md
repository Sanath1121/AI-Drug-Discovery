# 🔧 Fix API Connection Error

## The Problem
You're getting `Unexpected token '<', "<!DOCTYPE "... is not valid JSON` because the API is returning HTML instead of JSON.

## The Solution

### Step 1: Check Google Colab
1. **Open your Google Colab notebook** (`Google_Colab_Flask_API.ipynb`)
2. **Make sure all cells are running** (especially the Flask server cell)
3. **Look for this output:**
   ```
   Flask server started successfully!
   Local URL: http://localhost:5000
   Public URL: https://d48cb720ee0d.ngrok-free.app
   ```

### Step 2: Test the API Directly
Open these URLs in your browser:

1. **Health Check:** https://d48cb720ee0d.ngrok-free.app/health
   - Should return JSON like: `{"status": "healthy", "timestamp": "..."}`

2. **Prediction Test:** https://d48cb720ee0d.ngrok-free.app/predict?disease=alzheimer
   - Should return JSON with drug candidates

### Step 3: If You See ngrok Warning Page
If you see an ngrok warning page instead of JSON:

1. **Click "Visit Site"** on the ngrok warning page
2. **Add the ngrok URL to your API calls** with proper headers

### Step 4: Update API Configuration
If the above doesn't work, update your `src/api.js`:

```javascript
const API_BASE_URL = 'https://d48cb720ee0d.ngrok-free.app';

// Add ngrok-skip-browser-warning header
const createApiClient = () => {
  const client = {
    get: async (url, options = {}) => {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Add this line
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    // ... rest of the code
  };
  
  return client;
};
```

### Step 5: Alternative - Get New ngrok URL
If the current URL isn't working:

1. **In Google Colab**, run the ngrok cell again
2. **Copy the new URL** (it will be different)
3. **Update your API_BASE_URL** in `src/api.js`

### Step 6: Test Again
1. **Refresh your React app** (http://localhost:5173/)
2. **Check the API status** - should show "Connected" in green
3. **Try a prediction** - enter "alzheimer" and click predict

## Quick Fix Commands

```bash
# Test if API is working
curl -H "ngrok-skip-browser-warning: true" https://d48cb720ee0d.ngrok-free.app/health

# Test prediction
curl -H "ngrok-skip-browser-warning: true" "https://d48cb720ee0d.ngrok-free.app/predict?disease=alzheimer"
```

## Common Issues

1. **Flask not running in Colab** - Restart the Flask cell
2. **ngrok tunnel expired** - Get a new ngrok URL
3. **CORS issues** - Make sure `CORS(app)` is called in Flask
4. **Wrong endpoint** - Check the URL paths match

## Success Indicators

✅ API status shows "Connected" in green  
✅ Health check returns JSON  
✅ Prediction returns drug candidates  
✅ No console errors in browser  

Let me know what you see when you test the URLs!
