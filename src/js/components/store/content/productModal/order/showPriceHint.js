import styles from "./order.css";
import React from "react";

export default class Hint extends React.Component {
  render() {
    return (
      <span className={styles.hintDescription}>
          <strong>*{this.props.price.value} руб</strong> при заказе от {this.props.price.counter} шт
      </span>
    )
  }
}
