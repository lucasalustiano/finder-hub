import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Footer from './pages/Footer';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar';
import { GithubProvider } from './context/github/GithubContext'

function App() {
  return (
    <GithubProvider>
      <BrowserRouter>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/notfound' element={<NotFound />}></Route>
              <Route exact path='/' element={<Home />}></Route>
              <Route path='*'element={<NotFound />}></Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
