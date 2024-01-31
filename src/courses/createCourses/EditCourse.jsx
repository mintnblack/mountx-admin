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

function EditPatientLeaflets(props) {
  const { id: courseId } = useParams();
console.log(courseId)
  const navigate = useNavigate();

  const [name, setName] = useState("");
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

  useEffect(() => {
    console.log(courseId)
    axios
      .get(`${BASE_URL}/course/${courseId}`)
      .then((response) => {
        console.log(response)
        setName(response.data.data.name);
        setCategoryId(response.data.data.category_id);
        setCategoryName(response.data.data.category_name);
        setMentor(response.data.data.mentor);
        setDescription(response.data.data.description);
        setDuration(response.data.data.duration);
        setPrice(response.data.data.price);
        setImage(response.data.data.image);
        setRating(response.data.data.rating);
        setTotalChapters(response.data.data.chapters)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!image) {
      props.openSnackbar("Please attach an image", "error", true);
      setLoading(false);
      return false;
    } else if (!name) {
      props.openSnackbar("Please enter Name", "error", true);
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

  const onUpdateCourse = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .put(`${BASE_URL}/course/${courseId}`, {
          name: name,
          description: description,
          category_id: categoryId,
          category_name: categoryName,
          mentor: mentor,
          image: image,
          duration: duration,
          price: price,
          rating: rating,
          chapters : totalChapters

        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Course Updated successfully",
              "success",
              true
            );
            setLoading(false);
            setTimeout(() => {
              navigate("/courses");
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
        <Header title={"Update Course"} />
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
          </div><h5>Rating</h5>
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
          <BannerImage existingImage={image} onImageSelected={(value) => setImage(value)} />
          <span onClick={onUpdateCourse}>
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

export default connect(null, mapDispatchToProps)(EditPatientLeaflets);
