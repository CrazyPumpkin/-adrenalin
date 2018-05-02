import styles from "./../Basket.css";
import React from "react";
import { Link } from "react-router";

export default class Empty extends React.Component {
  render() {
    return (
      <h1>
        Basket is empty. Please go to <Link to="/store/catalog">Store</Link>
      </h1>
    );
  }
}
