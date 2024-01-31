import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Table } from "antd";
// import AppointmentStatus from "./AppointmentStatus";
// import AppointmentDropdown from "./AppointmentDropdown";
import ReactLoading from "react-loading";
import Design from "./Users.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import EditIcon from "../customIcons/EditIcon";


const UsersTable = (props) => {
  const {
    confirmAction,
    action,
    openSnackbar,
    onOpenPopup,
    onCheckBulkDelete,
    tableLoading,
    availableClinics
  } = props;
  const { users } = props;
  console.log(users)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  
  

  const columns = [
    {
      title: "#ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
 
    {
        title: "Edit",
        render: (record) => (
          <a href={`users/edit/${record.id}`} >
        <EditIcon color={'#00000'}  />
          </a>
        ),
      },
  ];
  

  const data = [];

  users.forEach((user) => {
   

    data.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={Design.userTableContainer}>
      <div>
         
        <div className={Design.slidingTable}>
          <Table
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>

      {tableLoading ? (
        <div className={Design.appointmentTableLoading}>
          <div className={Design.loadingScreen}>
            <div className={Design.loadingContainer}>
              <ReactLoading
                type={"spinningBubbles"}
                color={"#5B5EDB"}
                height={150}
                width={150}
              />
              <h1>LOADING...</h1>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
    onOpenPopup: (showPopup, confirmAction, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, action }),
  };
};

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
