import styles from "./BasketTable.css";
import React from "react";
import { connect } from "react-redux";
import Button from "./../../../../elements/button";

function mapStateToProps(state) {
  return {
    basketOrder: state.Reducer.basketOrder
  }
}

@connect(mapStateToProps)
export default class SizeItem extends React.Component {
  constructor(props) {
    super(props);
    this.countSumm = this.countSumm.bind(this);
    this.declOfNum = this.declOfNum.bind(this);
  }
  componentDidMount(){

  }
  countSumm(){
    let summ = 0;
    this.props.orders.filter((object) => object.status == 2).map((order) => {
        for (let i = 0; i < order.price.length; i++) {
            summ += order.price[i].value * order.price[i].quantity;
        }
    });
    return(summ);
  }
  declOfNum(number, titles)
  {
      let cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }


  render() {
    return (
      <div className={styles.basketFooter}>
        <div>
          <span className={styles.resultCounter}>
            {"Стоимость " + this.props.orders.filter((object) => object.status == 2).length + ' ' + this.declOfNum(this.props.orders.filter((object) => object.status == 2).length,['заказа','заказов','заказов'])+ ": "}
            <span className={styles.value}> {this.countSumm()} руб</span>
          </span>
          <Button className={styles.orderButton} title={"Оплатить " + this.props.orders.filter((object) => object.status == 2).length + ' ' + this.declOfNum(this.props.orders.filter((object) => object.status == 2).length,['заказ','заказа','заказов'])} handler={this.props.openPaymentHandler}/>
        </div>

      </div>
    )
  }
}
