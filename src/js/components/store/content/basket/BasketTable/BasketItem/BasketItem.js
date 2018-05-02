import styles from "./BasketItem.css";
import React from "react";
import ColorItem from "./ColorItem";
import { connect } from "react-redux";
import Isvg from "react-inlinesvg";
import { Link } from "react-router";

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { hashHistory} from "react-router";

function mapStateToProps(state) {
	return {
		actions: state.actions,
		colors: state.Reducer.colors
	};
}
function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class BasketItem extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			order: this.props.order
		};
    this.openModalHandler = this.openModalHandler.bind(this);
		this.removeItemHandler = this.removeItemHandler.bind(this);
		this.getCardByStatus = this.getCardByStatus.bind(this);
		this.countSumm = this.countSumm.bind(this);

		this.getFirstColor = this.getFirstColor.bind(this);
		this.getColorIdByName = this.getColorIdByName.bind(this);
		this.getShirtImage = this.getShirtImage.bind(this);
		this.getProductImagesByColorId = this.getProductImagesByColorId.bind(this);
		this.asyncDataReady = this.asyncDataReady.bind(this);
		this.editOrder = this.editOrder.bind(this);
		this.getColorByName = this.getColorByName.bind(this);
		this.setAdditionalColors = this.setAdditionalColors.bind(this);
  }
componentDidMount(){
this.props.countPrintPrice(this.props.order);
}

