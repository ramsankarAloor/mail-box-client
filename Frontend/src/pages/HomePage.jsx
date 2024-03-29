import React from "react";
import ComposeMail from "../components/ComposeMail";
import styles from './HomePage.module.css'
function HomePage() {
  return (
    <div className={`container ${styles['full-size']}`}>
        <ComposeMail />
    </div>
  );
}

export default HomePage;
