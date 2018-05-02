import styles from "./Brif.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import Preview from "./preview/modalpreview"
import OrderTable from "./ordertable/orderTable"
import Print from "./print/print"
import Price from "./price/price"
import ManagerContact from 'elements/ManagerContact/ManagerContact';
import { push } from 'react-router-redux';

import { hashHistory} from "react-router";
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
// import t2 from 'elements/img/2.jpg';

function mapStateToProps(state) {
	return {
		basketOrder: state.Reducer.basketOrder,
    products: state.Reducer.products,
    colors: state.Reducer.colors,
		actions: state.actions
	};
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
		push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Brif extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      order: this.props.basketOrder.data.find((item) => this.props.params.orderId == item.orderId),
			sendMessage: false
    };
		this.setOrderState = this.setOrderState.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.showMessageInput = this.showMessageInput.bind(this);
	}
	componentDidMount(){
		console.log(this.state.order);
	}
  componentWillReceiveProps(nextProps){
    let productIndex = nextProps.products.findIndex((item) => item.id == this.state.order.modelId);
    this.setState({product: nextProps.products[productIndex]});
  }
	setOrderState(stateId){
		let order = this.props.basketOrder;
		let index = order.data.findIndex((item) => item.orderId == this.state.order.orderId);
		order.data[index].status = stateId;
		this.props.actions.updateBasketOrder(order);
		console.log(order);
	}
	showMessageInput(){
		this.setState({sendMessage: true});
	}

	sendMessage(){
		this.setOrderState(0);
		hashHistory.push('/store/basket/');
	}
	render() {

    if( (typeof(this.state.product) == "undefined" || !Object.keys(this.state.product).length) || !this.props.colors.length || !this.state.order.orderId)
    return( <div>Loading</div> );
		return (
			<div className={styles.brif}>
				<div className={styles.sizesSection}>
          <div className={styles.header}>
          Model {
						this.props.products.find((item) => item.id == this.state.order.modelId).sex + ' ' +
						this.props.products.find((item) => item.id == this.state.order.modelId).model
					}
          </div>
          <div className={styles.preview}>
            <Preview product={this.state.product} colors={this.props.colors} order={this.state.order}/>
          </div>
          <div className={styles.sizes}>
            <OrderTable product={this.state.product} colors={this.props.colors} order={this.state.order}/>
          </div>
        </div>
				<Print order={this.state.order} shirtPrintParams={this.state.product.areas} />

				{/* До конца согласования не показываем стоимость */
					(this.state.order.status != 0)?
					<Price order={this.state.order} />
					:''
				}
				{
					(this.state.sendMessage)?
					(
						<textarea className={styles.textInput} placeholder={'Какие коррективы Вы хотели бы внести в тех. задание?'}></textarea>
					
					):''
				}
				<div className={styles.footer}>
					<div className={styles.contact}>
						<ManagerContact />
					</div>
				{
					(this.state.sendMessage)?
					<span onClick={this.sendMessage} className={styles.button + ' ' + styles.button_cancel}>Отправить</span>
					:
					/* Если статус заказа "Подтвердить ТЗ", то кнопки подтверждения и возврата в корзину */
						(this.state.order.status == 1)?
						<span>
							<span onClick={this.showMessageInput} className={styles.button + ' ' + styles.button_cancel}>Не подтверждаю</span>
							<Link to='/store/basket' onClick={() => this.setOrderState(2)} className={styles.button + ' ' + styles.button_accept}>Подтверждаю</Link>
						</span>
						:
						/* Если нет, то кнопка возврата в корзину */
							<Link to='/store/basket' className={styles.button + ' ' + styles.button_accept}>Назад</Link>
				}
				</div>
			</div>
		);
	}
}
