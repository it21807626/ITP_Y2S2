import{BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/CateringHome'
import UpdateForm from './components/updateForm'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
         <Route
         path="/"
          element={<Home />}
         /> 
         <Route path="/updateForm/:id" element={<UpdateForm />} />
        </Routes>
      </div>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
