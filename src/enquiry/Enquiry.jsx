import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";
import Design from "../courses/Courses.module.css";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import axios from "axios";
import { BASE_URL } from "../utils/constants/applicationConstants";

function Enquiry(props) {
  const navigate = useNavigate();
  const { course } = props;
  const { id: enquiryId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const confirmDeleteCourse = () => {
    props.onOpenPopup(true, false, course.id, "delete");
  };
  const onEditCourse = () => {
    navigate(`/update/leaflets/${course.id}`);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/enquiry/${enquiryId}`)
      .then((response) => {
        console.log(response);
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setPhone(response.data.data.phone);
        setMessage(response.data.data.message);
        console.log("Enquiry", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  axios.post(`${BASE_URL}/enquiry/`)
  .then(response => {
    // Handle success
    console.log('Form submitted successfully!', response.data);
  })
  .catch(error => {
    // Handle error
    console.error('Error submitting form:', error);
  });


  return (
    <div className={Design.courseContainer}>
      <NavLink to={`mailto:${email}`} className={Design.navlink}>
        <div>
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{message}</p>
        </div>
      </NavLink>
    
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) => {
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action });
    },
  };
};

export default connect(null, mapDispatchToProps)(Enquiry);
