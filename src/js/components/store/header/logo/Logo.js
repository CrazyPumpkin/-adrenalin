import styles from "./Logo.css";
import React from "react";

import Img from "./logo.png";

export default class Logo extends React.Component {
	render() {
		return (
                  <a href="#" className={styles.wrap}>
                    <img className={styles.icon} src={Img} />
                    <span className={styles.title}>ADRENALIN</span>
                  </a>
		);
      }
}
