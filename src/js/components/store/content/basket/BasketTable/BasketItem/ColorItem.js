import styles from "./../BasketTable.css";
import React from "react";
import { connect } from 'react-redux';

function sidebarColorState(state) {
  return {
    colors: state.Reducer.colors
  }
}

@connect(sidebarColorState)
export default class ColorItem extends React.Component {
  compomemtDidMount() {
    console.log(this.props.color)
  }
  render() {
    return (
      <div className={styles.colorItem} style={{color: this.props.color}}></div>
    )
  }
}
