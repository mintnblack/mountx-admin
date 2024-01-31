import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import TextEditorContainer from "../../components/TextEditorContainer";
import PrimaryBtn from "../../components/PrimaryBtn";
import BannerImage from "../../components/BannerImage";
import Design from "../Courses.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";
import ReactPlayer from "react-player";

function CreateChapter(props) {
  const navigate = useNavigate();
  const courseId = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [chapterNumber, setchapterNumber] = useState();
  const [duration, setDuration] = useState();
  const [video, setVideo] = useState(null); // Added video state
  const [videoTag, setVideoTag] = useState(null); // Added videoTag state for preview

  const [loading, setLoading] = useState(false);

  const onHandleValidation = () => {
    if (!title) {
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

  const handleVideoUpload = async () => {
    if (!video) return;

    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await axios.post(`${BASE_URL}/stream/video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const video_tag = response.data.data.tag;
        const video_path = response.data.data.path;
        setVideoTag(video_tag);
        return { video_tag, video_path };
      }
    } catch (error) {
      console.log("Error uploading video:", error);
      return null;
    }
  };

  const onCreateChapter = async () => {
    setLoading(true);

    const videoData = await handleVideoUpload();

    if (onHandleValidation() && videoData) {
      axios
        .post(`${BASE_URL}/chapter/add`, {
          name: title,
          description: description,
          number: chapterNumber,
          duration: duration,
          course_id: courseId.id,
          video_tag: videoData.video_tag,
          video_path: videoData.video_path,
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Chapter successfully added", "success", true);
            setLoading(false);
            setTimeout(() => {
              navigate(`/courses/info/${courseId.id}`);
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log(error);
        });
    }
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };
  return (
    <div>
      <div className="headerSection">
        <Header title={"Create Chapter"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
          <h5>Title</h5>
          <div className="textInput">
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
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

          <h5>Chapter Number</h5>
          <div className="textInput">
            <input
              value={chapterNumber}
              type="text"
              placeholder="Chapter Number"
              onChange={(e) => {
                setchapterNumber(e.target.value);
              }}
            />
          </div>

          <h5>Video</h5>
          <div className="fileInput">
            
            <input
              type="file"
              accept=".webm"
              id="videoFile"
              onChange={handleVideoChange}
               
            />
          </div>
         

          <span onClick={onCreateChapter}>
            <PrimaryBtn title={"Add"} loading={loading} />
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

export default connect(null, mapDispatchToProps)(CreateChapter);
