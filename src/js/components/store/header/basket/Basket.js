import styles from "./basket.css";
import React from  "react";
import { Link } from "react-router";
import Isvg from "react-inlinesvg";
import { connect } from "react-redux";

function headState(state) {
  return {
    basketOrder: state.Reducer.basketOrder
  }
}

@connect(headState)
export default class Basket extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			counter:0,
		}
		this.getOrderCounter = this.getOrderCounter.bind(this);
	}
	componentWillReceiveProps(newProps) {
		if(newProps.basketOrder != this.props.basketOrder)
		this.setState({counter:this.getOrderCounter()});

	}
	componentDidMount(){
		this.setState({counter:this.getOrderCounter()});
	}
  getOrderCounter() {
    let counter = 0;
    let order = this.props.basketOrder["data"];
    order.map((item) => {
      for (let [key, color] of Object.entries(item.sizes)) {
          color.forEach((item) => {
            counter += parseInt(item) || 0;
          })
      }
    })
    return counter;
  }

	render() {
		return (
      <span to='/store/basket' className={styles.wrap}>
        <Isvg src={"./img/basket.svg"}/>
        <span className={styles.counter}><span>{this.state.counter}</span></span>
      </span>
		);
	}
}
