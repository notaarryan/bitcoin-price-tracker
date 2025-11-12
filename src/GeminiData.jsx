import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./GeminiData.css";

function GeminiData({ currentData, historicData }) {
  const [geminiLoadingStatus, setGeminiLoadingStatus] = useState(true);
  const [geminiResponse, setGeminiResponse] = useState("");
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const ai = new GoogleGenAI({
      apiKey: geminiApiKey,
    });
    async function main() {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Using the following Bitcoin data: current price USD ${
            currentData?.market_data?.current_price?.usd ?? "N/A"
          }, price change in 24h ${
            currentData?.market_data?.price_change_percentage_24h ?? "N/A"
          }%, total volume USD ${
            currentData?.market_data?.total_volume?.usd ?? "N/A"
          }, market cap USD ${
            currentData?.market_data?.market_cap?.usd ?? "N/A"
          } historic data in usd ${
            historicData.prices
          } the data is in day: price in usd format. Provide a concise, up-to-date report on Bitcoin's status focusing on recent trends, key technical indicators like RSI and moving averages, recent news or events affecting price, market sentiment (bullish, bearish, or neutral) with reasons, and any significant on-chain or institutional activity. Use only data from the last month, keep it data-driven and provide sources.`,
        });

        setGeminiResponse(response.text);
      } catch (error) {
        console.error("Error fetching Gemini data:", error);
      } finally {
        setGeminiLoadingStatus(false);
      }
    }
    main();
  }, []);

  return (
    <>
      {geminiLoadingStatus ? (
        <p>Loading Gemini report...</p>
      ) : (
        <div className="markdown-body">
          <ReactMarkdown>{geminiResponse}</ReactMarkdown>
        </div>
      )}
    </>
  );
}

export default GeminiData;
