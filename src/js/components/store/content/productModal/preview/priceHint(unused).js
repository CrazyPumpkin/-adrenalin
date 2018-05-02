import styles from "./preview.css";
import React from "react";
import Isvg from "react-inlinesvg";

export default class Hint extends React.Component {
	render() {
		return (
      <span className={styles.previewHint}>
        <Isvg className={styles.icon} src={"./img/info.svg"} />
        Цена зависит от количества футболок.
         <a href="#">Подробнее</a>
      </span>
		);
	}
}
