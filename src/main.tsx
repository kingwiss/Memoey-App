import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Get the root element from the DOM
const rootElement = document.getElementById('root')

// Ensure the root element exists before attempting to render
if (!rootElement) {
  console.error('Root element not found! Make sure there is a div with id "root" in index.html')
} else {
  // Create a React root and render the App component
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}