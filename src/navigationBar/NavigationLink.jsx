import React from "react";
import Design from "./NavigationBar.module.css";
import DashboardIcon from "../customIcons/DashboardIcon";
import UsersIcon from "../customIcons/UsersIcon";
import BlogsIcon from "../customIcons/BlogsIcon";
import LeafletsIcon from "../customIcons/LeafletsIcon";
import FeedbacksIcon from "../customIcons/FeedbacksIcon";
import NotificationsIcon from "../customIcons/NotificationsIcon";
import ClinicIcon from "../customIcons/ClinicIcon";
import AppointmentRequestIcon from "../customIcons/AppointmentRequestIcon";
import ContactsIcon from "../customIcons/ContactsIcon";
import LogoutIcon from "../customIcons/LogoutIcon";
import CoursesIcon from "../customIcons/CoursesIcon";

export default function NavigationLink(props) {
    const { title, color } = props;
    let iconComponent;
    if (title === "Dashboard") {
      iconComponent = <DashboardIcon color={"#ffffff"} />;
    } else if (title === "Users") {
      iconComponent = <UsersIcon color={"#ffffff"} />;
    }  else if (title === "Courses") {
      iconComponent = <CoursesIcon color={"#ffffff"} />;
    }  else if (title === "Category") {
      iconComponent = <CoursesIcon color={"#ffffff"} />;
    }  else if (title === "Enquiry") {
      iconComponent = <ContactsIcon color={"#ffffff"} />;}
    // } else if (title === "Resources") {
    //   iconComponent = <BlogsIcon color={"#ffffff"} />;
    // } else if (title === "Patient leaflets") {
    //   iconComponent = <LeafletsIcon color={"#ffffff"} />;
    // } else if (title === "Notifications") {
    //   iconComponent = <NotificationsIcon color={"#ffffff"} />;
    // }else if (title === "Feedbacks") {
    //   iconComponent = <FeedbacksIcon color={"#ffffff"}/>;
    // }else if (title === "Clinics") {
    //   iconComponent = <ClinicIcon color={"#ffffff"} />;
    // }else if (title === "Enquiries") {
    //   iconComponent = <ContactsIcon color={"#ffffff"} />;
    // }
    else if (title === "Logout") {
      iconComponent = <LogoutIcon color={"#ffffff"} />;
    }
  
    return (
      <div className={Design.navlink} style={{"backgroundColor": color}}>
        <div className={Design.navLinkContent}>
          {iconComponent}
          <p className={Design.navlinkName}>{title}</p>
        </div>
      </div>
    );
}