import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "../courses/Courses.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import { SHOW_POPUP } from "../store/actions/popUpActions";

import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingScreen from "../components/LoadingScreen";
import EmptyEnquiry from "./EmptyEnquiry";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";

function Category(props) {
  const { confirmAction, action, userId } = props;
  const [ enquiry, setEnquiry] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const navigate = useNavigate();

  const confirmDeleteEnquiry = (CategoryId) => {
    props.onOpenPopup(true, false, CategoryId, "delete");
  };
  const onEditCategory = () =>{
    navigate(`/category/create`)
  }
  

  useEffect(() => {
    axios
      .get(`${BASE_URL}/enquiry/all`)
      .then((response) => {
        setEnquiry(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/enquiry/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Enquiry successfully deleted",
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
            <Header title={"Enquiry"} />
          </div>

          <div className="topMargin">
            <div className="container">
              <div
                style={{
                  display: enquiry.length === 0 ? "none" : "block",
                }}
              >
                <div >
                  {enquiry?.map((enquiry) => {
                    return (

                      <div className={Design.courseContainer}>
                         <NavLink to={`/enquiry/${enquiry.id}`} className={Design.navlink}>
                          <div>
                            <h3>{enquiry.name}</h3>
                            <p>{enquiry.email}</p>
                            <p>{enquiry.message.length > 200 ? `${enquiry.message.substring(0, 200)}...` : enquiry.message}</p>
                          </div>
                         </NavLink>
                        <div className={Design.courseInfoManageBtnsContainer}>
                          <span onClick={() => confirmDeleteEnquiry(enquiry.id)}>
                            <img width={20} src={deleteIcon} alt="delete" key={"delete"} />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: enquiry.length === 0 ? "block" : "none",
                }}
              >
                <EmptyEnquiry />
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
    onOpenPopup: (showPopup, confirmAction, userId, action) => {
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action });
    },
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
