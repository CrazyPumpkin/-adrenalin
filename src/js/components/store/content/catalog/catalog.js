import styles from './catalog.css';
import React from 'react';
import { connect } from 'react-redux';
import Card from './../card/Card';
import ConfirmModal from 'elements/confirm';

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';

function mapStateToProps(state) {
  return {
    actions: state.actions,
    products: state.Reducer.products,
    color: state.Reducer.color,
    params: state.routerParams.params,
    modalIsOpen: state.Reducer.modalIsOpen,
    product: state.Reducer.product,
    orderIsOpen: state.Reducer.orderIsOpen,
    colors: state.Reducer.colors,
    basketOrder: state.Reducer.basketOrder,
    orderIsChanged: state.Reducer.orderIsChanged,
    confirmModal: state.Reducer.confirmModal,
    push: state.push
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.moveToCartConfirm = this.moveToCartConfirm.bind(this);
    this.moveToCartHandler = this.moveToCartHandler.bind(this);
    this.confirmHandler = this.moveToCartHandler;
    this.confirmText = "Перейти в корзину";
    this.contentLabel = "";
    this.descriptionText = ["Благодарим за выбор нашей продукции!", "Заказ №25382 добавлен в корзину в статусе «согласование». Менеджер свяжется с Вами в самое ближайшее время.", "Также вы сможете отследить статус заказа в корзине."];
  }
  // componentDidMount(){
  //   this.props.actions.changeSex(this.props.params.sex);
  // }
  openModal(product, basketCounter) {
  // console.log(this.props.product);
  // debugger;
    if (product === this.props.product && this.props.orderIsOpen || basketCounter !== 0) {
      console.log('open');
      this.props.actions.showOrder(true);
      this.props.actions.clearOrder();

    } else {
      console.log('close');

      this.props.actions.showOrder(false);
      this.props.actions.clearOrder();
      this.props.actions.getPrice(false);
    }
    this.props.actions.modalHandler(true, product);
  }


  moveToCartConfirm() {
    this.confirmHandler = this.moveToCartHandler;
    this.confirmText = "Перейти в корзину";
    this.contentLabel = "Перейти в корзину";
    // this.disableText = "Перейти в корзину";
    this.descriptionText = ["Благодарим за выбор нашей продукции!", "Заказ №25382 добавлен в корзину в статусе «согласование». Менеджер свяжется с Вами в самое ближайшее время.", "Также вы сможете отследить статус заказа в корзине."];
    if (this.props.orderIsChanged == true) {
      // this.props.actions.openConfirm(true);
      return (
        <ConfirmModal
          confirmHandler={this.confirmHandler}
          confirmText={this.confirmText}
          disableText={this.disableText}
          titleText={this.titleText}
          descriptionText={this.descriptionText}
          contentLabel={this.contentLabel}
        />
      )

    }

  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.orderIsChanged)
    if (nextProps.orderIsChanged) {
      this.props.actions.openConfirm(true);
    }
  }

  componentWillMount() {
    if (this.props.orderIsChanged == true) {
      this.props.actions.openConfirm(true);
    }
  }

  moveToCartHandler() {
    this.props.actions.openConfirm(false);
    this.props.actions.orderIsChanged(false);
    hashHistory.push('/store/basket');
  }

  render() {

    return (
      <div>
        <div className={styles.wrap}>
            {this.props.products.map((product) =>  product.sex == this.props.params.sex ? <Card key={product.id} params={this.props.params} product={product} colors={this.props.colors} handlerClick={this.openModal} /> : null)}
        </div>
        {this.props.orderIsChanged == true ? this.moveToCartConfirm() : null}
        {this.props.children}
      </div>
    )
  }
}
