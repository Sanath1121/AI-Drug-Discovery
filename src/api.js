const API_BASE_URL = 'https://d48cb720ee0d.ngrok-free.app/'; // Replace with your actual ngrok URL from Google Colab

// API client with interceptors for error handling
const createApiClient = () => {
  const client = {
    get: async (url, options = {}) => {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    
    post: async (url, data, options = {}) => {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
          ...options.headers,
        },
        body: JSON.stringify(data),
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    }
  };
  
  return client;
};

const apiClient = createApiClient();

// Drug Discovery API functions
export const predictDrugCandidates = async (diseaseName) => {
  try {
    const response = await apiClient.get(`/predict?disease=${encodeURIComponent(diseaseName)}`);
    return { success: true, data: response };
  } catch (error) {
    console.error('Error predicting drug candidates:', error);
    return { success: false, error: error.message };
  }
};

export const getResults = async () => {
  try {
    const response = await apiClient.get('/results');
    return { success: true, data: response };
  } catch (error) {
    console.error('Error fetching results:', error);
    return { success: false, error: error.message };
  }
};

export const downloadResultsCSV = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/download_csv`, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
        'ngrok-skip-browser-warning': 'true', // Skip ngrok warning page
      },
    });
    
    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`);
    }
    
    const blob = await response.blob();
    return { success: true, data: blob };
  } catch (error) {
    console.error('Error downloading CSV:', error);
    return { success: false, error: error.message };
  }
};

export const checkAPIHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return { success: true, data: response };
  } catch (error) {
    console.error('Error checking API health:', error);
    return { success: false, error: error.message };
  }
};

export const validateDiseaseInput = (diseaseName) => {
  const errors = {};
  
  if (!diseaseName || diseaseName.trim().length < 2) {
    errors.diseaseName = 'Disease name must be at least 2 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};