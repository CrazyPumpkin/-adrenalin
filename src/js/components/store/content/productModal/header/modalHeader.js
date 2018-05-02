import styles from "./header.css"
import React from "react";
import Navigation from "./navigation";
import { connect } from 'react-redux';

function openOrderState(state) {
  return {
    orderIsOpen: state.Reducer.orderIsOpen
  }
}

@connect(openOrderState)
export default class productHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className={styles.header}>
        <h3 className={styles.title}>{'Model' + ' ' + this.props.product.model}</h3>
        <Navigation actions={this.props.actions}/>
      </header>

    )
  }
}
