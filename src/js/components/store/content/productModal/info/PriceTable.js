import styles from "./info.css";
import React from "react";

export default class PriceTable extends React.Component {

  render() {
    return(
      <tr>
        <td>
          {this.props.price.counter + ' +'}
        </td>
        <td>
          {this.props.price.value + ' Р'}
        </td>
      </tr>
    )
  }
}
