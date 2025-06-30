import './globals.css';
import ReduxProvider from './store/provider'; 

export const metadata = {
  title: 'Auth App',
  description: 'Login and Signup with Redux',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <ReduxProvider>{children}</ReduxProvider>
      
      </body>
    
    </html>
  );
}
