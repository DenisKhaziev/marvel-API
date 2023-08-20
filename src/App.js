// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, ComicsPage, Page404, SingleComicPage, SingleCharacterPage } from './pages';
import AppHeader from './appHeader/AppHeader';




const App = () => {



  
  
      return (
        <Router>
          <div className="App">
            <AppHeader />
            <main>
                <Routes>
                    <Route path='/comics' element={<ComicsPage />}/>
                    <Route path='/' element={<MainPage  />}/>
                    <Route path='*' element={<Page404 />}/>
                    <Route path='/comics/:id' element={<SingleComicPage />}/>
                    <Route path='/characters/:id' element={<SingleCharacterPage  />}/>

                </Routes>
            </main>
          </div>
        </Router>
      )

}

export default App;
