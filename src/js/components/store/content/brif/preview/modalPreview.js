import styles from "./preview.css"
import React from "react";
import { connect } from 'react-redux';

function showPriceState(state) {
  return {
    calculationIsOpen: state.Reducer.calculationIsOpen,
    activeColor: state.Reducer.activeColor,
    products: state.Reducer.products,
    routerParams: state.routerParams,
  }
}

@connect(showPriceState)
export default class productPreview extends React.Component {
  constructor(props) {
    super(props);
    this.getActivePreviw = this.getActivePreviw.bind(this);
  }

  getActivePreviw() {
    let img = [];
    for (let key in this.props.order.sizes) {
        let colorId = this.props.colors.find((item) => item.name == key).id;
        img.push(this.props.product.colors.find((item) => item.id == colorId).front);

    }
    return img;
  }

  render() {
    let previews = this.getActivePreviw();
    return (
      <div className={styles.thumb}>
          <span style={{right: -40 * previews.length + 'px' }} className={styles.thumbWrap}>
            {previews.map((item, index) => { return (
              <img style={{marginLeft: -40 * index + 'px', transform: 'scale('+ (1 - ((previews.length - 1) - index) / 15) +')'}} key={index} src={item}/>
            )})}
          </span>
      </div>
    )
  }
}
