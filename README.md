# Movie Review Web App - Frontend (React)

This repository contains the frontend code for a movie review web application built with React. Users can browse movies, watch trailers, and write reviews.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Prerequisites

- **Node.js and npm (or yarn):** Make sure you have Node.js and either npm or yarn installed. You can download them from the official website: [https://nodejs.org/](https://nodejs.org/)
- **ngrok:** You will need ngrok to expose your local development server to the internet. Download and install it from: [https://ngrok.com/download](https://ngrok.com/download)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>

2. **Navigate to the project directory:**
   ```bash
   cd movie-review-app-frontend

3. **Install dependencies:**
   ```bash
   npm install
  or
   ```bash
       yarn install
```
## Configuration
### **ngrok Setup:**

1. **Start ngrok:**

Open a terminal and run:
```bash
ngrok http 3000
```
(or whatever port your React app is using).

2. **Copy ngrok URL:**
ngrok will provide a URL like `https://<random-string>.ngrok.io.` Copy this URL.


3. **Update axiosConfig.js:**

Open `axiosConfig.js` (found in src/api).
Replace `https://beb8-109-185-76-100.ngrok-free.app` with the ngrok URL you copied.

##Usage
Start the development server:

Bash
npm start 
Folosește codul cu precauție.
content_copy
or

Bash
yarn start
Folosește codul cu precauție.
content_copy
Open in browser: Your app should automatically open at http://localhost:3000. If not, open this URL in your browser.

Contributing
If you'd like to contribute, please fork the repository and create a pull request.
