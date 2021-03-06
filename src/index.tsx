import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // './_App' is new, './App' is old
import reportWebVitals from './reportWebVitals';
import isElectron from 'is-electron';

import './index.css';
import './flex.css';
import './theme.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', {scope: './'})
  .then((reg) => {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

declare global {
  interface Window {
    electron: {
      ping(): void
      windowButton(action: 'minimize' | 'maximize' | 'close'): void
      openGameUrl(url: string): void
      devTools(): void
      reloadPage(): void
      udp(ip: string, port: number, ssrc: number): void
      disconnectUDP(): void
      udpKey(key: number[]): void

      setUdpReplyHandler(callback: (publicIp: string, publicPort: number) => void): void
      setPcmHandler(callback: (data: any) => void): void
    }
    currentDiscordHbTimerId?: number
    currentDiscordVWSHbTimerId?: number
  }
}

export const { electron, currentDiscordHbTimerId } = window;

export function openGameUrl(url: string) {
  if (isElectron()) window.electron.openGameUrl(url)
  else window.open(url)
}
