import React from "react";
import styles from './OrderListCheck.css'

export default class OrderListCheck extends React.Component {
	constructor(props) {
		super(props);
		this.countSumm = this.countSumm.bind(this);
		this.getOrderCounter = this.getOrderCounter.bind(this);
		this.countOrderSumm = this.countOrderSumm.bind(this);
	}
	componentDidMount(){
		console.log(this.props.order);
		console.log(this.props.products);
	}
	countOrderSumm(order){
		let summ = 0;

		for(let i = 0; i < order.price.length; i++){
			summ += order.price[i].value * order.price[i].quantity;
		}
		return summ;
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
		countSumm(){
	    let summ = 0;
	    this.props.order.map((order) => {
	        for (let i = 0; i < order.price.length; i++) {
	            summ += order.price[i].value * order.price[i].quantity;
	        }
	    });
	    return(summ);
	  }

	render() {
		return (
      <div className={styles.wrapper}>
				<div className={styles.header}>
					Проверьте правильность заказа
				</div>
				<div className={styles.body}>
					{
						this.props.order.map((item, index) => {return(
							<div className={styles.orderWrapper} key={index}>
								<div className={styles.orderHeader}>
									<span>Заказ {item.orderId}</span>
									<span>{ this.countOrderSumm(item) } руб</span>
								</div>
								<div className={styles.orderBody}>
									<div>
										<span>Model {this.props.products.filter((object) => object.id == item.modelId)[0].sex } {this.props.products.filter((object) => object.id == item.modelId)[0].model }</span>
										<span>{this.getOrderCounter(item)} шт</span>
									</div>
									<p className={styles.string}>
										<span className={styles.label}>Цвет изделия</span>
										<p className={styles.colors}>
											{Object.keys(item.sizes).map((color, index) =>
												<span key={index}
													className={styles.color}
													style={{
														background: color,
														borderColor: ((color == 'white')? '#bfbfbf': color),
													}}></span>
											)}
										</p>
									</p>
								</div>
							</div>
						)})
					}
				</div>
				<div className={styles.footer}>
					<span>К оплате: {this.countSumm()} руб</span>
					<span className={styles.button} onClick={() => this.props.setTab('delivery')}>Все верно</span>
				</div>

			</div>
		);
	}
}
