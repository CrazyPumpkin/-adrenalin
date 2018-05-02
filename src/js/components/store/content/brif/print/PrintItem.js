import styles from "./PrintItem.css";
import React from "react";
import Isvg from 'react-inlinesvg';
import PrintAreas from './PrintAreas';
import SizeEditor from './SizeEditor';
import SizeList from './SizeList';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    order: state.Reducer.order,
    reducer: state.Reducer,
    prints: state.Reducer.basketOrder.data.find((item) => state.routerParams.params.orderId == item.orderId).prints,
    actions: state.actions
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

const dragIcon = document.createElement('img');
dragIcon.src = '/img/print1.png';
dragIcon.width = 100;

@connect(mapStateToProps, mapDispatchToProps)
export default class PrintItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentSize: '',
    };

  }

  render() {
    if(typeof(this.props.prints) =="undefined") return (<div>Loading</div>);
    return (

      <div className={styles.wrap + ' ' + styles.wrap_opened}>
       {/*  Минимизированный вид */}
        <div className={styles.tableWrap}>
          {/*  Хедер */}
          <div className={styles.header}>
            <div className={styles.header__item}>{(this.props.print.img)?this.props.print.img.split('/')[this.props.print.img.split('/').length - 1]: ''}</div>
            <div className={styles.header__item}>Место печати</div>
            <div className={styles.header__item}>Размер печати, см</div>
            <div className={styles.header__item}>Количество цветов</div>
          </div>
          {/*  Контент */}
          <div className={styles.body}>
            {/*  Болк загрузки изображения */}
            <div className={styles.body__item + ' ' + styles.body__item_imgUpload}>
            {/*  Если изображение есть, показать превью, иначе показать загрузчки изображения */}
            {(this.props.print.img)?(
              <div className={styles.image + ' ' +
                ((this.props.currentPrint == this.props.id)? styles.image_opened : '')}>
                <img src={this.props.print.img} alt=""/>
              </div>
            ):(
              <div className={styles.newImage}>
                <button className={styles.buttonUpload} type="button">Загрузить файл</button>
                <p>Изображение возможно загрузить
                  в форматах .jpg .png .pdf .psd .cdr</p>
              </div>
            )}
            </div>
            <div className={styles.body__item}>
              <PrintAreas print={this.props.print} printIndex={this.props.id} shirtPrintParams={this.props.shirtPrintParams}/>
            </div>
            <div className={styles.body__item}>
              <SizeEditor index={this.props.id} active={(this.props.currentPrint == -1)? false : true} print={this.props.print} />
            </div>
            <div className={styles.body__item + ' ' + styles.body__item_colors}>
            <div className={styles.less}>—</div>
            <div className={styles.more}>+</div>
            <span className={styles.quantity}> {this.props.prints[this.props.id].colors || 1} </span>
              <Isvg src="./img/color-circle.svg"/>
            </div>
          </div>
        </div>


        {/*  Контент */}

        <div className={styles.body_full}>
          {(typeof this.props.print.area == 'number' || this.props.print.area)? (
            <SizeList
              sizeList={this.props.sizeList}
              orderSizes={this.props.orderSizes}
              print={this.props.print}
              shirtPrintParams={this.props.shirtPrintParams}/>
          ) :''}
          <div className={styles.commentWrapper}>
            <p className={styles.comment} >{this.props.print.comment}</p>
          </div>
        </div>
      </div>
    )
  }
}
PrintItem.defaultProps = {
  orderSizes: [0,0,0,0,0,0,0]
}
