# Customerlabs React Test - Submission

This archive contains:
- A minimal React app implementing the requirements from `Customerlabs_React_Test.pdf`
- Extracted PDF text and analysis summary.

**Provided webhook URL (used by the app to POST payload):**
https://webhook.site/70e876b6-8dc1-42bf-811f-c813c9d17198

How to run:
1. Ensure Node.js and npm are installed.
2. In the `react_test_project` folder run:
   - `npm install`
   - `npm start`
3. Open http://localhost:3000
4. Click "Save segment", add schemas, and click "Save the segment".
5. The app will POST JSON to the webhook URL above. Open the webhook.site URL in your browser to inspect received payloads.

Payload format example:
{
  "segment_name": "last_10_days_blog_visits",
  "schema": [
    {"first_name": "First Name"},
    {"last_name": "Last Name"}
  ]
}

Notes:
- This is a minimal implementation intended for testing and demonstration.
- To publish to GitHub, create a repo and push this folder. The PDF and analysis files are included for reference.

**Output Screenshot 1 :**
<img width="1349" height="638" alt="image" src="https://github.com/user-attachments/assets/a8da7726-3acb-4259-b5e1-b88a54e02d83" />



**Output SCreenshot 2 :**
<img width="1353" height="644" alt="image" src="https://github.com/user-attachments/assets/7099118a-3fea-4473-9362-ce263f7705c4" />
