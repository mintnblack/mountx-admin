import React from 'react';
import emptyImage from "../images/emptyImage.svg"
import Design from "../courses/Courses.module.css";

export default function EmptyEnquiry() {
  return (
    <div className={Design.emptyContainer}>
        <div className={Design.emptySection}>
            <img src={emptyImage} alt="emptyImage" />
            <h3>No Enquires</h3>
            <p>You do not have any enquiries yet.</p>
        </div>
    </div>
  )
}
