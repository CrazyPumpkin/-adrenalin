import styles from "./button.css";
import React from "react";
import Isvg from "react-inlinesvg";

export default class Button extends React.Component {
	render() {
		return (
      <a onClick={this.props.handler} className={styles.button + ' ' + (this.props.className !== undefined ? this.props.className : null)}>
        {this.props.icon !== undefined ? <Isvg className={styles.icon} src={this.props.icon} /> : null}
        {this.props.title}
      </a>
		);
	}
}
