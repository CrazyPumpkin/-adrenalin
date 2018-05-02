import styles from "./Card.css";
import React from 'react';
import { connect } from 'react-redux';
import CardBasket from './CardBasket';
import { Link } from 'react-router';

function loadCardState(state) {
  return {
    products: state.Reducer.products,
    // basketOrder: state.Reducer.basketOrder
  };
}

@connect(loadCardState)
export default class Card extends React.Component {
  constructor(props) {
      super(props);
      this.getCurrentColor = this.getCurrentColor.bind(this);
      // this.getBasketCounter = this.getBasketCounter.bind(this);
      this.getPrice = this.getPrice.bind(this);
  }

  getCurrentColor() {
    // console.log(this.props);
    let result = this.props.product.colors.filter(( obj ) => {
      return obj.id == this.props.params.color;
    });
    return result;
  }

  // getBasketCounter() {
  //   let id = this.props.product.id;
  //   let counter = 0;
  //   let order = this.props.basketOrder["data"];
  //   order.forEach((item) => {
  //     if (item.modelId == id) {
  //       for (let [key, model] of Object.entries(item.sizes)) {
  //         model.forEach((item) => {
  //           counter += parseInt(item) || 0;
  //         })
  //       }
  //     }
  //   })
  //   // order.map((item) => {
  //   //   let cardOrder = item[id];
  //   //   if(cardOrder !== undefined) {
  //   //     for (let [key, model] of Object.entries(cardOrder.shirts)) {
  //   //       model.forEach((item) => {
  //   //         counter += parseInt(item) || 0;
  //   //       })
  //   //     }
  //   //   }
  //   // })
  //   return counter;
  // }

  getPrice() {
    let fifth = this.props.product.price.filter((object) => object.counter == "50")[0].value;
    return fifth;
  }

  handleClick(product, counter){
    this.props.handlerClick(product, counter);
  }

  render() {
    return (
      <Link to={'/store/catalog/' + this.props.params.sex + '/' + this.props.params.color + '/' + this.props.product.id} onClick={this.handleClick.bind(this, this.props.product, 0)} className={styles.item}>
        <div className={styles.short_wrap}>
          <img className={styles.short} src={this.getCurrentColor()[0].front}/>
        </div>
        <div className={styles.info}>
          <span className={styles.title}>
            <span>{this.props.product.model}</span>
            {/*this.getBasketCounter() > 0 ? <CardBasket counter={this.getBasketCounter()}/> : null*/}
          </span>
          <div className={styles.price}>
            <span>{this.getPrice()} руб <sub>*</sub></span>
            <small>*цена за ед. при покупке от 50 шт.</small>
          </div>
        </div>
      </Link>
    );
  }
}
