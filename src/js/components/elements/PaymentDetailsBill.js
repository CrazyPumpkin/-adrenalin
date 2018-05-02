
import React from "react";
import styles from "./PaymentDetailsBill.css";
import ManagerContact from 'elements/ManagerContact/ManagerContact';



export default class PaymentDetailsBill extends React.Component {
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
						<p>Информация о доставке</p>
						<p className={styles.description}>Курьерская доставка выполняется транспортной <a>компанией ПЭК</a>.</p>
						<input type="text" placeholder="Город"/>
						<input type="text" placeholder="Индекс"/>
						<input type="text" className={styles.fio} placeholder="Адрес доставки"/>
						<p>Реквизиты</p>
						<input type="text" className={styles.fio} placeholder="Расчетный счет"/>
						<input type="text" className={styles.fio} placeholder="Корреспондирующий счет"/>
						<input type="text" className={styles.fio} placeholder="Банк"/>
					</section>
					<section className={styles.rightSide}>
							<input type="text" className={styles.fio} placeholder="ИНН"/>
							<input type="text" className={styles.fio} placeholder="ОГРНИП"/>
							<input type="text" className={styles.fio} placeholder="ОКВЭД"/>
							<input type="text" className={styles.fio} placeholder="БИК"/>
							<input type="text" className={styles.fio} placeholder="Почтовый адрес"/>
							<input type="text" className={styles.fio} placeholder="Адрес регистрации"/>
							<input type="text" className={styles.fio} placeholder="Интернет-сайт"/>
							<input type="text" className={styles.fio} placeholder="Электронный сайт"/>
					</section>
				</div>
				<div className={styles.footer}>
					<div className={styles.contact}>
						<ManagerContact />
					</div>
					<div className={styles.summ}>
						<span className={styles.button} onClick={() => this.props.setTab('bill')}>Сформировать счет</span>
					</div>
				</div>
			</div>
		);
	}
}
