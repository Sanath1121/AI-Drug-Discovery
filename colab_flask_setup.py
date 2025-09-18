# Google Colab Flask API Setup
# Run this in your Google Colab notebook to set up the Flask API

# Install required packages
!pip install flask flask-cors requests pandas numpy scikit-learn

# Import necessary libraries
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import tempfile
from datetime import datetime
import requests

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample disease database (replace with your actual data)
DISEASE_DATABASE = {
    "cancer": {
        "disease_name": "Cancer",
        "target_protein": "p53",
        "sequence": "MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD",
        "description": "A group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.",
        "therapeutic_compounds": [
            {"name": "Doxorubicin", "mechanism": "DNA intercalation", "efficacy": 0.85},
            {"name": "Cisplatin", "mechanism": "DNA crosslinking", "efficacy": 0.78},
            {"name": "Paclitaxel", "mechanism": "Microtubule stabilization", "efficacy": 0.82}
        ]
    },
    "alzheimer": {
        "disease_name": "Alzheimer's Disease",
        "target_protein": "Amyloid-beta",
        "sequence": "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIA",
        "description": "A neurodegenerative disease that is the most common cause of dementia.",
        "therapeutic_compounds": [
            {"name": "Donepezil", "mechanism": "Acetylcholinesterase inhibition", "efficacy": 0.65},
            {"name": "Memantine", "mechanism": "NMDA receptor antagonism", "efficacy": 0.58},
            {"name": "Aducanumab", "mechanism": "Amyloid-beta clearance", "efficacy": 0.72}
        ]
    },
    "diabetes": {
        "disease_name": "Type 2 Diabetes",
        "target_protein": "Insulin Receptor",
        "sequence": "MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN",
        "description": "A chronic condition that affects the way the body processes blood sugar.",
        "therapeutic_compounds": [
            {"name": "Metformin", "mechanism": "Hepatic glucose production inhibition", "efficacy": 0.88},
            {"name": "Insulin", "mechanism": "Glucose uptake enhancement", "efficacy": 0.95},
            {"name": "Sitagliptin", "mechanism": "DPP-4 inhibition", "efficacy": 0.76}
        ]
    }
}

# Results storage (in production, use a proper database)
results_storage = {}

@app.route('/api/search', methods=['POST'])
def search_disease():
    """Search for existing disease in database"""
    try:
        data = request.get_json()
        disease_name = data.get('disease_name', '').lower().strip()
        
        if not disease_name:
            return jsonify({
                'success': False,
                'error': 'Disease name is required'
            }), 400
        
        # Search for disease in database
        found_diseases = []
        for key, disease in DISEASE_DATABASE.items():
            if disease_name in key or disease_name in disease['disease_name'].lower():
                found_diseases.append(disease)
        
        if not found_diseases:
            return jsonify({
                'success': True,
                'message': 'No diseases found matching your search',
                'results': []
            })
        
        return jsonify({
            'success': True,
            'results': found_diseases,
            'count': len(found_diseases)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Search failed: {str(e)}'
        }), 500

@app.route('/api/investigate', methods=['POST'])
def investigate_disease():
    """Investigate new disease and find potential therapeutic compounds"""
    try:
        # Handle both JSON and form data (for file uploads)
        if request.is_json:
            data = request.get_json()
            pdb_file = None
        else:
            data = request.form.to_dict()
            pdb_file = request.files.get('pdbFile')
        
        # Validate required fields
        required_fields = ['diseaseName', 'targetProtein', 'sequence']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'{field} is required'
                }), 400
        
        # Simulate AI analysis (replace with your actual ML models)
        disease_name = data['diseaseName']
        target_protein = data['targetProtein']
        sequence = data['sequence']
        
        # Generate mock therapeutic compounds based on sequence analysis
        therapeutic_compounds = generate_therapeutic_compounds(sequence, target_protein)
        
        # Create result
        result = {
            'disease_name': disease_name,
            'target_protein': target_protein,
            'sequence': sequence,
            'description': f'AI-generated analysis for {disease_name} targeting {target_protein}',
            'therapeutic_compounds': therapeutic_compounds,
            'analysis_timestamp': datetime.now().isoformat(),
            'pdb_uploaded': pdb_file is not None
        }
        
        # Store result
        result_id = f"result_{len(results_storage) + 1}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        results_storage[result_id] = result
        
        return jsonify({
            'success': True,
            'results': [result],
            'result_id': result_id,
            'message': f'Successfully analyzed {disease_name}'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Investigation failed: {str(e)}'
        }), 500

@app.route('/api/download/<result_id>', methods=['GET'])
def download_results(result_id):
    """Download results as CSV"""
    try:
        if result_id not in results_storage:
            return jsonify({
                'success': False,
                'error': 'Result not found'
            }), 404
        
        result = results_storage[result_id]
        
        # Create CSV data
        csv_data = []
        for compound in result['therapeutic_compounds']:
            csv_data.append({
                'Disease Name': result['disease_name'],
                'Target Protein': result['target_protein'],
                'Compound Name': compound['name'],
                'Mechanism': compound['mechanism'],
                'Efficacy Score': compound['efficacy'],
                'Analysis Date': result['analysis_timestamp']
            })
        
        # Create DataFrame and convert to CSV
        df = pd.DataFrame(csv_data)
        csv_string = df.to_csv(index=False)
        
        # Create temporary file
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False)
        temp_file.write(csv_string)
        temp_file.close()
        
        return send_file(
            temp_file.name,
            as_attachment=True,
            download_name=f"{result['disease_name']}_analysis_results.csv",
            mimetype='text/csv'
        )
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Download failed: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

def generate_therapeutic_compounds(sequence, target_protein):
    """Generate mock therapeutic compounds based on sequence analysis"""
    # This is a mock function - replace with your actual ML models
    compounds = [
        {
            'name': f'{target_protein}_inhibitor_1',
            'mechanism': 'Protein-protein interaction inhibition',
            'efficacy': round(np.random.uniform(0.6, 0.9), 2)
        },
        {
            'name': f'{target_protein}_modulator_2',
            'mechanism': 'Allosteric modulation',
            'efficacy': round(np.random.uniform(0.5, 0.8), 2)
        },
        {
            'name': f'{target_protein}_antagonist_3',
            'mechanism': 'Receptor antagonism',
            'efficacy': round(np.random.uniform(0.7, 0.95), 2)
        }
    ]
    
    # Sort by efficacy
    compounds.sort(key=lambda x: x['efficacy'], reverse=True)
    return compounds

# Run the Flask app
if __name__ == '__main__':
    print("Starting Flask API server...")
    print("Make sure to run ngrok in a separate cell to expose the API!")
    app.run(host='0.0.0.0', port=5000, debug=True)
