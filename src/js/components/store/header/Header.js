import styles from "./Header.css";
import React from 'react';
import Logo from './logo/Logo';
import Basket from './basket/Basket'
import { connect } from "react-redux";
import { Link } from "react-router";

function headState(state) {
  return {
    basketOrder: state.Reducer.basketOrder,
    params: state.routerParams
  }
}

@connect(headState)
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getOrderCounter = this.getOrderCounter.bind(this);
    this.getPageTitle = this.getPageTitle.bind(this);
  }

  componentDidMount() {
    this.getOrderCounter();
  }
  
  componentWillUpdate() {
    this.getOrderCounter();
  }

  getPageTitle() {
    switch (this.props.page){
      case "catalog":
        return "Каталог";
        break;
      case "basket":
        return "Корзина";
        break;
      case ":orderId":
        return ("Заказ " + this.props.params.params.orderId + " (счет-договор)")
        break;
      case "agreement":
        return "Соглашение";
        break;
      case "contacts":
        return "Контакты";
        break;
      case "delivery":
        return "Доставка";
        break;
      case "payment":
        return "Оплата";
        break;
      default:
        return "Каталог"
    };
  }

  getOrderCounter() {
    let counter = 0;
    let order = this.props.basketOrder["data"];
    order.map((item) => {
      for (let [key, color] of Object.entries(item.sizes)) {
          color.forEach((item) => {
            counter += parseInt(item) || 0;
          })
      }
    })
    return counter;
  }

  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.title}>{this.getPageTitle()}</h3>
          {this.getOrderCounter() !== 0 ?
            <Link to='/store/basket' className="cart">
            <Basket/>
            </Link>
            : null}
          <Logo />
        </header>
      </div>

    );
  }
}
