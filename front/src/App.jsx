import AdsList from "./components/AdsList/AdsList"
import AdForm from "./components/CreateAd/CreateAd"
import './App.css'

function App() {
  return (
    <div className="main-cont">
        <h1>Сайт для продажи машин</h1>
        <AdsList/>
        <AdForm/>
    </div>
  )
}

export default App
