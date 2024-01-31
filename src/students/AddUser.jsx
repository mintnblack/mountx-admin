import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import PrimaryBtn from "../components/PrimaryBtn";
import Header from "../components/Header";
import Design from "./AddUser.module.css";


import { SHOW_TOAST } from "../store/actions/toastAction";


function CreateUser(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [loading, setLoading] = useState(false);

  const onCreateUser = () =>{
    console.log("Create User")
  }
  return (
    <div>
      <div className="headerSection">
        <Header title={"Create User"} />
      </div>
      <div className="topMargin">
      <div className={Design.addUserContainer}>
          
          
          <h5>Name</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h5>Email</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <h5>Phone Number</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="+91"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
        


          <span onClick={onCreateUser}>
            <PrimaryBtn title={"Create"} loading={loading} />
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

export default connect(null, mapDispatchToProps)(CreateUser);
