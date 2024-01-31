import React from 'react'
import banner from "../images/loginImage.png";
// import logo from "../images/logo.png";
import Design from "./LoginPage.module.css";

export default function LoginBanner() {
  return (
    <div className={Design.loginBannerContainer}>
      <div>
        {/* <img src={logo} alt="logo" className={Design.logo} /> */}
        <h1 className={Design.heading}>Hi, Welcome Back</h1>
        <img src={banner} alt="banner" className={Design.bannerImage} />
      </div>
    </div>
  )
}
