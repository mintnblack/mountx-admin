import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";
import Design from "./Courses.module.css";
import { SHOW_POPUP } from "../store/actions/popUpActions";


function Course(props) {
  const navigate = useNavigate();
  const { course } = props;
  
  const confirmDeleteCourse = () => {
    props.onOpenPopup(true, false, course.id, "delete");
  };
  const onEditCourse = () =>{
    navigate(`/courses`)
  }
  

  return (
       <div className={Design.courseContainer}>
      <NavLink to={`/courses/info/${course.id}`} className={Design.navlink}>
        <div>
          <h3>{course.name}</h3>
          <p>{course.category_name}</p>
          <p>{course.mentor}</p>
        </div>
      </NavLink>
      <div className={Design.courseInfoManageBtnsContainer}>
        <span onClick={confirmDeleteCourse}>
          <img width={20} src={deleteIcon} alt="delete" key={"delete"} />
        </span>
        <NavLink to={`/courses/edit/${course.id}`} className={Design.navlink}>
        <span onClick={onEditCourse}>
          <img width={20} src={editIcon} alt="edit" key={"edit"} />
        </span>
        </NavLink>
      </div>
    </div>
   );
}

const mapDispatchToProps = (dispatch) => {
    return {
      onOpenPopup: (showPopup, confirmAction, userId, action) => {
        dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action });
      }
    };
  };
  
  export default connect(null, mapDispatchToProps)(Course);