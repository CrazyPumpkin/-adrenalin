
import React from "react";
import styles from "./delivery.css";
import iconSearch from "./img/search.svg";
import Isvg from "react-inlinesvg";
import ManagerContact from 'elements/ManagerContact/ManagerContact';


export default class Delivery extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isOpened:false
		};
		this.openList = this.openList.bind(this);
		this.countDelivery = this.countDelivery.bind(this);
	}
	countDelivery(){
		this.openList()
	}
	openList(){
		this.setState({isOpened:true});
	}
	render() {
		return (
      <div className={styles.wrapper + ' ' + ((this.state.isOpened)? styles.wrapper_opened:'')}>
				<div className={styles.params}>
					<div className={styles.header}>
						<div>
						<span className={styles.heading}>Доставка</span>
						<div className={styles.size}>
							<span className={styles.label}>Габариты груза, см </span>
							<span className={styles.value}>35x60x50</span>
						</div>
						<div className={styles.volume}>
							<span className={styles.label}>Объем груза, м</span>
							<span className={styles.value}> 2</span>
						</div>
						<div className={styles.weight}>
							<span className={styles.label}>Вес груза </span>
							<span className={styles.value}>30</span>
						</div>
						</div>
					</div>
					<div className={styles.body}>
						<div className={styles.address}>
							<span className={styles.label}>Куда</span>
							<span className={styles.city}>
								<input placeholder="Батайск, Ростовская область 346880" type="text"/>
								<span className={styles.search}><Isvg src={iconSearch}/></span>
							</span>
							<span className={styles.house}>
								<input placeholder="Адрес назначения" type="text"/>
							</span>
						</div>
						<div className={styles.type}>
							<span className={styles.radio}>Самостоятельно забрать груз с терминала</span>
							<span className={styles.radio}>Доставить груз до адреса получателя</span>
						</div>
						<div className={styles.service}>
							<span className={styles.checkbox}>Упаковать в жесткую пленку</span>
							<span className={styles.checkbox}>Пломбировка груза</span>
							<span className={styles.checkbox}>Страхование груза</span>
						</div>
						<div className={styles.count}>
							<span className={styles.button}onClick={this.countDelivery}>Рассчитать</span>
						</div>
					</div>
				</div>
				<div className={styles.service}>
					<div className={styles.serviceList}>
						<div className={styles.serviceItem}>
							<div className={styles.header}>
								<div className={styles.title}>Транспортная компания</div>
							</div>
							<div className={styles.body}>
								<div className={styles.type}>
									<span className={styles.radio}>ПЭК</span>
									<span className={styles.radio}>Деловые линии</span>
								</div>
								<div className={styles.description}>
									Срок передачи товара в приемный пункт ТК – 1-3 дня с момента зачисления оплаты по заказу на счет Продавца.
									Ориентировочный срок поставки – 2-5 суток в зависимости от региона получателя.
								</div>
								<div className={styles.price}>7500 руб</div>
							</div>
						</div>
						<div className={styles.serviceItem}>
							<div className={styles.header}>
								<div className={styles.title}>Транспортная компания</div>
							</div>
							<div className={styles.body}>
								<div className={styles.type}>
									<span className={styles.radio}>ПЭК</span>
									<span className={styles.radio}>Деловые линии</span>
								</div>
								<div className={styles.description}>
									Срок передачи товара в приемный пункт ТК – 1-3 дня с момента зачисления оплаты по заказу на счет Продавца.
									Ориентировочный срок поставки – 2-5 суток в зависимости от региона получателя.
								</div>
								<div className={styles.price}>7500 руб</div>
							</div>
						</div>
						<div className={styles.serviceItem}>
							<div className={styles.header}>
								<div className={styles.title}>Транспортная компания</div>
							</div>
							<div className={styles.body}>
								<div className={styles.type}>
									<span className={styles.radio}>ПЭК</span>
									<span className={styles.radio}>Деловые линии</span>
								</div>
								<div className={styles.description}>
									Срок передачи товара в приемный пункт ТК – 1-3 дня с момента зачисления оплаты по заказу на счет Продавца.
									Ориентировочный срок поставки – 2-5 суток в зависимости от региона получателя.
								</div>
								<div className={styles.price}>7500 руб</div>
							</div>
						</div>
						<div className={styles.serviceItem}>
							<div className={styles.header}>
								<div className={styles.title}>Транспортная компания</div>
							</div>
							<div className={styles.body}>
								<div className={styles.type}>
									<span className={styles.radio}>ПЭК</span>
									<span className={styles.radio}>Деловые линии</span>
								</div>
								<div className={styles.description}>
									Срок передачи товара в приемный пункт ТК – 1-3 дня с момента зачисления оплаты по заказу на счет Продавца.
									Ориентировочный срок поставки – 2-5 суток в зависимости от региона получателя.
								</div>
								<div className={styles.price}>7500 руб</div>
							</div>
						</div>
					</div>
					<div className={styles.serviceFooter}>
						<div className={styles.contact}>
							<ManagerContact />
						</div>
						<span className={styles.button} onClick={() => this.props.setTab('payment')}>Далее</span>
					</div>
				</div>

			</div>
		);
	}
}
