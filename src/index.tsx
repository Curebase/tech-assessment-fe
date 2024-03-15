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
import EnrollResult from './pages/enrollResult';


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
        element: <EnrollParticipant />,
      }, 
      {
        path: 'participants/enrollParticipant/:status',
        element: <EnrollResult />
      },
    ],
    
  },
  

]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css' />
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
