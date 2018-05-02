import styles from "./Content.css";
import React from "react";
import Card from "./card/Card";
import { connect } from 'react-redux';
import ProductModal from './productModal/productModal';
import Isvg from 'react-inlinesvg';
import Catalog from './catalog/catalog';
import Basket from './basket/Basket'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';




function productsListState(state) {
  return {
    actions: state.actions,
    products: state.Reducer.products,
    color: state.Reducer.color,
    sex: state.Reducer.sex,
    orderIsOpen: state.Reducer.orderIsOpen,
    colors: state.Reducer.colors
   };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(productsListState, mapDispatchToProps)
export default class Content extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.actions.fetchProducts('products');
    this.props.actions.fetchColors('colors');
  }


  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
