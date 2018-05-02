import styles from "./Colors.css";
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
export default class ColorItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Link  to={'/store/catalog/' + this.props.params.sex + '/' + this.props.setColor.id}
				className={
					styles.item +
					' ' + (this.props.setColor.id == this.props.params.color ? styles.item_active : "") +
					' ' + (this.props.setColor.hex == 'white' ? styles.item_white : "")
				}
				style={{
					color: this.props.setColor.hex
				}}></Link>
    );
  }
}