componentWillReceiveProps(nextProps){
}
getFirstColor(sizes){
	// clear
		for(let i in sizes){
	    return i;
  }
}
editOrder(){
	if(this.props.order.prints.length) return null;
	console.log('РЕДАКТИРОВАТЬ');
	console.log(this.props.order);
	let order = JSON.parse(JSON.stringify(this.props.order))
	let additionalColors = this.setAdditionalColors(order, this.props.colors);

	//Добавление заказа из корзины в текущий
	this.props.actions.saveOrderChanges(order);
	//Костыль Модалка не открывалась автоматически при редиректе после закрытия
	this.props.actions.modalHandler(true, this.props.product);
	//Перенос цветов маек в модалку
	this.props.actions.setAdditionalColors(additionalColors.slice());
	hashHistory.push('/store/catalog/male/000/'+ this.props.order.modelId +'/order');
}
setAdditionalColors(order, colors){
	let shirtColors = [];
	for (var key in order.sizes) {
	  shirtColors.push(this.getColorByName(key, colors));
	}
	return shirtColors;
}
getColorIdByName(name, colors){
	//clear
	let color = colors.find((item) => item.name == name);
	return(color.id);
}
getColorByName(name, colors){
	//clear
	let color = colors.find((item) => item.name == name);
	return(color);
}
getProductImagesByColorId(product, colorId){
	//clear
	return (product.colors.find((item) => item.id == colorId))

}
asyncDataReady(){
	let colors = this.props.product.length;
	let products = this.props.colors.length;

	return (colors && products);
}
getShirtImage(){
	if(!this.asyncDataReady()) return '';

	let colorName = this.getFirstColor(this.props.order.sizes);
	let colorId = this.getColorIdByName(colorName, this.props.colors);
	let productImages = this.getProductImagesByColorId(this.props.product[0], colorId);

	return productImages.front;
}
countSumm(){
	let summ = 0;

	for(let i = 0; i < this.props.order.price.length; i++){
		summ += this.props.order.price[i].value * this.props.order.price[i].quantity;
	}
	return summ;
}

  openModalHandler() {
    this.props.actions.setOrderFromBasket(this.props.order);
    this.props.actions.showOrder(true);
    this.props.actions.modalHandler(true, this.props.product[0]);
  }

	removeItemHandler(e) {
		e.stopPropagation();
    let orderId = this.props.basketOrder["data"].indexOf(this.props.basketItem);
    let basketOrder = this.props.basketOrder["data"];
    basketOrder.splice(orderId, 1);
    let order = {};
    order["data"] = basketOrder;
    this.props.actions.updateBasketOrder(order);
	}
	getCardByStatus(){
		switch (this.props.order.status) {
			case 0:
			//Согласование
					return(
						<div>
							<div className={styles.product_label}>
								<span>Заказ { this.props.order.orderId}</span>
							</div>
							<div className={styles.header}>
								<span>Model { this.props.product[0].sex + ' ' + this.props.product[0].model }</span>
							</div>
							<div className={styles.body}>
								<div className={styles.image}>
									<img src={this.getShirtImage()} alt=""/>
								</div>
								<div className={styles.content}>
									<p className={styles.string}>
										<span className={styles.label}>Количество</span>
										<span className={styles.value}>{this.props.getOrderCounter(this.props.order)} шт</span>
									</p>
									<p className={styles.string}>
										<span className={styles.label}>Цвет изделия</span>
										<p className={styles.colors}>
											{Object.keys(this.props.order.sizes).map((color, index) =>
												<span key={index}
													className={styles.color}
													style={{
														background: color,
														borderColor: ((color == 'white')? '#bfbfbf': color),
													}}></span>
											)}
										</p>
									</p>
									{
										(this.props.order.prints.length)?
										<Link to={'/store/basket/brif/' + this.props.order.orderId}>
										<div className={styles.print}>
											<p>Print (Техническое задание)</p>
											<p className={styles.icon}>
												<Isvg src="./img/note.svg"/>
											</p>
										</div>
									</Link> :''
									}
								</div>
							</div>
							<div className={styles.footer}>
								<p className={styles.status + ' ' + styles.status_agreement}>Согласование</p>
							</div>

						</div>
					);
				break;
				case 1:
				//Подтвердить ТЗ
				return(
					<div>
						<div className={styles.product_label}>
							<span>Заказ { this.props.order.orderId}</span>
						</div>
						<div className={styles.header}>
							<span>Model { this.props.product[0].sex + ' ' + this.props.product[0].model }</span>
						</div>
						<div className={styles.body}>
							<div className={styles.image}>
								<img src={this.getShirtImage()} alt=""/>
							</div>
							<div className={styles.content}>
								<p className={styles.string}>
									<span className={styles.label}>Количество</span>
									<span className={styles.value}>{this.props.getOrderCounter(this.props.order)} шт</span>
								</p>
								<p className={styles.string}>
									<span className={styles.label}>Цвет изделия</span>
									<p className={styles.colors}>
										{Object.keys(this.props.order.sizes).map((color, index) =>
											<span key={index}
												className={styles.color}
												style={{
													background: color,
													borderColor: ((color == 'white')? '#bfbfbf': color),
												}}></span>
										)}
									</p>
								</p>
								{
									(this.props.order.prints.length)?
									<Link to={'/store/basket/brif/' + this.props.order.orderId}>
									<div className={styles.print}>
										<p>Print (Техническое задание)</p>
										<p className={styles.icon}>
											<Isvg src="./img/note.svg"/>
										</p>
									</div>
								</Link> :''
								}
							</div>
						</div>
						<div className={styles.footer}>
							<p className={styles.label}>Сумма к оплате: {this.countSumm()} руб</p>
							<p className={styles.status + ' ' + styles.status_confirm}><Link to={'/store/basket/brif/' + this.props.order.orderId}>Подтвердить ТЗ</Link></p>
						</div>

					</div>
				);
					break;
					case 2:
					//Оплатить
					return(
						<div>
							<div className={styles.product_label}>
								<span>Заказ { this.props.order.orderId}</span>
							</div>
							<div className={styles.header}>
								<span>Model { this.props.product[0].sex + ' ' + this.props.product[0].model }</span>
							</div>
							<div className={styles.body}>
								<div className={styles.image}>
									<img src={this.getShirtImage()} alt=""/>
								</div>
								<div className={styles.content}>
									<p className={styles.string}>
										<span className={styles.label}>Количество</span>
										<span className={styles.value}>{this.props.getOrderCounter(this.props.order)} шт</span>
									</p>
									<p className={styles.string}>
										<span className={styles.label}>Цвет изделия</span>
										<p className={styles.colors}>
											{Object.keys(this.props.order.sizes).map((color, index) =>
												<span key={index}
													className={styles.color}
													style={{
														background: color,
														borderColor: ((color == 'white')? '#bfbfbf': color),
													}}></span>
											)}
										</p>
									</p>
									{
										(this.props.order.prints.length)?
										<Link to={'/store/basket/brif/' + this.props.order.orderId}>
										<div className={styles.print}>
											<p>Print (Техническое задание)</p>
											<p className={styles.icon}>
												<Isvg src="./img/note.svg"/>
											</p>
										</div>
									</Link>  :''
									}
								</div>
							</div>
							<div className={styles.footer}>
								<p className={styles.label + ' ' + styles.label_payment}>Сумма к оплате: {this.countSumm()} руб</p>
								<p className={styles.status + ' ' + styles.status_payment} onClick={(e) => this.props.openPaymentHandler([this.props.order], e)} >Оплатить</p>
							</div>

						</div>
					);
						break;
						case 3:
						//Изготовление
						return(
							<div>
								<div className={styles.product_label}>
									<span>Заказ { this.props.order.orderId}</span>
								</div>
								<div className={styles.header}>
									<span>Model { this.props.product[0].sex + ' ' + this.props.product[0].model }</span>
									<span className={styles.date}>Дата заказа   15.03.2017</span>
								</div>
								<div className={styles.body}>
									<div className={styles.image}>
										<img src={this.getShirtImage()} alt=""/>
									</div>
									<div className={styles.content}>
										<p className={styles.string}>
											<span className={styles.label}>Стоимость заказа</span>
											<span className={styles.value}>{this.countSumm()} руб</span>
										</p>
										<p className={styles.string}>
											<span className={styles.label}>Количество</span>
											<span className={styles.value}>{this.props.getOrderCounter(this.props.order)} шт</span>
										</p>
										<p className={styles.string}>
											<span className={styles.label}>Цвет изделия</span>
											<p className={styles.colors}>
												{Object.keys(this.props.order.sizes).map((color, index) =>
													<span key={index}
														className={styles.color}
														style={{
															background: color,
															borderColor: ((color == 'white')? '#bfbfbf': color),
														}}></span>
												)}
											</p>
										</p>
										{
											(this.props.order.prints.length)?
											<Link to={'/store/basket/brif/' + this.props.order.orderId}>
											<div className={styles.print}>
												<p>Print (Техническое задание)</p>
												<p className={styles.icon}>
													<Isvg src="./img/note.svg"/>
												</p>
											</div>
										</Link> :''
										}
									</div>
								</div>
								<div className={styles.footer}>
									<p className={styles.label}>Статус:</p>
									<p className={styles.status}>Изготовление</p>
								</div>

							</div>
						);
							break;
							case 4:
							//Доставка
							return(
								<div>
									<div className={styles.product_label}>
										<span>Заказ { this.props.order.orderId}</span>
									</div>
									<div className={styles.header}>
										<span>Model { this.props.product[0].sex + ' ' + this.props.product[0].model }</span>
										<span className={styles.date}>Дата заказа   15.03.2017</span>
									</div>
									<div className={styles.body}>
										<div className={styles.image}>
											<img src={this.getShirtImage()} alt=""/>
										</div>
										<div className={styles.content}>
											<p className={styles.string}>
												<span className={styles.label}>Стоимость заказа</span>
												<span className={styles.value}>{this.countSumm()} руб</span>
											</p>
											<p className={styles.string}>
												<span className={styles.label}>Количество</span>
												<span className={styles.value}>{this.props.getOrderCounter(this.props.order)} шт</span>
											</p>
											<p className={styles.string}>
												<span className={styles.label}>Цвет изделия</span>
												<p className={styles.colors}>
													{Object.keys(this.props.order.sizes).map((color, index) =>
														<span key={index}
															className={styles.color}
															style={{
																background: color,
																borderColor: ((color == 'white')? '#bfbfbf': color),
															}}></span>
													)}
												</p>
											</p>
											{
												(this.props.order.prints.length)?
												<Link to={'/store/basket/brif/' + this.props.order.orderId}>
												<div className={styles.print}>
													<p>Print (Техническое задание)</p>
													<p className={styles.icon}>
														<Isvg src="./img/note.svg"/>
													</p>
												</div>
											</Link>  :''
											}
										</div>
									</div>
									<div className={styles.footer}>
										<p className={styles.label}>Статус:</p>
										<p className={styles.status}>Доставка</p>
									</div>
								</div>
							);
								break;
			default:
					return(<div>error, status not found</div>);

		}
	}
  render() {
		return(
			<div className={styles.product} onMouseLeave={() => this.props.setRemoveOrder(-1)}>
				<div className={styles.card + ' ' + ((this.props.order.orderId == this.props.removeId)? styles.card_remove:'') + ' ' + ((!this.props.order.prints.length && (this.props.order.status == 2))? styles.clickable:'') }
							onClick={(!this.props.order.prints.length && this.props.order.status == 2)? this.editOrder: ''}>
					{this.getCardByStatus()}
				</div>
				{(this.props.order.status == 2)?
					<div className={styles.remove}>
						<div onClick={() => this.props.setRemoveOrder(this.props.order.orderId)} className={styles.activate + ' ' + ((this.props.order.orderId == this.props.removeId)? styles.activate_hidden:'')}>×</div>
						<div onClick={() => this.props.removeOrder(this.props.order.orderId)} className={styles.bttnRemove}>
							<Isvg src="./img/dustbin.svg"/>
						</div>
					</div>
				:''}
			</div> );
  }
}
