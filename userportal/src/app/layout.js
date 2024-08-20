"use client";

import { Provider } from 'react-redux';
import { store } from '../redux/store';   
import "./globals.css"


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
            <main>
              {children}
            </main>
        </body>
      </html>
    </Provider>
  );
}
