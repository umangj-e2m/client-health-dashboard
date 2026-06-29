import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SettingsPage from './SettingsPage.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <SettingsPage />
    </StrictMode>,
  );
}
