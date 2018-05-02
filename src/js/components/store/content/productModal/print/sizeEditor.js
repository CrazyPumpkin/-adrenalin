import styles from "./SizeEditor.css";
import React from 'react';
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
export default class SizeEditor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      prints: this.props.prints,
    };
   this.changeWidth = this.changeWidth.bind(this);
   this.changeHeight = this.changeHeight.bind(this);
  }
  changeWidth(e){
    let order = this.props.order;
    let prints = this.state.prints;
    if(e.keyCode == 38){
      order.prints[this.props.index].size[0]++;
    } else if(e.keyCode == 40){
      order.prints[this.props.index].size[0]--;
    } else {
      order.prints[this.props.index].size[0] = e.target.value;
      prints[this.props.index].size[0] = e.target.value;
    }

    this.props.actions.saveOrderChanges(order);
    this.setState({prints:prints});
  }
  changeHeight(e){
    //Если введен текст, присваивается новое значение, если нажаты стрелки вверх/низ, то инкрементируется
    let order = this.props.order;
    let prints = this.state.prints;
    if(e.keyCode == 38){
      order.prints[this.props.index].size[1]++;
    } else if(e.keyCode == 40){
      order.prints[this.props.index].size[1]--;
    } else {
      order.prints[this.props.index].size[1] = e.target.value;
      prints[this.props.index].size[1] = e.target.value;
    }

    this.props.actions.saveOrderChanges(order);
    this.setState({prints:prints});
  }
  render() {
    return (
        <div className={(this.props.active)? '' : styles.unactive }>
          <input onKeyDown={this.changeWidth}
                 onChange={this.changeWidth}
                 className={styles.sizeInput}
                 placeholder={'0'}
                 value={(this.state.prints[this.props.index].size)? this.state.prints[this.props.index].size[0]: ''}
                 type="text"/>
          {' × '}
          <input onKeyDown={this.changeHeight}
                 onChange={this.changeHeight}
                 className={styles.sizeInput}
                 placeholder={'0'}
                 value={(this.state.prints[this.props.index].size)? this.state.prints[this.props.index].size[1]: ''}
                 type="text"/>
        </div>
    );
  }
}
