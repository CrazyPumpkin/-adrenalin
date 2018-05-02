
import React from "react";
import styles from "./PaymentDetails.css";
import ManagerContact from 'elements/ManagerContact/ManagerContact';


export default class PaymentDetails extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
      <div className={styles.wrapper}>
					<div className={styles.header}>
						<div>
						<span className={styles.heading}>Оплата</span>
						</div>
					</div>
				<div className={styles.body}>
					<section className={styles.leftSide}>
						<p>Контактные данные</p>
						<input type="text" className={styles.fio} placeholder="Фамилия Имя Отчество"/>
						<input type="text" placeholder="8 (900) 000-00-00"/>
						<input type="text" placeholder="ivanov@mail.ru"/>
						<p>Данные получателя</p>
						<input type="text" className={styles.fio} placeholder="Фамилия Имя Отчество"/>
						<input type="text" placeholder="8 (900) 000-00-00"/>
						<input type="text" placeholder="ivanov@mail.ru"/>
					</section>
					<section className={styles.rightSide}>
						<p>Реквизиты</p>
					</section>
				</div>
				<div className={styles.footer}>
					<div className={styles.contact}>
						<ManagerContact />
					</div>
					<div className={styles.summ}>
						<p>
							<p>Стоимость 3 заказов:</p>
							<p>430 000 руб</p>
						</p>
						<span className={styles.button} onClick={() => this.props.setTab('paymenterror')}>Оплатить</span>
					</div>
				</div>
			</div>
		);
	}
}
