import styles from "./orderTable.css";
import React from "react";

export default class LineItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <td>
        <span className={styles.input}>{this.props.value}</span>
      </td>
		);
	}
}
