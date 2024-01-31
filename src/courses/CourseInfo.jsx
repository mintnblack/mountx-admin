import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import axios from "axios";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./Courses.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import { SHOW_POPUP } from "../store/actions/popUpActions";

import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingScreen from "../components/LoadingScreen";
import EditIcon from "../customIcons/EditIcon";
import DeleteIcon from "../customIcons/deleteIcon";

function CourseInfo(props) {
  const { id: courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState([]);
  const { confirmAction, action, userId } = props;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [mentor, setMentor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [chapters, setChapters] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const maxDescriptionLength = 500;

  const confirmDeleteChapter = (chapterId) => {
    props.onOpenPopup(true, false, chapterId, "delete");
  };

  useEffect(() => {
    console.log(courseId);
    axios
      .get(`${BASE_URL}/course/${courseId}`)
      .then((response) => {
        console.log(response);
        setName(response.data.data.name);
        setCategory(response.data.data.category_name);
        setMentor(response.data.data.mentor);
        setDescription(response.data.data.description);
        setImage(response.data.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chapter/course/?course_id=${courseId}`)
      .then((response) => {
        setChapters(response.data?.data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/chapter/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Chapter successfully deleted", "success", true);

            setChapters((prevChapters) =>
              prevChapters.filter((chapter) => chapter.id !== userId)
            );

            setTimeout(() => {}, SNACKBAR_AUTO_HIDE_DURATION);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
        </span>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Edit",
      render: (record) => (
        <a href={`/courses/chapter/edit/${courseId}/${record.id}`}>
          <EditIcon color={"#00000"} />
        </a>
      ),
    },
    {
      title: "Delete",
      render: (record) => (
        <a onClick={() => confirmDeleteChapter(record.id)}>
          <DeleteIcon color={"#00000"} />
        </a>
      ),
    },
  ];

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={name} />
            
          </div>
          <div className="topMargin">
            <div className={Design.courseInfoContainer}>
              <div className={Design.courseInfo}>
                <div className={Design.key}>Mentor :</div>
                <div className={Design.value}>{mentor}</div>
              </div>
              <div className={Design.courseInfo}>
                <div className={Design.key}>Category :</div>
                <div className={Design.value}>{category}</div>
              </div>
              <div className={Design.courseInfo}>
                <div className={Design.key}>Description :</div>
                <div className={Design.value}>
                  {description.length > maxDescriptionLength
                    ? `${description.substring(0, maxDescriptionLength)}...`
                    : description}
                </div>
              </div>
              {/* <img src={image}/> */}
              </div>
             <div className="headerSection">
             <h4 className={Design.courseInfoSubHeading}>Chapters</h4>
              <span className={Design.headerBtn}>
               
              <NavLink to={`/courses/chapter/create/${courseId}`}>
                <PrimaryBtn title={"+ Add Chapter"} />
              </NavLink>
            </span>
             </div>
              <Table
                columns={columns}
                dataSource={chapters}
                pagination={false}
              />
          
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfo);
