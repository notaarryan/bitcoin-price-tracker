# Bitcoin Price Tracker

A **React + Vite** application that tracks Bitcoin prices in real-time and provides historical data visualization. The app integrates with the **CoinGecko API** to fetch live prices and **Google Gemini AI** to generate market insights and analysis.

## Features

- **Real-time Bitcoin prices** in USD.
- **Historical price charts** to track trends over time.
- **AI-generated market insights** using Google Gemini.
- Handles **loading and error states** gracefully.

## Tech Stack

- **Frontend:** React, Vite  
- **Charting:** Chart.js, react-chartjs-2  
- **APIs:** CoinGecko, Google Gemini AI  
- **Styling:** CSS  

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bitcoin-price-tracker.git
   cd bitcoin-price-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory for API keys:
   ```
   VITE_COINGECKO_API_KEY=your_coingecko_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

## Docker

You can also run the app using Docker:

1. Build the Docker image:
   ```bash
   docker build -t bitcoin-price-tracker .
   ```

2. Run the container:
   ```bash
   docker run -p 5173:5173 bitcoin-price-tracker
   ```

3. Open your browser at `http://localhost:5173`.

## Usage

- View **current Bitcoin prices** at a glance.
- Explore **price trends** with the interactive chart.
- Read **AI-generated market insights** below the chart.
- Track **daily, weekly, and monthly price changes**.

## Notes

- Data is fetched directly from **CoinGecko**.
- AI market analysis is generated using **Google Gemini AI**.
- Ensure your API keys are valid if using private endpoints.

## Demo

[Live Demo](https://mock-shopping-cart-rho.vercel.app/)
