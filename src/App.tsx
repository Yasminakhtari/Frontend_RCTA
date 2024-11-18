import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import '@mantine/core/styles.css';
//import '@mantine/carousel/styles.css';

import Header from './Header/Header';
import HomePage from './Pages/HomePage';
import Footer from './Footer/Footer';
import About from './Pages/About';
import SignUpPage from './Pages/SignUpPage';

function App() {

  const theme = createTheme({
    focusRing:"never",
    primaryColor: 'blueRibbon',
    colors:{
      // 'cyanAqua':  ['#ebfffe','#ceffff','#a2fdff','#63f9fd','#1debf4','#00ceda','#03a4b7','#0a8294','#126878','#145665','#063a46',],
      // 'pigmentIndigo': ['#faf4ff','#f3e6ff','#ead2ff','#d9aeff','#c27bff', '#ab49ff','#9825f8','#8315db','#6f17b2','#5b148f','#4b0082'],
      'blueRibbon': ['#eef8ff','#d8eeff','#b9e0ff', '#89cfff','#52b4ff','#2a91ff','#0d6efd','#0c5ae9','#1149bc','#144194','#11295a',],
    
      'mine-shaft': ['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888','#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#2d2d2d'],
    },
    fontFamily:"poppins,sans-serif",
    primaryShade:4,

   })

  return (
    <MantineProvider theme={theme} >
    
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/about-us" element={<About/>}/>
            <Route path='*' element={<HomePage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<SignUpPage/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </MantineProvider>
  );
}


export default App;
