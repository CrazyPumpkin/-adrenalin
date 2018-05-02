import styles from './../information.css';
import React,{Component} from 'react';
import Isvg from 'react-inlinesvg';

import Envelope from './img/envelope.svg';
import Phone from './img/phone.svg';



export default class ContactsInfo extends Component {
    render() {
        return (
            <div className={styles.information}>
                <div className={styles.contacts}>
                    <div className={styles.contacts__item}>
                        <Isvg src={ Phone } className={styles.contacts__icon}/>
                        <span>8 (888) 777-66-55</span>
                    </div>
                    <div className={styles.contacts__item}>
                        <Isvg src={ Envelope } className={styles.contacts__icon}/>
                        <span>adrenalin@tender.com</span>
                    </div>
                </div>
                <h3>О компании</h3>
                <p>Компания  «inTenders» с 2017 года предоставляет услуги по отбору актуальных тендеров в соответствии с бизнес отраслью.
Сервис сочетает в себе мощную аналитическую систему, благодаря которой, inTenders всегда знает какие проекты вам нужны. Тендерная база, собирается с 7000 электронных тендерных площадок по России и обновляется ежечасно. Система отбирает торги, наиболее подходящие вашему бизнесу, и предлагает их вам на рассмотрение. </p>
                <p>Под каждого пользователя формируются индивидуальные фильтры в зависимости от специфики его деятельности. После настройки фильтров пользователю приходят уведомления о новых закупках.</p>
                <p>Услуги использования сервиса предоставляются в соответствии с выбранным <a href="#">тарифным планом*</a>. <a href="#">Стоимость тарифного плана*</a> зависит от количества фильтров и срока их использования. </p>

                <div className={styles.requisits}>
                    <h3>Реквизиты</h3>
                    <table className={styles.table}>
                        <tr>
                            <td>Адрес регистрации:</td>
                            <td>344058, г. Ростов-на-Дону, ул. Гризодубовой, д. 52 кв. 4.</td>
                        </tr>
                        <tr>
                            <td>Почтовый адрес:</td>
                            <td>344058, г. Ростов-на-Дону, ул. Зорге, д. 58/3 кв. 108А</td>
                        </tr>
                        <tr>
                            <td>Телефон</td>
                            <td>+7 909 409 75 75</td>
                        </tr>
                    </table>

                    <table className={styles.table}>
                        <tr>
                            <td>ИНН</td>
                            <td>616832039028</td>
                        </tr>
                        <tr>
                            <td>ОГРНИП</td>
                            <td>308616209100011</td>
                        </tr>
                        <tr>
                            <td>ОКВЭД</td>
                            <td>72.20; 72.30;  72.40; 72.50; 72.60</td>
                        </tr>
                        <tr>
                            <td>Расчетный счет</td>
                            <td>40802810904000000016</td>
                        </tr>
                        <tr>
                            <td>Банк</td>
                            <td>ОАО КБ  «Центр-инвест» г. Ростов-на-Дону</td>
                        </tr>
                        <tr>
                            <td>Корреспондирующий счет</td>
                            <td>30101810100000000762</td>
                        </tr>
                        <tr>
                            <td>БИК</td>
                            <td>04605762</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}
