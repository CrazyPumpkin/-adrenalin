import styles from "./info.css"
import React from "react";
import { connect } from 'react-redux';
import PriceTable from "./PriceTable";
import { Motion, spring} from 'react-motion';
import { Link } from 'react-router';


function openOrderState(state) {
  return {
    orderIsOpen: state.Reducer.orderIsOpen,
    product: state.Reducer.product,
    routerParams: state.routerParams
  }
}

@connect(openOrderState)
export default class productInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    if(!this.props.product.id) return( <div>Loading</div> )
    return(

      <div className={styles.info}>
        <table className={styles.priceTable}>

          <thead>
            <tr className={styles.priceHead}>
              <th>
                Количество
              </th>
              <th>
                Стоимость
              </th>
            </tr>
          </thead>

          <tbody>
            { this.props.product["price"].map((item, index) => <PriceTable key={index} price={item} index={index}/>) }
          </tbody>

        </table>
        {/*<span className={styles.mark}>Выбор различных цветов не влияет на стоимость</span>*/}
        <span className={styles.description}>{this.props.product.description}</span>

        <span className={styles.line}>
          <strong className={styles.lineTitle}>Состав</strong>
          <span className={styles.lineColumn}>
            {this.props.product.material}
          </span>
        </span>
        <span className={styles.line}>
          <strong className={styles.lineTitle}>Плотность</strong>
          <span className={styles.lineColumn}>
            {this.props.product.density + ' г/м'} <sup>2</sup>
          </span>
        </span>


      <footer className={styles.footer}>
        <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/order'} activeClassName={'active'} className={styles.button}>Выбрать размеры</Link>
      </footer>
      </div>
    )
  }
}
