import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./GeminiData.css";

function GeminiData() {
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
          model: "gemini-2.5-flash-lite",
          contents:
            "Give me a detailed and up-to-date report on the current status of Bitcoin. Include: the current price in USD and how it has changed over the past 24 hours, 7 days, and 30 days; key technical indicators such as RSI, moving averages, and trading volume trends; recent news or major events that have affected Bitcoin’s price; market sentiment analysis (bullish, bearish, or neutral) with reasons; a summary of Bitcoin’s market capitalization, dominance, and trading volume compared to other major cryptocurrencies; a brief technical analysis prediction for the short term (next week) and medium term (next month); and mention any significant on-chain metrics or institutional activity if available. Provide sources and keep the explanation clear and data-driven.",
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
