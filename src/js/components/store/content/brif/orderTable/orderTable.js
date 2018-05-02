import styles from "./orderTable.css";
import React from "react";
import Line from "./tableLine";


export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.getColors = this.getColors.bind(this);
    this.countSumm = this.countSumm.bind(this);
  }
  componentWillReceiveProps(nextProps){
  }
  getColors(){
    let colors = [];
    for (let key in this.props.order.sizes) {
        let colorId = this.props.colors.find((item) => item.name == key).id;
        colors.push(this.props.colors.find((item) => item.id == colorId));

    }
    return colors;
  }
  countSumm(){
    let summ = 0;
    for(let key in this.props.order.sizes){
      summ += this.props.order.sizes[key].reduce((sum, current) => {
        return +sum + +current;
      });
    }
    return summ;
  }
  componentDidMount(){
    this.getColors();
  }

  render() {

    return (
      <div>
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
          {this.getColors().map((color, index) => <Line sizes={this.props.order.sizes[color.name]} key={color.id} color={color.hex}/>)}
        </tbody>
      </table>
      <div className={styles.summCounter}>
        <span className={styles.summCounter__label}>Количество изделий: </span> 
        <span className={styles.summCounter__value}>{this.countSumm()}</span>
      </div>
      </div>
    );
  }
}
