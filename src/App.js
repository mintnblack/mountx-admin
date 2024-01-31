import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";

// Authenctication

import LoginPage from "./authentication/LoginPage";
import TriggerResetEmailPage from "./authentication/TriggerResetEmailPage";
import ResetPasswordForm from "./authentication/ResetPasswordForm";

// containers
import Container from "./container/Container";

import Dashboard from "./dashboard/Dashboard";

import User from "./students/Users"
import CreateUser from "./students/AddUser"
import EditUser from "./students/EditUser";

import Courses from "./courses/Courses"
import CreateCourse from "./courses/createCourses/CreateCourse"
import EditCourse from "./courses/createCourses/EditCourse"
import CourseInfo from "./courses/CourseInfo"

import CreateChapter from "./courses/chapters/AddChapter";
import EditChapter from "./courses/chapters/EditChapter"

import Category from "./category/Category";
import CreateCategory from "./category/CreateCategory";
import EditCategory from "./category/EditCategory"

import Enquiry from "./enquiry/Enquiry"
// snackbar

import CustomizedSnackbars from "./components/CustomizedSnackbars";
import Enquiries from "./enquiry/Enquiries";

function App(props) {
  const { isLoggedIn } = props;

  return (
    <div>
      <div>
        <Router>
          <div>
          <Routes>
            <Route
                path="/auth"
                element={
                  !isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />
                }
              />
              
              <Route path="/forgot-password" element={<TriggerResetEmailPage />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />
              <Route
                path="/"
                element={isLoggedIn ? <Container /> : <Navigate to="/auth" />}
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<User />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/edit/:id" element={<EditUser />} />

                <Route path="courses" element={<Courses />} />
                <Route path="courses/create" element={<CreateCourse />} />
                <Route path="courses/edit/:id" element={<EditCourse />} />
                <Route path="courses/info/:id" element={<CourseInfo />} />
                <Route path="courses/chapter/create/:id" element={<CreateChapter/>} />
                <Route path="courses/chapter/edit/:courseId/:chapterId" element={<EditChapter />} />

                <Route path="category" element={<Category />} />
                <Route path="category/create" element={<CreateCategory />} />
                <Route path="category/edit/:id" element={<EditCategory />} />

                <Route path="/enquiry" element={<Enquiries/>} />
                <Route path="/enquiry/:id" element={<Enquiry/>} />

              </Route>
            </Routes>
           
          </div>
        </Router>
      </div>
      <CustomizedSnackbars/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn:
      state.authReducer.authToken != null && state.authReducer.email != null,
  };
};

export default connect(mapStateToProps, null)(App);
