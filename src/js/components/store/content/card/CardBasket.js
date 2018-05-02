import styles from "./Card.css";
import React from "react";
import Isvg from "react-inlinesvg";

export default class CardBasket extends React.Component {
	render() {
		return (
                  <div className={styles.basket}>
                    <Isvg className={styles.cart} src={"./img/basket.svg"}/>
                    <span className={styles.counter}><span>{this.props.counter}</span></span>
                  </div>
		);
	}
}
