import React from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import ArrowDownIcon from "../customIcons/ArrowDownIcon";
import BlogsIcon from "../customIcons/BlogsIcon";
// import logo from "../images/logo.png";
import { getAuth, signOut } from "firebase/auth";
import openMenu from "../images/openMenu.svg";
import Design from "./NavigationBar.module.css";
import Image from "../components/Image";
import NavigationLink from "./NavigationLink";
import {
  ALWAYS_OPEN,
  CLOSE_NAVBAR,
  OPEN_NAVBAR,
} from "../store/actions/navBarActions";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import {
  PRIMARY_COLOR,
  SECONDARY_TEXT_COLOR,
} from "../utils/custom/colorPalette";
import { SHOW_TOAST } from "../store/actions/toastAction";

function NavigationBar(props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const profileImgurl = localStorage.getItem("profileImageUrl");
  const [dashboardColor, setDashboardColor] = useState("#212027");
  const [usersColor, setusersColor] = useState("#212027");
  const [coursesColor, setcoursesColor] = useState("#212027");
  const [categoryColor, setCategoryColor] = useState("#212027");
  const [enquiryColor, setenquiryColor] = useState("#212027");

  const [appoinmentsColor, setAppoinmentsColor] = useState("#212027");
  const [blogsColor, setBlogsColor] = useState("#212027");
  const [leafletsColor, setLeafletsColor] = useState("#212027");
  const [notificationsColor, setNotificationsColor] = useState("#212027");
  const [requestsColor, setRequestsColor] = useState("#212027");
  const [clnicsColor, setClnicsColor] = useState("#212027");
  const [logoutColor, setLogoutColor] = useState("#212027");
  const [contactsColor, setcontactsColor] = useState("#212027");
  const [height, setHeight] = useState(0);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (props.confirmAction && props.action === "logout") {
      signOut(auth)
        .then(() => {
          localStorage.clear();
          window.location.reload();
          navigate(`/auth`);

        })
        .catch((error) => {
          console.log(error);
          props.openSnackbar(
            "Something went wrong. Please try again later.",
            "error",
            true
          );
        });
    } else if (!props.confirmAction && !props.showPopup) {
      setLogout(false);
      setLogoutColor(SECONDARY_TEXT_COLOR);
    }
  }, [props.confirmAction, props.showPopup]);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (path === "/" && !logout) {
      navigate(`/dashboard`);
    }
    if (path.includes("/dashboard") && !logout) {
      setDashboardColor(PRIMARY_COLOR);
      setusersColor("#212027");
      setcoursesColor("#212027");
      setCategoryColor("#212027");
      setenquiryColor("#212027")
;
    } else if (path === "/users" && !logout) {
      setusersColor(PRIMARY_COLOR);
      setDashboardColor("#212027");
      setcoursesColor("#212027");
      setCategoryColor("#212027");
      setenquiryColor("#212027");

    } else if (path === "/courses" && !logout) {
      setCategoryColor("#212027");
      setcoursesColor(PRIMARY_COLOR);
      setDashboardColor("#212027");
      setusersColor("#212027");
      setenquiryColor("#212027");

    }  else if (path === "/category" && !logout) {
      setCategoryColor(PRIMARY_COLOR);
      setcoursesColor("#212027");
      setDashboardColor("#212027");
      setusersColor("#212027");
      setenquiryColor("#212027");
    }  else if(path === "/enquiry" && !logout) {
      setenquiryColor(PRIMARY_COLOR);
      setCategoryColor("#212027");
      setcoursesColor("#212027");
      setDashboardColor("#212027");
      setusersColor("#212027");
    }
  }, [path, logout]);

  const onLogout = () => {
    setLogout(true);
    // setLogoutColor(PRIMARY_COLOR);
    setNotificationsColor("#212027");
    setDashboardColor("#212027");
    setAppoinmentsColor("#212027");
    setBlogsColor("#212027");
    setLeafletsColor("#212027");
    setusersColor("#212027");
    setcontactsColor("#212027");
    props.onOpenPopup(true, false, "logout");
  };

  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  const handlemMediaQueryChanges = () => {
    if (mediaQuery.matches) {
      props.alwaysOpenNavbar(true, false);
    } else if (!mediaQuery.matches && !props.click) {
      props.onCloseNavBar(false, false);
    }
  };

  handlemMediaQueryChanges();
  mediaQuery.addListener(handlemMediaQueryChanges);

  const sideBar = document.querySelector(`.${Design.sideBar}`);
  if (sideBar) {
    if (props.openNavbar) {
      sideBar.style.transform = "translateX(0%)";
    } else if (props.openNavbar && props.click) {
      sideBar.style.transform = "translateX(0%)";
    } else if (!props.openNavbar && !props.click) {
      sideBar.style.transform = "translateX(-100%)";
    }
  }

  const closeNavbar = () => {
    props.onCloseNavBar(false, false);
  };

  const onDisplaySubNavBarList = () => {
    if (height === 0) {
      setHeight(155);
    } else {
      setHeight(0);
    }
  };

  return (
    <div>
      {props.click ? (
        <div className={Design.background} onClick={closeNavbar}></div>
      ) : null}
      {props.openNavbar ? (
        <div className={Design.sideBar}>
          <div className={Design.navigationBar}>
            <div className={Design.navabarLogoContainer}>
              {/* <img className={Design.logo} src={logo} alt="logo" /> */}
              {props.openNavbar && props.click ? (
                <img
                  className={Design.closeNavebarIcon}
                  src={openMenu}
                  alt="X"
                  onClick={closeNavbar}
                />
              ) : null}
            </div>
            {/* navigation links */}
            <span>
              <NavLink
                to="/dashboard"
                style={{ textDecoration: "none" }}
                onClick={closeNavbar}
              >
                <NavigationLink title={"Dashboard"} color={dashboardColor} />
              </NavLink>
              {/* {props.admin === "SUPER_ADMIN" ? ( */}
              <span>
                <NavLink
                  to="/users"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Users"} color={usersColor} />
                </NavLink>
                <NavLink
                  to="/courses"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Courses"} color={coursesColor} />
                </NavLink>
                <NavLink
                  to="/category"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Category"} color={categoryColor} />
                </NavLink>
                <NavLink
                  to="/enquiry"
                  style={{ textDecoration: "none" }}
                  onClick={closeNavbar}
                >
                  <NavigationLink title={"Enquiry"} color={enquiryColor} />
                </NavLink>
                {/* <NavLink to="/appointments" style={{ textDecoration: "none" }} onClick={closeNavbar}>
                  <NavigationLink
                    title={"Appointments"}
                    color={appoinmentsColor}
                  />
                </NavLink> */}

                {/* <div onClick={onDisplaySubNavBarList}>
                  <div className={Design.navlink} style={{"backgroundColor": blogsColor}}>
                    <div className={Design.navLinkContent}>
                        <BlogsIcon color={"#fff"} />
                      <p

                        className={Design.navlinkName}
                      >
                        Resources
                      </p>
                      <ArrowDownIcon color={"#fff"} />
                    </div>
                  </div>
                </div>

                <ul onClick={onDisplaySubNavBarList} className={Design.navbarSublist} style={{ height: `${height}px`, visibility: height ===0 ? "hidden" : "visible" }}>
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/leaflets"
                      style={{ textDecoration: "none"}}
                    >
                      <p style={{color: "#fff"}}>
                      Patient leaflets
                      </p>
                    </NavLink>
                  </li>
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/blogs"
                      style={{ textDecoration: "none"}}
                    >
                      <p style={{color: "#fff"}}>Blog</p>
                    </NavLink>
                  </li>
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/videos"
                      style={{ textDecoration: "none"}}
                    >
                      <p style={{color: "#fff"}}>Video Lectures</p>
                    </NavLink>
                  </li>
                  <li onClick={closeNavbar}>
                    <NavLink
                      className={Design.navbarSublistLink}
                      to="/links"
                      style={{ textDecoration: "none"}}
                    >
                      <p style={{color: "#fff"}}>External Links</p>
                    </NavLink>
                  </li>
                </ul>

                <NavLink to="/feedbacks" style={{ textDecoration: "none" }} onClick={closeNavbar}>
                  <NavigationLink title={"Feedbacks"} color={feedbacksColor} />
                </NavLink>

                <NavLink to="/clinics" style={{ textDecoration: "none" }} onClick={closeNavbar}>
                  <NavigationLink title={"Clinics"} color={clnicsColor} />
                </NavLink>

                <NavLink to="/contacts" style={{ textDecoration: "none" }} onClick={closeNavbar}>
                  <NavigationLink title={"Enquiries"} color={contactsColor} />
                </NavLink> */}

                {/* <NavLink to="/notifications" style={{ textDecoration: "none" }}>
                    <NavigationLink title={"Notifications"} color={notificationsColor} />
                  </NavLink> */}
              </span>
              {/* ) : null} */}
              <span onClick={onLogout}>
                <NavigationLink title={"Logout"} color={"#212028"} />
              </span>
            </span>

            <div style={{ height: "100px" }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
    showPopup: state.popupReducer.showPopup,
    openNavbar: state.navBarReducer.openNavbar,
    click: state.navBarReducer.click,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenNavBar: (openNavbar, click) =>
      dispatch({ type: OPEN_NAVBAR, openNavbar, click }),
    alwaysOpenNavbar: (openNavbar, click) =>
      dispatch({ type: ALWAYS_OPEN, openNavbar, click }),
    onCloseNavBar: (openNavbar, click) =>
      dispatch({ type: CLOSE_NAVBAR, openNavbar, click }),
    onOpenPopup: (showPopup, confirmAction, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, action }),
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
