import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../components/Header";

import { SHOW_TOAST } from "../store/actions/toastAction";

import { useParams } from "react-router-dom";

function EditUser(props) {
    const { id } = useParams();

  return (
    <div>
      <div className="headerSection">
        <Header title={"Create User"} />
      </div>
      <div className="topMargin">
        <p>{id}</p>
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

export default connect(null, mapDispatchToProps)(EditUser);
