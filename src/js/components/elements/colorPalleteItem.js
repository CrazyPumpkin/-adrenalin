import styles from "./colorPalleteItem.css";
import React from "react";
import { connect } from 'react-redux';
import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from "react-router";

function mapStateToProps(state) {
	return {
		params: state.routerParams.params
	};
}

@connect(mapStateToProps)
export default class ColorPalleteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div onClick = {() => this.props.handler(this.props.setColor.id)}
				className={
					styles.item +
					' ' + (this.props.setColor.hex == 'white' ? styles.item_white : "")
				}
				style={{
					color: this.props.setColor.hex
				}}></div>
    );
  }
}
