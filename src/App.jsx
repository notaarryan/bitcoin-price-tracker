import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GeminiData from "./GeminiData.jsx";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

console.log(import.meta.env.COINGECKO_API_KEY, import.meta.env.GEMINI_API_KEY);

function App() {
  const currentDataUrl =
    "https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true&tickers=true";
  const historicDataUrl =
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200";

  const options = {
    method: "GET",
    headers: { "x-cg-demo-api-key": import.meta.env.COINGECKO_API_KEY },
    body: undefined,
  };

  const [loading, setLoading] = useState(true);
  const [historicData, setHistoricData] = useState({
    name: "Unknown",
    prices: [],
  });
  const [currentData, setCurrentData] = useState({
    name: "Unknown",
    prices: [],
    market_data: { current_price: { usd: 0 } },
  });
  const [error, setError] = useState({});
  useEffect(() => {
    fetch(currentDataUrl, options)
      .then((r) => r.json())
      .then((data) =>
        setCurrentData((oldData) => {
          return { ...oldData, ...data };
        })
      )
      .catch((e) => setError(e));

    fetch(historicDataUrl, options)
      .then((r) => r.json())
      .then((data) =>
        setHistoricData((oldData) => {
          return { ...oldData, ...data };
        })
      )
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bitcoin Chart",
      },
    },
  };

  let labels = [];
  let dataPoints = [];

  if (historicData && historicData.prices) {
    labels = historicData.prices.map((item) => {
      const date = new Date(item[0]);
      return date.toLocaleDateString();
    });
    dataPoints = historicData.prices.map((item) => item[1]);
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Price (USD)",
        data: dataPoints,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    if (error instanceof Error) {
      return <h1>{error.message}</h1>;
    }
  }

  return (
    <div>
      <h1>Current {currentData.name} Prices</h1>
      <p>{JSON.stringify(currentData?.market_data?.current_price?.usd)}</p>

      <h1>Historic {currentData.name} Prices</h1>
      <Line options={graphOptions} data={data} />

      <GeminiData />
    </div>
  );
}

export default App;
