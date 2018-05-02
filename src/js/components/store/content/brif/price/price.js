import styles from "./price.css";
import React from 'react';

export default class PrintArea extends React.Component {
    constructor(props) {
        super(props)
        this.countSumm = this.countSumm.bind(this);
    }
    countSumm(){
      let summ = 0;
      for(let i = 0; i < this.props.order.price.length; i++){
        summ += this.props.order.price[i].value * this.props.order.price[i].quantity;
      }
      return summ;
    }
    render() {
        return (
            <div>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <div>Наименование</div>
                        <div>Кол-во</div>
                        <div>Цена 1 ед</div>
                        <div>Сумма</div>
                    </div>
                    <div className={styles.body}>
                      {
                        this.props.order.price.map((item, index) => {return (
                          <div key={index} className={styles.row}>
                              <div>{item.name}</div>
                              <div>{item.quantity}</div>
                              <div>{item.value}</div>
                              <div>{item.value * item.quantity}</div>
                          </div>
                        )})
                      }
                    </div>
                </div>
                <div className={styles.summ}>
                  <span className={styles.label}>Общая стоимость</span>
                  <span className={styles.value}>
                    {this.countSumm()}
                  </span>
                </div>
            </div>
        );
    }
}
