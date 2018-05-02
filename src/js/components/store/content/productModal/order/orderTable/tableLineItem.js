import styles from "./orderTable.css";
import React from "react";

export default class LineItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <td >
        <input type="text" value={this.props.value} onChange={(e) => this.props.valueChangeHandler(e, this.props.index)} className={styles.input}/>
      </td>
		);
	}
}
