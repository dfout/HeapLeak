import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Homepage';
import Questions from '../components/Questions';
import ManageQuestions from '../components/ManageQuestions'
import ManageAnswers from '../components/ManageAnswers'
import SavedQuestions from '../components/SavedQuestions'
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "questions",
        element : <Questions />
      },
      {
        path: "manage-questions",
        element : <ManageQuestions />
      },
      {
        path: "manage-answers",
        element : <ManageAnswers />
      },
      {
        path: "saved-questions",
        element : <SavedQuestions />
      },
    ],
  },
]);
