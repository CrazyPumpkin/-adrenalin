import styles from "./App.css";
import React from "react";
import Store from "./store/store";

export default class App extends React.Component {
	render() {
		return (
      <div>
          {this.props.children}
      </div>
		);
	}
}
