import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { ContextProvider } from './context/ContextProvider';
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
