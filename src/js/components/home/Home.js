import styles from "./home.css";
import React from "react";
import { Link } from "react-router";

export default class Home extends React.Component {
	render() {
		return (
      <div>
        <h1>This is your Home</h1>
        <Link to="/store/catalog">Магазин</Link>
      </div>
		);
	}
}
