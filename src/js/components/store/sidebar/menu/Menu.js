import styles from "./../Sidebar.css";
import React from "react";
import { Link } from "react-router";
import SideBarBasket from 'store/sidebar/basket/basket';
import { TransitionMotion, spring } from "react-motion";
import { connect } from "react-redux";
import Isvg from "react-inlinesvg";
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import homeIcon from './img/home.svg';
import catalogIcon from './img/catalog.svg';
import cartIcon from './img/cart.svg';
import agreementIcon from './img/agreement.svg';
import contactsIcon from './img/contacts.svg';
import deliveryIcon from './img/delivery.svg';
import paymentIcon from './img/payment.svg';

function mapStateToProps(state) {
  return {
    basketOrder: state.Reducer.basketOrder,
    routerParams: state.routerParams,
    sidebarActive: state.Reducer.sidebarActive
  }
}

function mapDispatchToProps(dispatch) {
	return {
    push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Menu extends React.Component {
	constructor(props){
		super(props)
		this.getOrderCounter = this.getOrderCounter.bind(this);
    this.getActiveRoute = this.getActiveRoute.bind(this);
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

  getActiveRoute(link) {
    if (this.props.routerParams.location.pathname.indexOf(link) !== -1) {
      return true;
    } else {
      return false;
    }
  }

	render() {
		return (
      <div className={styles.menuBar + " " + (this.props.sidebarActive ? styles.menuBar_active : "")}>
        <ul className={styles.list}>
          <li>
            <Link to='/' activeClassName="" className={styles.link}>
  						<Isvg className={styles.icon} src={homeIcon}/>
  						Главная
					  </Link>
          </li>
          <li>
            <Link to='/store/catalog' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('/store/catalog') ? 'active' : "")}>
  						<Isvg className={styles.icon} src={catalogIcon}/>
  						Каталог
					  </Link>
          </li>
					<li>
            <Link to='/store/basket' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('/store/basket') ? "active" : "")}>
  						<Isvg className={styles.icon} src={cartIcon}/>
  						Корзина
  						{this.getOrderCounter() > 0 ? <SideBarBasket/> : null}
  					</Link>
          </li>
        </ul>

        <ul className={styles.list}>
          <li>
            <Link to='/store/information/agreement' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('agreement') ? 'active' : "")}>
              <Isvg className={styles.icon} src={agreementIcon}/>
              Соглашение
            </Link>
          </li>
          <li>
            <Link to='/store/information/payment' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('payment') ? "active" : "")}>
              <Isvg className={styles.icon} src={paymentIcon}/>
              Оплата
            </Link>
          </li>
          <li>
            <Link to='/store/information/delivery' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('delivery') ? "active" : "")}>
              <Isvg className={styles.icon} src={deliveryIcon}/>
              Доставка
            </Link>
          </li>
          <li>
            <Link to='/store/information/contacts' onClick={this.props.menuHandler} className={styles.link + " " + (this.getActiveRoute('contacts') ? "active" : "")}>
              <Isvg className={styles.icon} src={contactsIcon}/>
              Контакты
            </Link>
          </li>
        </ul>
      </div>
		);
	}
}
