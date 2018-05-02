import styles from "./printArea.css";
import React from 'react';
import Isvg from 'react-inlinesvg';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    order: state.Reducer.order,
    prints: state.Reducer.order.prints,
    actions: state.actions
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PrintArea extends React.Component {
  constructor(props){
    super(props)
    this.setArea = this.setArea.bind(this);
  }
componentDidMount(){

}
  setArea(areaId){
    let order = this.props.order;
    order.prints[this.props.printIndex].area = areaId;
    this.props.actions.saveOrderChanges(order);
  }
  render() {
    return (
      <div onClick={() => this.setArea(this.props.id)} className={styles.preview + ' ' +
      ((this.props.order.prints[this.props.printIndex].area === this.props.id)? styles.preview_active :
      ((typeof this.props.order.prints[this.props.printIndex].area == 'number')? styles.preview_unactive :''))}>
        <Isvg src={this.props.image}/>
        <p>{this.props.label}</p>
      </div>
    );
  }
}
