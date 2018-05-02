import styles from "./printArea.css";
import React from 'react';
import Isvg from 'react-inlinesvg';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    order: state.Reducer.order,
    prints: state.Reducer.basketOrder.data.find((item) => state.routerParams.params.orderId == item.orderId).prints,
  }
}


@connect(mapStateToProps)
export default class PrintArea extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    if(typeof(this.props.prints) =="undefined") return (<div>Loading</div>);

    return (
      <div
        className={styles.preview + ' ' +
      ((this.props.prints[this.props.printIndex].area === this.props.id)? styles.preview_active :
      ((typeof this.props.prints[this.props.printIndex].area == 'number')? styles.preview_unactive :''))}>
        <Isvg src={this.props.image}/>
        <p>{this.props.label}</p>
      </div>
    );
  }
}
