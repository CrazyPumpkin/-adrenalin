import styles from "./preview.css"
import React from "react";

// import PriceHint from './priceHint';
import { connect } from 'react-redux';

function showPriceState(state) {
  return {
    additionalColors: state.Reducer.additionalColors,
    calculationIsOpen: state.Reducer.calculationIsOpen,
    activeColor: state.Reducer.activeColor,
    product: state.Reducer.product,
    routerParams: state.routerParams,
    order: state.Reducer.order,
    colors: state.Reducer.colors,
  }
}

@connect(showPriceState)
export default class productPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: 'front',
    };
    this.getActivePreviw = this.getActivePreviw.bind(this);
    this.setSide = this.setSide.bind(this);
    this.loadSliderPreview = this.loadSliderPreview.bind(this);
    this.activeSlide = this.activeSlide.bind(this);
    this.loadSizesPreview = this.loadSizesPreview.bind(this);
    this.loadPreview = this.loadPreview.bind(this);
    this.loadArrayPreview = this.loadArrayPreview.bind(this);
    this.getActivePreviews = this.getActivePreviews.bind(this);
  }

  activeSlide() {
    return this.state.side;
  }
  //Превью с картинкой майки
  loadPreview(){
    return(
      <span className={styles.thumbWrap}>
        <img src={this.getActivePreviw()[0][(this.props.routerParams.params.tab == 'info')? this.state.side : 'front']}/>
      </span>
    );
  }

  //Версия превью для табель мера
  loadSizesPreview(){
    console.log(styles);
    return (
      <div>
        {this.loadPreview()}
        <div className={styles.axisWrapper}>
          <div className={styles.axisWrapper__axe + ' ' + styles.axisWrapper__axe_y}>
            <span className={styles.label}>Y, мм</span>
          </div>
          <div className={styles.axisWrapper__axe + ' ' + styles.axisWrapper__axe_x}>
            <span className={styles.label}>X, мм</span>
          </div>
        </div>
    </div>
    );
  }
  getActivePreviews() {
    let img = [];
    for (let key in this.props.order.sizes) {
        let colorId = this.props.colors.find((item) => item.name == key).id;
        img.push(this.props.product.colors.find((item) => item.id == colorId).front);

    }
    if (!img.length){
      img.push(this.getActivePreviw()[0][(this.props.routerParams.params.tab == 'info')? this.state.side : 'front']);
    }
    return img;
  }
  //Версия со слайдером сторон маек
  loadSliderPreview(){
    return (
      <div>
        {this.loadPreview()}
        <div>
          <div className={styles.preview_dots + ' ' + (this.activeSlide() == 'front' ? styles.preview_dots_active : "") } onClick={() => this.setSide('front')}></div>
          <div className={styles.preview_dots + ' ' + (this.activeSlide() == 'side' ? styles.preview_dots_active : "") } onClick={() => this.setSide('side')}></div>
          <div className={styles.preview_dots + ' ' + (this.activeSlide() == 'back' ? styles.preview_dots_active : "") } onClick={() => this.setSide('back')}></div>
        </div>
      </div>
    );
  }
  loadArrayPreview(){
    let previews = this.getActivePreviews();
    let lastPreviews = previews.slice(previews.length - 4, previews.length);
    return (
      <div className={styles.previewsArray}>
          <span style={{right: -20 * (lastPreviews.length - 1) + 'px' }} className={styles.thumbWrap}>
            { lastPreviews.map((item, index) => { return (
              <img style={{marginLeft: -20 * index + 'px', transform: 'scale('+ (1 - ((lastPreviews.length - 1) - index) / 15) +')'}} key={index} src={item}/>
            )})}
          </span>
      </div>
    );
  }
  getActivePreviw() {
    let result = this.props.product.colors.filter(( obj ) => {
      return obj.id == ((this.props.additionalColors.length)? this.props.additionalColors[0].id: this.props.routerParams.params.color);
    });
    return result;
  }
  setSide(side){
    this.setState({side:side});
  }

  render() {
    return (
      <div className={styles.thumb}>
          {
            (this.props.routerParams.params.tab == 'info')
            ? this.loadSliderPreview()
            : (this.props.routerParams.params.tab == 'sizes')
            ? this.loadSizesPreview()
            : (this.props.routerParams.params.tab == 'order')
            ? this.loadArrayPreview()
            : this.loadPreview()
          }
      </div>
    )
  }
}
