import React, { useState , useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextEditorContainer from "../../components/TextEditorContainer";
import PrimaryBtn from "../../components/PrimaryBtn";
import BannerImage from "../../components/BannerImage";
import Design from "../Courses.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";

function CreateCourse(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mentor, setMentor] = useState("");
  const [image, setImage] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const [totalChapters, setTotalChapters] = useState();

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    axios.get(`${BASE_URL}/category/all`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!image) {
      props.openSnackbar("Please attach an image", "error", true);
      setLoading(false);
      return false;
    } else if (!title) {
      props.openSnackbar("Please enter title", "error", true);
      setLoading(false);
      return false;
    } else if (!mentor) {
      props.openSnackbar("Please enter Mentor", "error", true);
      setLoading(false);
      return false;
    } else if (!categoryId) {
      props.openSnackbar("Please enter category", "error", true);
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
    else if (!price) {
      props.openSnackbar("Please enter Price", "error", true);
      setPrice(false);
      return false;
    } 
    else if (!rating) {
      props.openSnackbar("Please enter Price", "error", true);
      setRating(false);
      return false;
    } 
    return true;
  };

  const onCreateLeaflet = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .post(`${BASE_URL}/course/add`, {
          name: title,
          description: description,
          category_id: categoryId,
          category_name: categoryName,
          mentor: mentor,
          image: image,
          duration: duration,
          chapters : totalChapters,
          price: price,
          rating: rating
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Course successfully added",
              "success",
              true
            );
            setLoading(false);
            setTimeout(() => {
              navigate("/courses");
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

  return (
    <div>
      <div className="headerSection">
        <Header title={"Create Course"} />
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
          <div className={Design.textArea}>
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
          <h5>Category</h5>
          <div style={{ width: "100%" }} className="textInput">
            <select
              className={Design.selectorInput}
              value={categoryId}
              onChange={(e) => {
                const selectedCategory = categories.find(cat => cat.id === e.target.value);
                setCategoryId(e.target.value);
                setCategoryName(selectedCategory ? selectedCategory.name : "");
              }}
            >
              <option value={""}>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <h5>Mentor</h5>
          <div className="textInput">
            <input
              value={mentor}
              type="text"
              placeholder="Mentor"
              onChange={(e) => {
                setMentor(e.target.value);
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
          <h5>Total Chapters</h5>
          <div className="textInput">
            <input
              value={totalChapters}
              type="text"
              placeholder="Total Chapters"
              onChange={(e) => {
                setTotalChapters(e.target.value);
              }}
            />
          </div>
          <h5>Price</h5>
          <div className="textInput">
            <input
              value={price}
              type="text"
              placeholder="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <h5>Rating</h5>
          <div className="textInput">
            <input
              value={rating}
              type="text"
              placeholder="Rating"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>

          <h5>Banner Image</h5>
          <BannerImage onImageSelected={(value) => setImage(value)} />

          <div>
           
          </div>
          <span onClick={onCreateLeaflet}>
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

export default connect(null, mapDispatchToProps)(CreateCourse);
