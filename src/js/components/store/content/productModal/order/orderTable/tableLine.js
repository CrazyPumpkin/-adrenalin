import styles from "./orderTable.css";
import React from "react";
import LineItem from "./tableLineItem";
import Isvg from "react-inlinesvg";
import { connect } from "react-redux";
import iconCross from 'elements/img/cross_single.svg'


function tableLineState(state) {
  return {
      order: state.Reducer.order,
      sizes: state.Reducer.sizeList,
      basketOrder: state.Reducer.basketOrder,
      productId: state.Reducer.product.id,
      additionalColors: state.Reducer.additionalColors
  }
}

@connect(tableLineState)
export default class tableLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      line: null,
      isRemove: false,
    };
    this.valueChangeHandler = this.valueChangeHandler.bind(this);
    this.getSizeValue = this.getSizeValue.bind(this);
    this.getCounter = this.getCounter.bind(this);
    this.getOrderFromBasket = this.getOrderFromBasket.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.setRemoveProduct = this.setRemoveProduct.bind(this);

  }

  componentWillMount(){
    this.getOrderFromBasket();
  }
  setRemoveProduct(flag){
    this.setState({isRemove: flag});
  }
  getOrderFromBasket() {
    let basketOrder = this.props.basketOrder;
    let id = this.props.productId;
    // debugger;
    if (typeof basketOrder[id] !== "undefined") {
      this.setState({line: this.props.basketOrder[id][this.props.color]})
    } else {
      this.setState({line: this.props.order.sizes[this.props.color]})
    }
    //Если order по цвету пуст, забиваем пустыми массивами
    if (typeof this.props.order.sizes[this.props.color] === "undefined") {
      this.setState({line: this.props.sizes.map(() => "")});
    }
  }

  valueChangeHandler(e, index) {
    if (!(/^\d+$/.test(e.target.value)) && e.target.value != "")
      return;
    let line = this.state.line.slice();
    line[index] = e.target.value
    this.setState({line: line});

    this.props.actions.setOrderSizesByColor(this.props.color, line);
  }

  getCounter() {
    let counter = 0;
    this.state.line.forEach((elem) => {
      counter += parseInt(elem) || 0;
    })
    return counter;
  }
  removeProduct(){
    //Если это последний цвет, то не удаляем
    if(this.props.additionalColors.length < 2) return null;
    //Очищаем input fields
    this.setState({line: this.props.sizes.map(() => "")});
    //Перезаписываем пустым массивом Reducer.order
    this.props.actions.setOrderSizesByColor(this.props.color, this.props.sizes.map(() => ""));
    this.props.actions.removeOrderByColor(this.props.color);
    //Удаление цвета из Reducer.additionalColors
    let additionalColors = this.props.additionalColors.slice();
    additionalColors.splice(additionalColors.findIndex((item) => item.hex == this.props.color),1);
    this.props.actions.setAdditionalColors(additionalColors.slice());
  }
  getSizeValue(line, iSize) {
    console.log(line);
    let index = this.props.sizes.indexOf(iSize);
    return line[index];
  }

  render() {
    // if (this.state.line)
    return (
      <tr className={styles.line + ' ' + ((this.state.isRemove)? styles.line_remove :'')} onMouseLeave={() => this.setRemoveProduct(false)}>
        <td>
          <span className={styles.color} style={{color: this.props.color}}></span>
        </td>
        {this.props.sizes.map((iSize, index) => <LineItem key={iSize} iSize={iSize} value={this.getSizeValue(this.state.line, iSize)} index={index} valueChangeHandler={this.valueChangeHandler}/>)}
        <td><span className={styles.counter}>{this.getCounter() !== 0 ? this.getCounter() : null}</span></td>
        <td onClick={() => this.setRemoveProduct(true)} className={styles.cross_btn + ' ' + ((this.state.isRemove)? styles.cross_hidden :'')}><Isvg src={iconCross} /></td>
        <div className={styles.bttnRemove + ' ' + ((this.state.isRemove)? styles.bttnRemove_active :'')} onClick={this.removeProduct}>
            <Isvg src="./img/dustbin.svg"/>
        </div>
      </tr>
    )
  }
}
