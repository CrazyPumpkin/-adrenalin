import styles from "./../Sidebar.css";
import React from "react";
import { connect } from 'react-redux';
import Sex from "./sex/Sex";
import Colors from "./../colors/Colors";

function mapStateToProps(state) {
  return {
    routerParams: state.routerParams
  }
}

@connect(mapStateToProps)
export default class filterBar extends React.Component {
  constructor(props) {
    super(props);
    console.log("Filter props", this.props)
  }


  render() {
    console.log("Filter props", this.props)
    return (
      <nav className={styles.filters_wrap}>
        <div>
          {this.props.page !== "basket"
            ? <Sex/>
            : null}
        </div>
        <div>
          {this.props.page !== "basket"
            ? <Colors actions={this.props.actions}/>
            : null}
        </div>
      </nav>
    );
  }
}
