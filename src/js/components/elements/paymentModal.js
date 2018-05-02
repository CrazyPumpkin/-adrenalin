//Модалка для оформления заказа (доставка, оплата и т.д.)
import React from 'react';
import styles from './PaymentModal.css'
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router';
import Delivery from './Delivery';
import OrderListCheck from './OrderListCheck';
import PaymentMethods from './PaymentMethods';
import PaymentDetails from './PaymentDetails';
import PaymentDetailsBill from './PaymentDetailsBill';
import Bill from './Bill';

import PaymentError from './PaymentError';
import PaymentSuccess from './PaymentSuccess';

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

const customStyles = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    transform : 'translate(-50%,-50%)',
    border : 'none',
    boxShadow : '0px 1px 19px rgba(0,0,0,.5)',
    borderRadius: '5px',
    overflow: 'visible',
    padding: 0
  },
  overlay: {
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
};

function openOrderState(state) {
  return {
    cartOrder: state.Reducer.basketOrder,
    routerParams: state.routerParams,
    actions: state.actions,
    products: state.Reducer.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(openOrderState, mapDispatchToProps)
export default class paymentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tab: 'check',
    };
    this.closeModal = this.closeModal.bind(this);
    this.setTab = this.setTab.bind(this);
    this.getTab = this.getTab.bind(this);
  }
  componentWillReceiveProps(nextProps) {
  }
  componentDidMount(){
  }
  closeModal() {
    this.props.modalClose();
    this.setTab('check');
  }
  setTab(tab){
    console.log(tab);
    this.setState({tab: tab});
    console.log(this.state.tab);
  }
  getTab(tab){
    switch (tab) {
      case 'check':
         return(<OrderListCheck products={this.props.products} order={this.props.order} setTab={this.setTab}/>);
        break;
      case 'delivery':
         return(<Delivery setTab={this.setTab}/> );
        break;
      case 'payment':
         return(<PaymentMethods setTab={this.setTab}/> );
        break;
      case 'paymentdetails':
         return(<PaymentDetails setTab={this.setTab}/> );
        break;
      case 'paymentdetailsbill':
          return(<PaymentDetailsBill setTab={this.setTab}/> );
        break;
      case 'bill':
          return(<Bill setTab={this.setTab}/> );
        break;
      case 'paymenterror':
         return(<PaymentError setTab={this.setTab}/> );
        break;
      case 'paymentsuccess':
         return(<PaymentSuccess closeModal={this.closeModal}setTab={this.setTab}/> );
        break;
      default:

    }
  }
  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen}  onRequestClose={this.closeModal} style={customStyles} contentLabel={"Детали товара"}>
        <div>
        {
          this.getTab(this.state.tab)
        }
      </div>
        <span className={styles.closeButton} onClick={this.closeModal}>
          <Isvg src={'./img/cross.svg'} />
        </span>
      </Modal>
    )
  }
}
