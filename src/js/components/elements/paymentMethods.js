import React from "react";
import styles from './PaymentMethods.css'

import imgMasterCard from './img/mastercard.png';
import imgVisa from './img/visa.png'
import imgBill from './img/bill.png'




export default class PaymentMethods extends React.Component {
	constructor(props) {
		super(props);
		this.setMethod = this.setMethod.bind(this);
	}
	setMethod(tab){
		this.props.setTab(tab)
	}
	render() {
		return (
      <div className={styles.wrapper}>
				<div className={styles.header}>
					Выберите способ оплаты
				</div>
				<div className={styles.body}>
					<div className={styles.paymentMethodsList}>
						<div onClick={() => this.setMethod('paymentdetails')} className={styles.paymentMethodsItem}>
							<img src={imgMasterCard} alt=""/>
							<img src={imgVisa} alt=""/>
							<div className={styles.label}>Банковские карты</div>
						</div>
						<div onClick={() => this.setMethod('paymentdetailsbill')} className={styles.paymentMethodsItem}>
							<img src={imgBill} alt=""/>
							<div className={styles.label}>Выставить счет</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
