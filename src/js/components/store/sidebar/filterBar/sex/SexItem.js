import styles from "./Sex.css";
import React from "react";
import Isvg from "react-inlinesvg";
import { Link} from "react-router";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return {
		params: state.routerParams.params
	};
}

@connect(mapStateToProps)
export default class SexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={'/store/catalog/' + this.props.setSex + '/' + this.props.params.color} className={styles.item + ' ' + (this.props.setSex == this.props.params.sex ? styles.item_active : "")}>
          <Isvg src={this.props.url} />
      </Link>
    )
  }
}
