// import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Notifications } from '@mantine/notifications';

import { Provider } from 'react-redux';
import Store from './Store';
import AppRoutes from './Pages/AppRoutes';
import { CartProvider } from './Components/productpage/CartContext';
import { UserProvider } from './Components/notification/UserContext';

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
    <div className='w-[100%] defaulttheme={dark} overflow-hidden'>
    <Provider store={Store}>
    <UserProvider>
    <CartProvider>
        <MantineProvider   theme={theme} >
          <Notifications position="top-right" zIndex={1000} />
            <AppRoutes/>
        </MantineProvider>
     </CartProvider> 
     </UserProvider> 
    </Provider>


    </div>
  );
}


export default App;
