# 🧬 AI-Driven Drug Discovery Platform

## Overview
This platform connects your existing Google Colab ML pipeline with a React frontend to provide an interactive drug discovery interface. Users can input a disease name and receive AI-predicted drug candidates with bioactivity, toxicity, and synergy scores.

## 🚀 Quick Setup

### 1. Google Colab Backend
1. **Open the notebook**: `Google_Colab_Flask_API.ipynb`
2. **Run all cells** to start your Flask API with ngrok
3. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

### 2. React Frontend
1. **Update API URL**:
   ```bash
   cd project
   python update_api_config.py
   # Enter your ngrok URL when prompted
   ```

2. **Start the React app**:
   ```bash
   npm run dev
   ```

3. **Open** `http://localhost:5173` in your browser

## 🔗 API Integration

### Replace the Mock Pipeline
In your Google Colab notebook, replace the `run_drug_discovery_pipeline()` function with your actual ML code:

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
    
    # 4. Format results
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

## 📊 Data Flow

```
User Input (Disease) 
    ↓
React Frontend 
    ↓
Flask API (/predict?disease=<name>)
    ↓
Your ML Pipeline in Colab
    ↓
Drug Predictions (JSON + CSV)
    ↓
React Results Table + Download
```

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict?disease=<name>` | GET | Run drug discovery pipeline |
| `/results` | GET | Get latest results |
| `/download_csv` | GET | Download results as CSV |
| `/health` | GET | API health check |

## 📁 File Structure

```
project/
├── Google_Colab_Flask_API.ipynb    # Your Colab notebook
├── src/
│   ├── api.js                      # API client (updated)
│   ├── App.jsx                     # Main React app (updated)
│   └── components/
│       ├── DrugDiscoveryForm.jsx   # Disease input form
│       ├── DrugResultsTable.jsx    # Results display
│       └── DownloadButton.jsx      # CSV download
├── update_api_config.py            # API config updater
└── DRUG_DISCOVERY_SETUP.md        # This guide
```

## 🔧 Customization

### Frontend Styling
- Modify `src/components/DrugResultsTable.jsx` for table appearance
- Update `src/App.jsx` for overall layout
- Customize colors in Tailwind classes

### API Response Format
Ensure your ML pipeline returns data in this format:
```json
[
  {
    "drug_id": "CHEMBL1234",
    "name": "Drug Name",
    "predicted_activity": "Active/Inactive",
    "predicted_toxicity": 0.12,
    "synergy_score": 0.85,
    "mechanism": "Mechanism of action",
    "target": "Target protein",
    "phase": "Clinical phase",
    "activity_confidence": 0.92,
    "toxicity_confidence": 0.88,
    "overall_score": 0.89
  }
]
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `flask-cors` is installed in Colab
   - Check that `CORS(app)` is called

2. **API Not Responding**
   - Verify ngrok is running
   - Check Flask server logs in Colab
   - Test endpoints individually

3. **No Results Displayed**
   - Check browser console for errors
   - Verify API response format
   - Test with `/health` endpoint first

### Testing Your API

```bash
# Test health
curl https://your-ngrok-url.ngrok.io/health

# Test prediction
curl "https://your-ngrok-url.ngrok.io/predict?disease=alzheimer"

# Test results
curl https://your-ngrok-url.ngrok.io/results
```

## 🎉 Demo Flow

1. **User enters disease**: "Alzheimer's disease"
2. **React sends request**: `GET /predict?disease=alzheimer`
3. **Colab runs ML pipeline**: Your models analyze the disease
4. **API returns results**: JSON with drug candidates
5. **React displays table**: Interactive results with sorting
6. **User downloads CSV**: Click download button

## 🔮 Next Steps

1. **Integrate your actual ML models** in the Colab notebook
2. **Add more sophisticated UI features** (filtering, pagination)
3. **Implement user authentication** for multiple users
4. **Add real-time progress updates** for long-running predictions
5. **Deploy to production** (Heroku, AWS, etc.)

## 📞 Support

If you need help:
1. Check the browser console for frontend errors
2. Look at Colab output for backend errors
3. Test API endpoints individually
4. Verify your ML pipeline is working correctly

Happy drug discovering! 🧬💊
