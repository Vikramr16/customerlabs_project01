## Segment Saver App

A simple React + Vite application to create and save audience segments based on user traits. This project was built as part of the CustomerLabs React Test (Screen 1.0).

## Features

- "Save segment" button triggers a popup
- Popup includes:
  - Text input for segment name
  - Dropdown to select schema traits
  - "+Add new schema" link to add multiple dropdowns
- Dropdown options dynamically update to exclude already selected traits
- Sends segment data to server in JSON format via [Webhook.site](https://webhook.site)

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- JavaScript (ES6+)
- CSS

## Installation

```bash
# Clone the repository
git clone https://github.com/Vikramr16/customerlabs_project01.git
cd customerlabs_project01

# Install dependencies
npm install

# Start the development server
npm run dev
