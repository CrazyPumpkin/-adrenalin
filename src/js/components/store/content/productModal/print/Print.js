import styles from "./Print.css";
import React from "react";
import PrintItem from "./PrintItem";
import Isvg from 'react-inlinesvg';
import ManagerContact from 'elements/ManagerContact/ManagerContact';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import Button from './../../../../elements/button';
import PriceIcon from './img/cart_item.svg';
import ConfirmModal from 'elements/confirm';
import { hashHistory} from "react-router";
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    routerParams: state.routerParams,
    reducer: state.Reducer,
    shirtPrintParams: state.Reducer.product.areas,
    order: state.Reducer.order,
    actions: state.actions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Print extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderSizes: [],
      shirtPrintParams: this.props.shirtPrintParams,
      currentPrint: -1,
      removePrint: -1,
      // draggedPrint: -1,
    };
    this.openPrint = this.openPrint.bind(this);
    this.countOrderSizes = this.countOrderSizes.bind(this);
    this.removePrint = this.removePrint.bind(this);
    this.setRemovePrint = this.setRemovePrint.bind(this);
    this.isPrintsFull = this.isPrintsFull.bind(this);
    this.addEmptyPrint = this.addEmptyPrint.bind(this);
    this.addToBasketHandler = this.addToBasketHandler.bind(this);
    this.addToCartConfirm = this.addToCartConfirm.bind(this);
    this.goToShirtsPage = this.goToShirtsPage.bind(this);
    this.confirmText="";
    this.disableText="";
    this.descriptionText=[];
    this.confirmHandler;
    this.contentLabel = "";
  }
  addToCartConfirm() {
    this.confirmHandler = this.addToBasketHandler;
    this.confirmText="Продолжить";
    this.disableText="Отменить";
    this.descriptionText=["При добавлении изображения - оформление и оплата заказа возможны после согласования окончательной стоимости с менеджером."];
    this.contentLabel = "Добавить в корзину?";
    this.props.actions.openConfirm(true);
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
  goToShirtsPage(){
    hashHistory.push('/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/order');
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
  getActualPrice() {
    let price = 0;
    let prices = this.props.product["price"];
    for (let [key, value] of Object.entries(prices)){
      let next = +key + 1;
      let last = prices[prices.length - 1].counter;

      if (this.getResultCounter() >= value.counter && this.getResultCounter() < last) {
        price = value.value;
      } else if (this.getResultCounter() >= last) {
        price = prices[prices.length - 1].value;
      }
    }

    return price;
  }
  setRemovePrint(index){
    this.setState({removePrint: index});
  }

  //Метод удаления принта
  removePrint(index){
    index = this.state.removePrint
    let order = this.props.order;
    order.prints.splice(index, 1);
    this.props.actions.saveOrderChanges(order);
    this.setRemovePrint(-1);
  }
  componentDidMount(){
    console.log(this.props.reducer);

    this.countOrderSizes();
  }
  countOrderSizes() {
    let temp = []; //заменить на []
    for (let key in this.props.order.sizes){
      temp = this.props.order.sizes[key].map((item, index) => !!temp[index] + +item);
    }
    this.setState({orderSizes: temp});

  }
  openPrint(id){
    console.log(id);
    this.setState({currentPrint: id});
    if(this.isPrintsFull())
    this.addEmptyPrint();
  }
  isPrintsFull(){
    let lastPrint = this.props.order.prints[0];
    return ((lastPrint.size[0] > 0 && lastPrint.size[1] > 0));
  }
  addEmptyPrint(){
    let print = {
                  img: '',
                  size: [0,0],
                  offsets: [
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0],
                    [0,0]
                  ],
                  comment: '',
                  colors: 1,
                };
    let order = this.props.order;
    order.prints.unshift(print);

    this.props.actions.saveOrderChanges(order);
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.printsList}>
          { this.props.order.prints.map((print, index) =>
            <PrintItem shirtPrintParams={this.state.shirtPrintParams}
                       orderSizes={this.state.orderSizes}
                       sizeList={this.props.reducer.sizeList}
                       key={index}
                       id={index}
                       openPrint={this.openPrint}
                       currentPrint={this.state.currentPrint}
                       setRemovePrint = {this.setRemovePrint}
                       removePrintId={this.state.removePrint}
                       removePrint={this.removePrint}
                       print={print}
                       />
          )}
        </div>
        {(this.state.currentPrint != -1)? <div className={styles.buttonCancel} onClick={() => this.openPrint(-1)}>Готово</div> :

          this.getResultCounter() !== 0 ?
          <Button title={"Добавить в корзину"} icon={PriceIcon} handler={this.addToCartConfirm} activeClassName={'active'} className={styles.button}/> :
          <Button title={"Добавить майки"} handler={this.goToShirtsPage} activeClassName={'active'}  className={styles.button} />
        }
          <div className={styles.contact}>
            <ManagerContact />
          </div>
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
