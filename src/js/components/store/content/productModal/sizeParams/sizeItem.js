import styles from "./sizeParams.css";
import React from "react";

export default class sizeItem extends React.Component {
	render() {
		return (
	    <tr className={styles.column}>
				<td className={styles.rowTitle}>{this.props.size.title}</td>
				{this.props.size.params.map((item, index) => <td key={index}>{item}</td>)}
			</tr>
		);
	}
}
