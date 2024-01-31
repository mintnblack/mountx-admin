import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BannerImage from "../../components/BannerImage";
import TextEditorContainer from "../../components/TextEditorContainer";
import PrimaryBtn from "../../components/PrimaryBtn";
import Design from "../Courses.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";

function EditChapter(props) {

  const { chapterId: chapterId, courseId: courseId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chapter/${chapterId}`)
      .then((response) => {
        console.log("response",response)
        setName(response.data.data.name);
        setDescription(response.data.data.description);
        setDuration(response.data.data.duration);
       })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!name) {
        props.openSnackbar("Please enter title", "error", true);
        setLoading(false);
        return false;
      } else if (!description) {
        props.openSnackbar("Please enter description", "error", true);
        setLoading(false);
        return false;
      } else if (!duration) {
        props.openSnackbar("Please enter Duration", "error", true);
        setDuration(false);
        return false;
      } 
      return true;
  };

  const onUpdateChapter = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .put(`${BASE_URL}/chapter/${chapterId}`, {
          name: name,
          description: description,
          duration: duration,
        

        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Chapter Updated successfully",
              "success",
              true
            );
            setLoading(false);
            setTimeout(() => {
              navigate(`/courses/info/${courseId}`);
            }, 1000);
          }
        })
        .catch((error) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="headerSection">
        <Header title={"Update Chapter"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
          
        <h5>Title</h5>
          <div className="textInput">
            <input
              value={name}
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <h5>Description</h5>
          <div className="textarea">
            <textarea
              value={description}
              type="text"
              rows={10}
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <h5>Duration</h5>
          <div className="textInput">
            <input
              value={duration}
              type="text"
              placeholder="Duration"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </div>
          <span onClick={onUpdateChapter}>
            <PrimaryBtn title={"Update"} loading={loading} />
          </span>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(EditChapter);
