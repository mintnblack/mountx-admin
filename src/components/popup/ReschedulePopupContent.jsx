import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { PRIMARY_COLOR } from "../../utils/custom/colorPalette";
import Design from "./Popup.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";

function ReschedulePopupContent(props) {
  const { handleClose, confirmAction, appointmentId, openSnackbar } = props;
  const [appointmentInfo, setAppointmentInfo] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clinicList, setClinicList] = useState([]);
  const [timeSlot, setTimeSlot] = useState();
  const [timeslotId, setTimeslotId] = useState();
  const [clinicName, setClinicName] = useState();
  const [clinicId, setClinicId] = useState();
  const [appointmentDate, setAppointmentDate] = useState();
  const [clinicDays, setClinicDays] = useState([]);
  const [rescheduledDate, setRescheduledDate] = useState();
  const [rescheduledSlot, setRescheduledSlot] = useState();
  const [rescheduledSlotId, setRescheduledSlotId] = useState();

  const onHandleValidation = () => {
    if (clinicName === undefined || clinicName === "" || clinicName === null) {
      openSnackbar("Please select a clinic", "error", true);
      return false;
    } else if (clinicId === undefined || clinicId === "" || clinicId === null) {
      openSnackbar("Please select a clinic", "error", true);
      return false;
    } else if (
      appointmentDate === undefined ||
      appointmentDate === "" ||
      appointmentDate === null
    ) {
      openSnackbar("Please select a date", "error", true);
      return false;
    } else if (timeSlot === undefined || timeSlot === "" || timeSlot === null) {
      openSnackbar("Please select a time slot", "error", true);
      return false;
    } else if (
      timeslotId === undefined ||
      timeslotId === "" ||
      timeslotId === null
    ) {
      openSnackbar("Please select a time slot", "error", true);
      return false;
    }

    return true;
  };

  const onRescheduleAppointment = () => {
    if (onHandleValidation()) {
      const data = {
        clinic: clinicName,
        clinic_id: clinicId,
        date: appointmentDate,
        email: appointmentInfo.email,
        name: appointmentInfo.name,
        phone: appointmentInfo.phone,
        status: "rescheduled",
        timeslot: timeSlot,
        timeslot_id: timeslotId,
        rescheduled_date: rescheduledDate,
        rescheduled_slot: rescheduledSlot,
        rescheduled_slot_id: rescheduledSlotId
      };

      // create put api with this url https://nslondon.onrender.com/appointment/scheduled/reschedule/{id}

      axios
        .put(`${BASE_URL}/appointment/scheduled/reschedule/${appointmentId}`, data)
        .then((response) => {
          confirmAction();
          handleClose();
          openSnackbar("Appointment rescheduled successfully", "success", true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            props.openSnackbar(
              "Appointment could not be rescheduled",
              "error",
              true
            );
          }, 3000);
        });
      }
     
  };

  const onSelectTimeSlot = (e) => {
    setRescheduledSlotId(e.target.value);
    timeSlots?.map((item) => {
      if (item.id === e.target.value) {
        setRescheduledSlot(item.timeslot);
      }
    });
  };

  const onSelectClinic = (e) => {
    setClinicId(e.target.value);
    clinicList?.map((item) => {
      if (item.id === e.target.value) {
        setClinicName(item.name);
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/appointment/${appointmentId}`)
      .then((response) => {
        setClinicName(response.data.data.clinic);
        setAppointmentInfo(response.data.data);
        setAppointmentDate(response.data.data.date);
        setRescheduledDate(response.data.data.date);
        setClinicId(response.data.data.clinic_id);
        setTimeslotId(response.data.data.timeslot_id);
        setRescheduledSlotId(response.data.data.timeslot_id);
        setTimeSlot(response.data.data.timeslot);
        setRescheduledSlot(response.data.data.timeslot);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/clinic`)
      .then((response) => {
        setClinicList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {

    if(clinicId){
    axios
      .get(`${BASE_URL}/day/{clinic_id}?id=${clinicId}`)
      .then((response) => {
        setClinicDays(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [clinicId]);

  const getAllTimesSlots = () => {
    axios
      .get(`${BASE_URL}/timeslot/?clinic=${clinicId}&date=${appointmentDate}`)
      .then((response) => {
        setTimeSlots(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if(appointmentInfo || clinicId || rescheduledDate){
      getAllTimesSlots();
    }
  }, [appointmentInfo, clinicId, appointmentDate, rescheduledDate]);

  return (
    <div className={Design.SchedulePopup}>
      <DialogTitle id="alert-dialog-title">
        {"Reschedule an appointment"}
      </DialogTitle>

      <div className={Design.scheduledAppointment}>
        <p>Clinic Name</p>
        <select
          className={Design.select}
          id="clinics"
          name="clinics"
          onChange={onSelectClinic}
        >
          {clinicList?.map((item) => {
            return (
              <option value={item.id} selected={item.id === clinicId}>
                {item.name}
              </option>
            );
          })}
        </select>
        <p className={Design.workingDaysPTage}>
          Working Days:
          {clinicDays?.map((item) => {
            return (
              <span>
                {"  "}
                {item.day},{" "}
              </span>
            );
          })}
        </p>
        <p>Appointment Date</p>
        <div className="textInput">
          <input
            style={{ width: "calc(100% - 10px)" }}
            type="date"
            className={Design.select}
            min={appointmentInfo.date}
            value={rescheduledDate}
            name="date"
            onChange={(e) => {
              setRescheduledDate(e.target.value);
            }}
          ></input>
        </div>
        <p>Select Timeslot</p>

        <select
          className={Design.select}
          id="timeslots"
          name="timeslots"
          onChange={onSelectTimeSlot}
        >
          {timeSlots?.map((item) => {
            if (item.status === 0) {
              return (
                <option value={item.id} selected={item.id === rescheduledSlotId}>
                  {item.timeslot}
                </option>
              );
            }
          })}
        </select>
      </div>

      <DialogActions>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={onRescheduleAppointment}
        >
          YES
        </Button>
        <Button
          sx={{ color: PRIMARY_COLOR, boxShadow: "none" }}
          onClick={handleClose}
          autoFocus
        >
          NO
        </Button>
      </DialogActions>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(ReschedulePopupContent);
