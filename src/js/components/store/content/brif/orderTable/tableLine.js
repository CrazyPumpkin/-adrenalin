import styles from "./orderTable.css";
import React from "react";
import LineItem from "./tableLineItem";
import { connect } from "react-redux";

function tableLineState(state) {
  return {
      allSizes: state.Reducer.sizeList,
  }
}

@connect(tableLineState)
export default class tableLine extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr className={styles.line}>
        <td>
          <span className={styles.color} style={{color: this.props.color}}></span>
        </td>
        {this.props.allSizes.map((iSize, index) => <LineItem key={iSize} iSize={iSize} value={this.props.sizes[index]} index={index} />)}
        <td><span className={styles.counter}>
            { this.props.sizes.reduce((sum, current) => {
              return +sum + +current;
            })}
            </span>
        </td>
      </tr>
    )
  }
}
