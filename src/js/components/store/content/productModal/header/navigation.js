import styles from './header.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function openOrderState(state) {
  return {
    routerParams: state.routerParams,
    orderIsOpen: state.Reducer.orderIsOpen,
    sizesIsOpen: state.Reducer.sizesIsOpen
  }
}

@connect(openOrderState)
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    // this.openInfoHandler = this.openInfoHandler.bind(this);
    // this.openOrderHandler = this.openOrderHandler.bind(this);
    // this.openSizesHandler = this.openSizesHandler.bind(this);
    // this.openPrintHandler = this.openPrintHandler.bind(this);
  }

  // openPrintHandler(e) {
  //   e.stopPropagation();
  //   this.props.actions.activeModalTab("print");
  // }
  //
  // openInfoHandler(e) {
  //   e.stopPropagation();
  //   this.props.actions.activeModalTab("info");
  // }
  //
  // openOrderHandler(e) {
  //   e.stopPropagation();
  //   this.props.actions.activeModalTab("order");
  // }
  //
  // openSizesHandler(e) {
  //   e.stopPropagation();
  //   this.props.actions.activeModalTab("sizes");
  // }
  
  render() {
    return(
      <nav className={styles.navigation}>
        <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/info'} activeClassName={'active'} className={styles.link}>Описание</Link>
        <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/order'} activeClassName={'active'} className={styles.link}>Цвета и размеры</Link>
        <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/print'} activeClassName={'active'} className={styles.link}>Принт</Link>
        <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/sizes'} activeClassName={'active'} className={styles.link}>Табель мер</Link>
      </nav>
    )
  }
}
