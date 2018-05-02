
import React from "react";
import styles from "./Bill.css";
import Isvg from "react-inlinesvg";

import imgShtamp from "./img/shtamp.png";
import imgPrinter from "./img/print.svg";
import imgMail from "./img/mail.svg";

export default class Bill extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
      <div className={styles.wrapper}>
					<div className={styles.header}>
						<div>
							<span className={styles.heading}>Оплата</span>
							<span className={styles.icons}>
								<span className={styles.icon + ' ' + styles.icon_printer}><Isvg src={imgPrinter}/></span>
								<span className={styles.icon + ' ' + styles.icon_mail}><Isvg src={imgMail}/></span>
							</span>
						</div>
					</div>
				<div className={styles.body}>
					<div className={styles.list}>
						<p className={styles.actuality}>Счет действителен в течении 3 (трех) банковских дней.</p>
							<table className={styles.bank}>
							  <tr>
							    <td rowSpan="3" colSpan="2">
										ЮЖНЫЙ ФИЛИАЛ АО "БАНК ИНТЕЗА" Г. РОСТОВ-НА-ДОНУ</td>
									<td rowSpan="0" colSpan="0">БИК</td>
							    <td rowSpan="3" colSpan="0">046027 <br/> 23742865873246534</td>
							  </tr>
							  <tr>
							    <td rowSpan="2" colSpan="0">Сч. №</td>
							  </tr>
							  <tr>
							  </tr>
							  <tr>
							    <td rowSpan="0" colSpan="0">ИНН 6168732648</td>
							    <td rowSpan="0" colSpan="0">КПП 6167238462</td>
							    <td rowSpan="3" colSpan="0">сч №</td>
							    <td rowSpan="3" colSpan="0">347257236457932465</td>
							  </tr>
							  <tr>
							    <td rowSpan="2" colSpan="2">Общество с ограниченной ответственностью "Комплект-А ЮГ"</td>
							  </tr>
							  <tr>
							  </tr>
							</table>
							<p className={styles.date}>Счет на оплату № 214 от 20 февраля 2017</p>
							<div className={styles.section_provider}>
								<p className={styles.heading}>Поставщик:</p>
								<p className={styles.description}>
									ИНН 6164298235, КПП 616401001, Общество с ограниченной ответственностью "Комплект-А ЮГ", 344011,
									Ростовская обл, Ростов-на-Дону г, Красноармейская ул, дом № 9, оф.418, тел.: +7 (863) 248-91-55
								</p>
							</div>
							<div className={styles.section_buyer}>
								<p className={styles.heading}>Поставщик:</p>
								<table>
									<tr>
										<th>№ заказа</th>
										<th>Товар</th>
										<th>Цвета</th>
										<th>Кол-во</th>
										<th>Ед.</th>
										<th>Цена</th>
										<th>Сумма</th>
									</tr>
									<tr>
										<td>20460</td>
										<td className={styles.model}>Модель «Model  Men 15356-3» с нанесением принта</td>
										<td>2</td>
										<td>588</td>
										<td>шт</td>
										<td>342,92</td>
										<td>201096,00</td>
									</tr>
									<tr>
										<td>20460</td>
										<td className={styles.model}>Модель «Model  Men 15356-3» с нанесением принта</td>
										<td>2</td>
										<td>588</td>
										<td>шт</td>
										<td>342,92</td>
										<td>201096,00</td>
									</tr>
									<tr>
										<td>20460</td>
										<td className={styles.model}>Модель «Model  Men 15356-3» с нанесением принта</td>
										<td>2</td>
										<td>588</td>
										<td>шт</td>
										<td>342,92</td>
										<td>201096,00</td>
									</tr>
								</table>
								<p className={styles.caption}>Всего наименований 3, на сумму, руб.: <span>468 249,60</span></p>
								</div>
								<p className={styles.summ}>Четыреста шестьдесят восемь тысяч двести сорок девять рублей 60 копеек</p>
									<table className={styles.sign}>
										<tr>
											<td>Руководитель</td>
											<td><p>Генеральный директор</p><p>должность</p></td>
											<td rowSpan="3">
												<img src={imgShtamp} alt=""/>
											</td>
											<td><p>/Мякотин Л.В./</p><p>расшифровка подписи</p></td>
										</tr>
										<tr>
											<td>Главный (старший) бухгалтер</td>
											<td></td>
											<td><p>/Степанова Л.В./</p><p>расшифровка подписи</p></td>
										</tr>
										<tr>
											<td>Ответственный</td>
											<td><p>Начальник отдела продаж</p><p>должность</p></td>
											<td><p>/Синий В.Ю./</p><p>расшифровка подписи</p></td>
										</tr>
									</table>
					</div>
				</div>
			</div>
		);
	}
}
