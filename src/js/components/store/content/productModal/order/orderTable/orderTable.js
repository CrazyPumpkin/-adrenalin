import styles from "./orderTable.css";
import React from "react";
import Line from "./tableLine";
import { connect } from 'react-redux';
import {Spring} from 'react-motion'
import Isvg from 'react-inlinesvg';

function colorsTableState(state) {
  return {
    additionalColors: state.Reducer.additionalColors,
    colors: state.Reducer.colors,
    routerParams: state.routerParams,
  }
}

@connect(colorsTableState)
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
    };
    // this.showPallete = this.showPallete.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentWillReceiveProps(nextProps){
    console.log('PROPS');
    let colors = nextProps.additionalColors.slice();
    this.setState({colors: colors});

  }

  scrollToBottom() {
    let element = document.querySelector("." + styles["table_wrap"]);
    element.scrollTop = element.scrollHeight;
  }

  componentDidMount(){
    if(this.props.colors.length == 0) return null;
    let colors = this.props.additionalColors.slice();
    this.setState({colors: colors});
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom()
  }

  render() {
    return (
      <div className={styles.table_wrap}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th></th>
              <th>XS</th>
              <th>S</th>
              <th>M</th>
              <th>L</th>
              <th>XL</th>
              <th>2XL</th>
              <th>3XL</th>
              <th>Кол-во</th>
            </tr>
          </thead>
          <tbody>
            {this.state.colors.map((color, index) => <Line key={color.id} actions={this.props.actions} color={color.hex}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}
