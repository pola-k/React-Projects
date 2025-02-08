import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from "./header.jsx"
import MainContent from './main-content.jsx'
import Footer from './footer.jsx'
import App from './App.jsx'
import './index.css'

function Facts()
{
  return (
    <>
        <img src="/react.svg" alt="React Logo" />
        <h1>Fun Facts about React</h1>
        <ul>
          <li>Was First Released in 2013</li>
          <li>Was Originally Created by Jordan Walke</li>
          <li>Has well over 100K stars on Github</li>
          <li>Is Maintained by Meta</li>
          <li>Powers thousands of enterprise apps, including mobile apps</li>
        </ul>
    </>
  )
}

function Advantages()
{
  return (
    <>
        <h1>Why Should You Learn React</h1>
        <ol>
          <li>High Demand Skill</li>
          <li>Declarative</li>
          <li>Composable</li>
          <li>Flexible</li>
          <li>Large Community</li>
        </ol>
    </>
  )
}

function HomePage()
{
  return (
    <>
      <Header/>
      <MainContent/>
      <Footer/>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)