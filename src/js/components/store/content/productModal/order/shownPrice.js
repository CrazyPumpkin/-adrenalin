import styles from "./price.css";
import React from "react";
import Hint from "./showPriceHint";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    priceList: state.Reducer.priceList
  }
}

@connect(mapStateToProps)
export default class Price extends React.Component {
      constructor(props) {
          super(props);
          // this.getActualPrice = this.getActualPrice.bind(this);
          // this.getNextPrice = this.getNextPrice.bind(this);
      }

      // getActualPrice() {
      //   let price = 0;
      //   for (let [key, value] of Object.entries(this.props.price)){
      //     let next = +key + 1;
      //     let last = this.props.price[this.props.price.length - 1].counter;
      //
      //     if (this.props.count >= value.counter && this.props.count < last) {
      //       price = value.value;
      //     } else if (this.props.count >= last) {
      //       price = this.props.price[this.props.price.length - 1].value;
      //     }
      //   }
      //
      //   return price;
      // }

      // getNextPrice() {
      //   let current = this.props.price.filter((object) => object.value == this.getActualPrice())[0];
      //   let index = this.props.price.indexOf(current);
      //   let next = this.props.price[index+1];
      //   return next;
      // }

      render() {
          return (
              <div className={styles.price_wrap}>
                <span>Цена 1 ед:</span>
                <span className={styles.priceLabel}>{this.props.price} руб</span>
              </div>

          );
      }
}
