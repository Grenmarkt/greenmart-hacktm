import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/client';
import { router } from './lib/router';
import './index.css';
import Navbar from './components/navBar';
import Footer from './components/footer';
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <RouterProvider router={router} />
        <Footer />
      </QueryClientProvider>
    </StrictMode>,
  );
}
