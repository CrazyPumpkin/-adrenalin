import styles from "./Print.css";
import React from "react";
import PrintItem from "./PrintItem";
import Isvg from 'react-inlinesvg';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    reducer: state.Reducer,
  }
}

@connect(mapStateToProps)
export default class Print extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orderSizes: [],
      shirtPrintParams: this.props.shirtPrintParams,
      prints: this.props.order.prints,
    };
    this.countOrderSizes = this.countOrderSizes.bind(this);
  }


  componentDidMount(){
    this.countOrderSizes();
  }
  countOrderSizes(){
    let temp = []; //заменить на []
    for (let key in this.props.order.sizes){
      temp = this.props.order.sizes[key].map((item, index) => !!temp[index] + +item);
    }
    this.setState({orderSizes: temp});

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
                     prints={this.props.order.prints}
                     id={index}
                     print={print}
                     />
        )}
      </div>
      </div>
    )
  }
}
