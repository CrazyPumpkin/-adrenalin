import styles from "./SizeEditor.css";
import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    order: state.Reducer.order,
    prints: state.Reducer.basketOrder.data.find((item) => state.routerParams.params.orderId == item.orderId).prints
  }
}

@connect(mapStateToProps)
export default class SizeEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      prints: this.props.prints,
    };
  }

  render() {
    return (
        <div className={(this.props.active)? '' : styles.unactive }>
          <span className={styles.sizeInput}>{(this.state.prints[this.props.index].size)? this.state.prints[this.props.index].size[0]: '100'}</span>
          {' × '}
          <span className={styles.sizeInput}>{(this.state.prints[this.props.index].size)? this.state.prints[this.props.index].size[1]: '100'}</span>
        </div>
    );
  }
}
