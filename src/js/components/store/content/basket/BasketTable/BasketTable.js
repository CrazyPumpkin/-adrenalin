import styles from "./BasketTable.css";
import React from "react";
import Isvg from "react-inlinesvg";
import { connect } from "react-redux";
import BasketItem from "./BasketItem/BasketItem";
import OrderResults from "./OrderResults";
import PaymentModal from "elements/PaymentModal"

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
	return {
		actions: state.actions,
    products: state.Reducer.products,
    basketOrder: state.Reducer.basketOrder
	};
}
function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BasketTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			paymentModalShow: false,
			removeId: -1,
			order: []
		};

		this.openPaymentHandler = this.openPaymentHandler.bind(this);
		this.closePaymentHandler = this.closePaymentHandler.bind(this);
    this.getOrderCounter = this.getOrderCounter.bind(this);
    this.getOrderPrice = this.getOrderPrice.bind(this);
    this.getOrderResults = this.getOrderResult.bind(this);
    this.setResultPrice = this.setResultPrice.bind(this);
		this.countPrintPrice = this.countPrintPrice.bind(this);
		this.setRemoveOrder = this.setRemoveOrder.bind(this);
		this.removeOrder = this.removeOrder.bind(this);
    this.priceVal;
	}
	componentWillMount(){
		this.props.actions.fetchColors('colors');
	}
  getOrderCounter(order) {
    let counter = 0;
    for (let [key, value] of Object.entries(order.sizes)){
      value.forEach((item) => {
        counter += parseInt(item) || 0;
      })
    }
    return counter
	}
	setRemoveOrder(id){
		this.setState({removeId: id});
	}
	removeOrder(id){
		this.props.actions.removeFromBasket(id);
	}
  getOrderPrice(productPrice, order) {
    let price = 0;
    let count = this.getOrderCounter(order);
    for (let [key, value] of Object.entries(productPrice)){
      let next = +key + 1;
      let last = productPrice[productPrice.length - 1].counter;
      if (count >= value.counter && count < last) {
        price = value.value;
      } else if (count >= last) {
        price = productPrice[productPrice.length - 1].value;
      }
    }
    return price;
  }

  getOrderResult(productPrice, order, print) {
    let orderResult = (+this.getOrderPrice(productPrice, order) + +print) * this.getOrderCounter(order);
    return orderResult;
  }
	countPrintPrice(order){
		let summ = 0;

		order.prints.map((item) => (item.size)? summ += Math.round(((item.size[0] * item.size[1]) * item.colors) * 0.005):null);
		//Рассчет стоимости
		return summ;
	}
  setResultPrice(productPrice, order) {
    let orderPrice = this.getOrderResult(productPrice, order);
    this.priceVal += orderPrice;
  }

	openPaymentHandler(order, e) {
		e.stopPropagation();
		order = (order.length)? order : this.props.basketOrder.data.filter((object) => object.status == 2);
	  this.setState({
			order: order,
			paymentModalShow: true
		});
	}

	closePaymentHandler(){
	  this.setState({
			order:[],
			paymentModalShow: false
		});
	}
  render() {
		if(this.props.products.length == 0)
		return (<div>Loading</div>);

    return (
      <div className={styles.table}>
				<div className={styles.search}>
						<input className={styles.input} placeholder={"Введите номер заказа или Email"} type="text"/>
						<div className={styles.button}>Найти</div>
				</div>
				<div className={styles.items}>
					{this.props.basketOrder["data"].map((item, index) =>
							<BasketItem key={item.orderId}
													basketItem={item}
													key={index}
													basketOrder={this.props.basketOrder}
													order={item}
													removeId={this.state.removeId}
													getOrderCounter={this.getOrderCounter}
													getOrderPrice={this.getOrderPrice}
													setRemoveOrder = {this.setRemoveOrder}
													removeOrder = {this.removeOrder}
													countPrintPrice = {this.countPrintPrice}
													getOrderResult={this.getOrderResult}
													setEnumPrice={this.setResultPrice}
													openPaymentHandler={this.openPaymentHandler}
													product={this.props.products.filter((object) => object.id == item.modelId)} />)}
				</div>

				{(this.props.basketOrder["data"].filter((object) => object.status == 2).length > 0)?
					<OrderResults products={this.props.products}
												countPrintPrice ={this.countPrintPrice}
												getOrderCounter={this.getOrderCounter}
												getOrderResult={this.getOrderResult}
												getOrderPrice={this.getOrderPrice}
												openPaymentHandler={this.openPaymentHandler}
												orders={this.props.basketOrder["data"]}
												/>
					:''}
				<PaymentModal modalClose={this.closePaymentHandler} order={this.state.order} modalIsOpen={this.state.paymentModalShow} />
      </div>
    )
  }
}
