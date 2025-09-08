import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { sendLog } from "../Logging-Middleware/log.js";

const LOG_TOKEN = process.env.REACT_APP_LOG_TOKEN || "";

// send first log when app starts
sendLog("frontend", "info", "middleware", "App started", LOG_TOKEN);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
