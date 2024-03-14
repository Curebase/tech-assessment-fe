import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient';
import Participants from './pages/participants';
import Trials from './pages/trials';
import EnrollParticipant from './pages/enrollParticipant';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     
      {
        path: 'participants',
        element: <Participants />
      },
      {
        path: 'trials',
        element: <Trials />
      },
      {
        path: 'participants/enrollParticipant',
        element: <EnrollParticipant />
      }
    ],
    
  },
  

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
