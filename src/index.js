import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
   <React.StrictMode>
   <Provider store={store}>
       <NextUIProvider>
       <NextThemesProvider attribute="class" defaultTheme="dark">
       <main className="text-foreground bg-background">
        <App />
        </main>
        </NextThemesProvider>
      </NextUIProvider>
   </Provider> </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals(console.log);
  
