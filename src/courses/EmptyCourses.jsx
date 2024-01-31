import React from 'react';
import emptyImage from "../images/emptyImage.svg"
import Design from "./Courses.module.css";

export default function EmptyPatientLeaflets() {
  return (
    <div className={Design.emptyContainer}>
        <div className={Design.emptySection}>
            <img src={emptyImage} alt="emptyImage" />
            <h3>No Courses</h3>
            <p>You haven't created any Courses yet.</p>
        </div>
    </div>
  )
}
