#!/usr/bin/env python3
"""
Script to update the API configuration in your React app
Run this script after getting the ngrok URL from Google Colab
"""

import os
import re

def update_api_config(ngrok_url):
    """Update the API_BASE_URL in src/api.js"""
    api_file_path = "src/api.js"
    
    if not os.path.exists(api_file_path):
        print(f"Error: {api_file_path} not found!")
        return False
    
    # Read the current file
    with open(api_file_path, 'r') as file:
        content = file.read()
    
    # Replace the API_BASE_URL
    pattern = r"const API_BASE_URL = 'YOUR_NGROK_URL';"
    replacement = f"const API_BASE_URL = '{ngrok_url}';"
    
    if re.search(pattern, content):
        updated_content = re.sub(pattern, replacement, content)
        
        # Write the updated content back
        with open(api_file_path, 'w') as file:
            file.write(updated_content)
        
        print(f"✅ Successfully updated API_BASE_URL to: {ngrok_url}")
        return True
    else:
        print("❌ Could not find the API_BASE_URL pattern to replace")
        return False

def main():
    print("🔧 API Configuration Updater")
    print("=" * 40)
    
    # Get ngrok URL from user
    ngrok_url = input("Enter your ngrok URL (e.g., https://abc123.ngrok.io): ").strip()
    
    if not ngrok_url:
        print("❌ No URL provided!")
        return
    
    if not ngrok_url.startswith(('http://', 'https://')):
        ngrok_url = 'https://' + ngrok_url
    
    # Update the configuration
    if update_api_config(ngrok_url):
        print("\n🎉 Configuration updated successfully!")
        print("You can now run your React app with: npm run dev")
    else:
        print("\n❌ Failed to update configuration")

if __name__ == "__main__":
    main()
