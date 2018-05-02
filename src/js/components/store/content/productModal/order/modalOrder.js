import styles from './order.css';
import React from 'react';
import Button from './../../../../elements/button';
import Table from './orderTable/orderTable';
import { connect } from 'react-redux';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { Motion, spring} from 'react-motion';
import Price from './shownPrice';
import PriceIcon from './img/cart_item.svg';
import { Link } from 'react-router';
import ConfirmModal from 'elements/confirm';
import { hashHistory} from "react-router";
import Pallete from 'elements/colorPallete'
import Isvg from 'react-inlinesvg';



function getOrderState(state) {
  return {
    routerParams: state.routerParams,
    order: state.Reducer.order,
    calculationIsOpen: state.Reducer.calculationIsOpen,
    product: state.Reducer.product,
    basketOrder: state.Reducer.basketOrder,
    confirmModal: state.Reducer.confirmModal,
    actions: state.actions
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}
@connect(getOrderState, mapDispatchToProps)
export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startOrder: [],
      isPalleteVisible: false
    };
    this.showPallete = this.showPallete.bind(this);
    this.addToBasketHandler = this.addToBasketHandler.bind(this);
    this.getResultCounter = this.getResultCounter.bind(this);
    this.getActualPrice = this.getActualPrice.bind(this);
    this.getAmount = this.getAmount.bind(this);
    this.addToCartConfirm = this.addToCartConfirm.bind(this);
    this.goToPrintHandler = this.goToPrintHandler.bind(this);
    this.goToPrintConfirm = this.goToPrintConfirm.bind(this);
    this.confirmText="";
    this.disableText="";
    this.descriptionText=[];
    this.confirmHandler;
    this.contentLabel = "";
  }

  getResultCounter() {
    let counter = 0;
    let order = Object.assign({}, this.props.order.sizes)
    for (let [key, value] of Object.entries(order)) {
        value.forEach((item) => {
          counter += parseInt(item) || 0;
        })
    }
    return counter;
  }

  addToCartConfirm() {
    this.confirmHandler = this.addToBasketHandler;
    this.confirmText="Продолжить";
    this.disableText="Отменить";
    this.descriptionText=["При добавлении изображения - оформление и оплата заказа возможны после согласования окончательной стоимости с менеджером."];
    this.contentLabel = "Добавить в корзину?";
    this.props.actions.openConfirm(true);
  }

  goToPrintConfirm() {
    this.confirmHandler = this.goToPrintHandler;
    this.confirmText="Да";
    this.disableText="Нет";
    this.contentLabel = "Добавить принт?";
    this.descriptionText=["Хотите добавить принт на выбранные футболки?", "При добавлении принта - оформление и оплата заказа возможны после согласования окончательной стоимости с менеджером."];
    this.props.actions.openConfirm(true);
  }

  showPallete(){
    this.setState({isPalleteVisible: !this.state.isPalleteVisible});
  }

  goToPrintHandler() {
    hashHistory.push('/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/print');
  }

  getActualPrice() {
    let price = 0;
    let prices = this.props.product["price"];
    for (let [key, value] of Object.entries(prices)){
      let next = +key + 1;
      let last = prices[prices.length - 1].counter;

      if (this.props.getResultCounter >= value.counter && this.props.getResultCounter < last) {
        price = value.value;
      } else if (this.props.getResultCounter >= last) {
        price = prices[prices.length - 1].value;
      }
    }

    return price;
  }

  getAmount() {
    let amount = this.getResultCounter() * this.getActualPrice();
    return amount;
  }


  addToBasketHandler(e) {
    e.stopPropagation();
      let order = this.props.order;

      order.prints = order.prints.slice(1, order.prints.length);
      order.status = (order.prints.length)? 0 : 2;

      let title = this.props.product["model"] + " " + this.props.product["sex"] + " " + this.props.product["id"];
      order.price = [
        {
          name: title,
          quantity: +this.getResultCounter(),
          value: +this.getActualPrice()
        }
      ]

      if(!order.orderId) {
        this.props.actions.addToBasket(this.props.product.id, order);
      }
      else {
        this.props.actions.changeBasketOrder(order);
      }
    //Очищаем добавленные в модалку цвета
    // Закрываем модалку
    this.props.actions.modalHandler(false, this.props.product);
    this.props.actions.orderIsChanged(true);
    this.props.actions.setAdditionalColors([]);

  }

  render() {
    return(
        <div className={styles.wrap}>
          {this.getResultCounter() !== 0 ? <Price count={this.props.getResultCounter} price={this.getActualPrice()}/> : null}
          <Table actions={this.props.actions}/>

          <div className={styles.pallete}>
            <div onClick={this.showPallete} className={styles.palleteToggle}>
              <Isvg src={'./img/color-pallete-icon.svg'} />
            </div>
            {
              this.state.isPalleteVisible && (<Pallete onRequestClose={this.showPallete}/>)
            }
          </div>

          {this.props.calculationIsOpen ? <span className={styles.hint}>*Если вы хотите добавить изображение (принт) на выбранные футболки -  Вы можете сделать это в Корзине</span> : null}
          <footer className={styles.footer}>
          {(this.getResultCounter() !== 0 )? <div className={styles.order_amount}>
                <span>Сумма к оплате: {this.getAmount()} руб.</span>
              </div>: null }
              {/*
                this.getResultCounter() !== 0 ? <span>Колличество: { this.getResultCounter() }</span> : null
                <Button title={"Добавить принт"} activeClassName={'active'} className={styles.button}/>
                */}
              {this.getResultCounter() !== 0 ? <Button title={"Добавить принт"} handler={this.goToPrintConfirm} activeClassName={'active'}  className={styles.button} /> : null}
              {this.getResultCounter() !== 0 ? <Button title={"Добавить в корзину"} icon={PriceIcon} handler={this.addToCartConfirm} activeClassName={'active'} className={styles.button}/> : null}
            </footer>
            <ConfirmModal
              confirmHandler={this.confirmHandler}
              confirmText={this.confirmText}
              disableText={this.disableText}
              descriptionText={this.descriptionText}
              contentLabel={this.contentLabel}
            />
          </div>
    )
  }
}
