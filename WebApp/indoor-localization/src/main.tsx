import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import "@synergy-design-system/tokens/themes/light.css";
import "@synergy-design-system/components/index.css";
import "@synergy-design-system/styles/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
