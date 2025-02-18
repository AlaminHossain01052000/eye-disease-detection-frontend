import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './utilities/Header'
import EyeDiseaseDetectionPage from './Pages/EyeDiseaseDetectPage/EyeDiseaseDetectionPage'



function App() {


  return (
    <>

    
    <BrowserRouter>
        <Header/>
        <Routes>
          
          <Route path='/' Component={Home} />
          <Route path='/eye-disease-detection' Component={EyeDiseaseDetectionPage} />
          {/* <Route path='/projects' Component={Projects} /> */}
          {/* <Route path='/projectdetail/:id' Component={ProjectDetail} /> */}
          
        </Routes>
    
      </BrowserRouter>
  
      

    </>
  )
}

export default App