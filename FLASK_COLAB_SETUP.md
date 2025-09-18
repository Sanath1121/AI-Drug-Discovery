# Flask API Setup for Google Colab

This guide will help you connect your React frontend to a Flask API running in Google Colab.

## 🚀 Quick Start

### 1. Open Google Colab
- Go to [Google Colab](https://colab.research.google.com/)
- Upload the `Google_Colab_Flask_API.ipynb` notebook
- Or create a new notebook and copy the code from `colab_flask_setup.py`

### 2. Run the Colab Notebook
1. **Install packages** - Run the first cell to install Flask and dependencies
2. **Setup ngrok** - Run the second cell to create a public URL
3. **Run Flask API** - Execute the remaining cells to start your API server
4. **Copy the ngrok URL** - Note the public URL provided by ngrok

### 3. Update Your React App
You have two options:

#### Option A: Use the Python Script
```bash
cd project
python update_api_config.py
# Enter your ngrok URL when prompted
```

#### Option B: Manual Update
1. Open `src/api.js`
2. Replace `YOUR_NGROK_URL` with your ngrok URL
3. Save the file

### 4. Test the Connection
```bash
cd project
npm run dev
```

## 📋 API Endpoints

Your Flask API provides these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/search` | Search for existing diseases |
| `POST` | `/api/investigate` | Investigate new disease |
| `GET` | `/api/download/<result_id>` | Download results as CSV |
| `GET` | `/api/health` | Health check |

## 🔧 Configuration

### API Request Format

**Search Disease:**
```json
POST /api/search
{
  "disease_name": "cancer"
}
```

**Investigate New Disease:**
```json
POST /api/investigate
{
  "diseaseName": "Custom Disease",
  "targetProtein": "Protein Name",
  "sequence": "ATCGATCG..."
}
```

### Response Format

All API responses follow this format:
```json
{
  "success": true,
  "results": [...],
  "message": "Optional message"
}
```

## 🛠️ Customization

### Adding Your ML Models

Replace the `generate_therapeutic_compounds()` function in the Colab notebook with your actual ML models:

```python
def generate_therapeutic_compounds(sequence, target_protein):
    # Your ML model code here
    # Return list of compounds with name, mechanism, efficacy
    pass
```

### Database Integration

Replace the in-memory storage with a proper database:

```python
# Replace results_storage = {} with your database connection
import sqlite3
# or
import pymongo
# or your preferred database
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure `flask-cors` is installed
   - Check that `CORS(app)` is called

2. **ngrok URL Not Working**
   - Ensure ngrok is running
   - Check that the Flask server is running on port 5000
   - Try regenerating the ngrok URL

3. **API Not Responding**
   - Check the Flask server logs in Colab
   - Verify the ngrok URL is correct
   - Test with the health check endpoint

### Testing Your API

Test individual endpoints:

```bash
# Health check
curl https://your-ngrok-url.ngrok.io/api/health

# Search diseases
curl -X POST https://your-ngrok-url.ngrok.io/api/search \
  -H "Content-Type: application/json" \
  -d '{"disease_name": "cancer"}'
```

## 📁 File Structure

```
project/
├── Google_Colab_Flask_API.ipynb    # Colab notebook
├── colab_flask_setup.py            # Flask setup script
├── update_api_config.py            # API config updater
├── src/
│   ├── api.js                      # API client (update this)
│   └── App.jsx                     # React frontend
└── FLASK_COLAB_SETUP.md           # This guide
```

## 🎯 Next Steps

1. **Deploy to Production**: Consider deploying your Flask API to services like:
   - Heroku
   - Google Cloud Run
   - AWS Lambda
   - Railway

2. **Add Authentication**: Implement API keys or OAuth for security

3. **Database Integration**: Connect to a real database instead of in-memory storage

4. **Error Handling**: Add comprehensive error handling and logging

5. **API Documentation**: Use tools like Swagger/OpenAPI for documentation

## 📞 Support

If you encounter issues:
1. Check the Flask server logs in Colab
2. Verify your ngrok URL is accessible
3. Test API endpoints individually
4. Check browser console for frontend errors

Happy coding! 🧬🔬
