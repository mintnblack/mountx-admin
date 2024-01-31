import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Course from "./Course";
import Design from "./Courses.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import LoadingScreen from "../components/LoadingScreen";
import EmptyCourses from "./EmptyCourses";

function Courses(props) {
  const { confirmAction, action, userId } = props;
  const [ courses, setCourses] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/course/all`)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/course/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Course successfully deleted",
              "success",
              true
            );
            setTimeout(() => {
              window.location.reload();
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmAction, action, userId]);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Courses"} />
            <span className={Design.headerBtn}>
              <NavLink to="/courses/create">
                <PrimaryBtn title={"+ Create New"} />
              </NavLink>
            </span>
          </div>

          <div className="topMargin">
            <div className="container">
              <div
                style={{
                  display: courses.length === 0 ? "none" : "block",
                }}
              >
                <div >
                  {courses?.map((course) => {
                    return (

                      <div key={course.id}>
                        <Course
                          key={course.id}
                          course={course}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: courses.length === 0 ? "block" : "none",
                }}
              >
                <EmptyCourses />
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
   return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
      
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
