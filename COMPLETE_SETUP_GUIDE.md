# 🚀 Complete Setup Guide - Drug Discovery Platform

## Step-by-Step Instructions

### Step 1: Start the React Frontend

Open a new terminal/command prompt and run:

```bash
# Navigate to your project directory
cd "C:\Users\srila\Downloads\Avinya\AIDD\project-bolt-sb1-gkphchiv (1)\project"

# Start the React development server
npm run dev
```

**Expected Output:**
```
  VITE v5.4.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**✅ What to do:** Open http://localhost:5173/ in your browser. You should see the drug discovery interface.

---

### Step 2: Set Up Google Colab Backend

1. **Open Google Colab**: Go to https://colab.research.google.com/
2. **Upload the notebook**: Upload `Google_Colab_Flask_API.ipynb`
3. **Run all cells** in order (Ctrl+F9 or Runtime → Run All)

**Expected Output:**
```
Installing packages...
Setting up ngrok...
Your Flask API is now accessible at: https://abc123.ngrok.io
Update your React app's API_BASE_URL to: https://abc123.ngrok.io
```

**✅ What to do:** Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)

---

### Step 3: Connect Frontend to Backend

**Option A: Use the Python Script (Recommended)**
```bash
# In your project directory
python update_api_config.py
# Enter your ngrok URL when prompted
```

**Option B: Manual Update**
1. Open `src/api.js`
2. Replace `YOUR_NGROK_URL` with your actual ngrok URL
3. Save the file

**Example:**
```javascript
const API_BASE_URL = 'https://abc123.ngrok.io'; // Your actual ngrok URL
```

---

### Step 4: Test the Connection

1. **Refresh your React app** (http://localhost:5173/)
2. **Check API Status**: You should see "API Connected" in green
3. **Test Prediction**: Enter "Alzheimer's disease" and click "Predict Drug Candidates"

**Expected Result:**
- Loading spinner appears
- Results table shows drug candidates
- Download button becomes available

---

### Step 5: Replace Mock ML Pipeline (Your Actual Code)

In your Google Colab notebook, replace the `run_drug_discovery_pipeline()` function:

```python
def run_drug_discovery_pipeline(disease_name):
    """
    YOUR ACTUAL ML PIPELINE HERE
    """
    # 1. Query OpenTargets API for disease-target associations
    targets = query_opentargets(disease_name)
    
    # 2. Query ChEMBL API for compounds
    compounds = query_chembl(targets)
    
    # 3. Run your ML models
    bioactivity_predictions = your_bioactivity_model(compounds)
    toxicity_predictions = your_toxicity_model(compounds)
    synergy_scores = your_synergy_model(compounds)
    
    # 4. Format results for the frontend
    drugs = []
    for compound in compounds:
        drugs.append({
            'drug_id': compound['chembl_id'],
            'name': compound['name'],
            'predicted_activity': 'Active' if bioactivity_predictions[compound['id']] > 0.5 else 'Inactive',
            'predicted_toxicity': toxicity_predictions[compound['id']],
            'synergy_score': synergy_scores[compound['id']],
            'mechanism': compound['mechanism'],
            'target': compound['target'],
            'phase': compound['phase'],
            'activity_confidence': bioactivity_predictions[compound['id']],
            'toxicity_confidence': 1.0 - toxicity_predictions[compound['id']],
            'overall_score': calculate_overall_score(compound)
        })
    
    return drugs
```

---

### Step 6: Test Complete Workflow

1. **Enter a disease name** (e.g., "cancer", "diabetes", "alzheimer")
2. **Click "Predict Drug Candidates"**
3. **Wait for results** (2-10 seconds depending on your ML pipeline)
4. **View the results table** with drug candidates
5. **Click "Download CSV"** to export results
6. **Test different diseases** to verify everything works

---

### Step 7: Demo Preparation

**For your hackathon demo:**

1. **Prepare test cases:**
   - Alzheimer's disease
   - Cancer
   - Diabetes
   - Hypertension

2. **Demo script:**
   - "This is our AI-driven drug discovery platform"
   - "Enter any disease name to predict drug candidates"
   - "Our ML models analyze bioactivity, toxicity, and synergy"
   - "Results are displayed in an interactive table"
   - "You can download the results as CSV"

3. **Key features to highlight:**
   - Real-time ML predictions
   - Beautiful, professional UI
   - CSV export functionality
   - Sortable and expandable results
   - API status monitoring

---

## 🔧 Troubleshooting

### Common Issues:

**1. "API Disconnected" Status**
- Check if ngrok is running in Colab
- Verify the URL in `src/api.js`
- Test the health endpoint: `https://your-ngrok-url.ngrok.io/health`

**2. "No Results Found"**
- Check Colab output for errors
- Verify your ML pipeline is working
- Test with a simple disease name first

**3. CORS Errors**
- Ensure `flask-cors` is installed in Colab
- Check that `CORS(app)` is called

**4. Download Not Working**
- Check browser console for errors
- Verify the `/download_csv` endpoint is working
- Test with a small dataset first

### Testing Commands:

```bash
# Test API health
curl https://your-ngrok-url.ngrok.io/health

# Test prediction
curl "https://your-ngrok-url.ngrok.io/predict?disease=alzheimer"

# Test results
curl https://your-ngrok-url.ngrok.io/results
```

---

## 🎉 Success Checklist

- [ ] React app running on http://localhost:5173/
- [ ] Google Colab notebook running with Flask API
- [ ] ngrok URL generated and copied
- [ ] API_BASE_URL updated in src/api.js
- [ ] API status shows "Connected" in green
- [ ] Disease prediction working
- [ ] Results table displaying correctly
- [ ] CSV download working
- [ ] Your ML pipeline integrated
- [ ] Multiple diseases tested successfully

---

## 🚀 Ready for Demo!

Once all steps are complete, you'll have a fully functional drug discovery platform that:

✅ Takes disease input from users  
✅ Runs your ML models in Google Colab  
✅ Displays results in a beautiful table  
✅ Allows CSV download  
✅ Shows real-time API status  
✅ Handles errors gracefully  

**Perfect for your hackathon presentation!** 🏆

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console (F12) for frontend errors
2. Look at Colab output for backend errors
3. Test API endpoints individually
4. Verify your ML pipeline is working correctly

Good luck with your hackathon! 🧬💊
