import styles from './productModal.css';
import React from 'react';
import Header from './header/modalHeader';
import Info from './info/modalInfo';
import Preview from './preview/modalPreview';
import Order from './order/modalOrder';
import Sizes from './sizeParams/sizeParams';
import Print from './print/Print';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Isvg from 'react-inlinesvg';
import { Link } from 'react-router';

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
    backgroundColor: 'rgba(0,0,0,.5)'
  }
};

function openOrderState(state) {
  // console.log("State: ", state)
  return {
    routerParams: state.routerParams,
    actions: state.actions,
    colors: state.Reducer.colors,
    orderIsOpen: state.Reducer.orderIsOpen,
    sizesIsOpen: state.Reducer.sizesIsOpen,
    modalIsOpen: state.Reducer.modalIsOpen,
    additionalColors: state.Reducer.additionalColors,
    modalActiveTab: state.Reducer.modalActiveTab,
    product: state.Reducer.product,
    products: state.Reducer.products,
    order: state.Reducer.order,
    price: state.Reducer.price,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(openOrderState, mapDispatchToProps)
export default class ModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isColorSetted: false
    };
    this.getComponent = this.getComponent.bind(this);
    this.getResultCounter =this.getResultCounter.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addEmptyPrint = this.addEmptyPrint.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    console.log('newProps');
    //Если нет цветов, дописываем из роута
    if(nextProps.colors.length && !this.props.additionalColors.length){
      let currentColor = nextProps.colors.find((item) => nextProps.routerParams.params.color == item.id);
      this.props.actions.setAdditionalColors([currentColor]);

    }
    //устанавливаем текущий товар
    if(nextProps.products.length){
      let product = nextProps.products.find((item) => { return  item.id == nextProps.params.model });
      this.props.actions.setProduct(product);
    }
    //Добавляем пустой принт, если нет принтов или если все карточки принтов заполнены
    if(!this.props.order.prints.length){
      this.addEmptyPrint();
    }

  }
  addEmptyPrint(){
    let print = {
                  img: '',
                  size: ['',''],
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
  componentWillUpdate(nextProps, nextState){
    console.log('update');
  }
  componentDidMount(){
    console.log('Mounted');
    //Костыль для записи текущего цвета
      if(this.props.colors.length && !this.state.isColorSetted && !this.props.additionalColors.length){
        let currentColor = this.props.colors.find((item) => this.props.routerParams.params.color == item.id);
        this.props.actions.setAdditionalColors([currentColor]);
        this.setState({isColorSetted:true});
      }

      if(this.props.products.length){
      let product = this.props.products.find((item) => { return  item.id == this.props.params.model });
      this.props.actions.setProduct(product);
    }
  }
  closeModal() {
    console.log(this.props);
    browserHistory.push('#/store/catalog/' + this.props.params.sex + '/' + this.props.params.color + '/')
    this.props.actions.modalHandler(false, this.props.product);
    this.props.actions.showSizes(false);
    this.props.actions.setAdditionalColors([]);
    this.props.actions.activeModalTab("info");
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

  getComponent() {
    switch (this.props.routerParams.params.tab) {
      case "info":
        return (
          <div className={styles.content}>
            <Preview thumb={this.props.product} getResultCounter={this.getResultCounter()}/>
            <Info product={this.props.product} actions={this.props.actions}/>
          </div>);
      case "order":
        return (
          <div className={styles.content}>
            <Preview thumb={this.props.product}/>
            <Order actions={this.props.actions} getResultCounter={this.getResultCounter()}/>
          </div>);
      case "sizes":
        return (
          <div className={styles.content}>
            <Preview thumb={this.props.product} getResultCounter={this.getResultCounter()}/>
            <Sizes product={this.props.product} actions={this.props.actions}/>
          </div>);
      case "print":
        return (
          <div className={styles.content}>
            <Print product={this.props.product} actions={this.props.actions}/>
          </div>);
      default:
        return (
          <div className={styles.content}>
            <Preview thumb={this.props.product} getResultCounter={this.getResultCounter()}/>
            <Info product={this.props.product} actions={this.props.actions}/>
          </div>);
    }
  }

  render() {
    if(!this.props.product.id) return( <div>Loading</div> )
    return (
      <Modal isOpen={this.props.modalIsOpen}  onRequestClose={this.closeModal} style={customStyles} contentLabel={"Детали товара"}>
        <div className={styles.wrap}>
          <Header product={this.props.product} actions={this.props.actions}/>
          {this.getComponent()}
        </div>
        <Link to={'/store/catalog/' + this.props.params.sex + '/' + this.props.params.color + '/'} className={styles.close}>
          <Isvg src={'./img/cross.svg'} />
        </Link>
      </Modal>
    )
  }
}


/*

        {
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
        },
        {
          img: './img/print1.png',
          size: [200,100],
          area: 0,
          offsets: [
            [50,0],
            [0,30],
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0]
          ],
          colors: 2,
          comment: 'Lorem ipsum'
        },
        {
          img: './img/print1.png',
          size: [200,100],
          area: 0,
          offsets: [
            [50,0],
            [0,30],
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0]
          ],
          colors: 3,
          comment: 'Lorem ipsum'
        },
        {
          img: './img/print2.png',
          size: [300,200],
          area: 0,
          offsets: [
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0],
            [0,0]
          ],
          colors: 4,
          comment: 'Lorem ipsum 2'
        },
      ]
*/
