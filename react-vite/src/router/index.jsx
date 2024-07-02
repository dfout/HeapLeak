import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Homepage from "../components/Homepage";
import QuestionPage from "../components/QuestionPage";
import ManageQuestions from "../components/ManageQuestions";
import ManageAnswers from "../components/ManageAnswers";
import SavedQuestions from "../components/SavedQuestions";
import AboutPage from "../components/AboutPage";
import CreateQuestion from "../components/CreateQuestion/CreateQuestion";
import Layout from "./Layout";

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
        path: "questions/:questionId",
        element: <QuestionPage />,
      },
      {
        path: "manage-questions",
        element: <ManageQuestions />,
      },
      {
        path: "manage-answers",
        element: <ManageAnswers />,
      },
      {
        path: "saved-questions",
        element: <SavedQuestions />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "questions/create",
        element: <CreateQuestion />,
      },
    ],
  },
]);
