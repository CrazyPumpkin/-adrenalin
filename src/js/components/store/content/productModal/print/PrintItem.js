import styles from "./PrintItem.css";
import React from "react";
import Isvg from 'react-inlinesvg';
import PositionEditor from './PositionEditor';
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
    prints: state.Reducer.order.prints,
    actions: state.actions
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}



@connect(mapStateToProps, mapDispatchToProps)
export default class PrintItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isPositionEditorOpened: false,
      currentSize: '',
    };
    this.openPositionEditor = this.openPositionEditor.bind(this);
    this.countPrice = this.countPrice.bind(this);
    this.editComment = this.editComment.bind(this);
    // this.dragStart = this.dragStart.bind(this);
    // this.dragEnd = this.dragEnd.bind(this);
    this.isPrintReady = this.isPrintReady.bind(this);
    this.isPrintClosed = this.isPrintClosed.bind(this);
    this.removeImage = this.removeImage.bind(this);

  }
  // dragStart(e){
  //   const dragIcon = document.createElement('img');
  //   dragIcon.src = this.props.print.img;
  //   dragIcon.width = 100;
  //
  //   e.dataTransfer.setDragImage(dragIcon, -10, -10);
  //   e.dataTransfer.effectAllowed = "move";
  //   console.log('start');
  //   this.props.setDraggedPrint(this.props.id);
  //
  // }
  // dragEnd(e){
  //   console.log('end');
  //   this.props.setDraggedPrint(-1);
  // }
  openPositionEditor(size){
    this.setState({
      currentSize: size,
      isPositionEditorOpened: !this.state.isPositionEditorOpened
    });
    this.setColorQuantity = this.setColorQuantity.bind(this);
  }
  editComment(e){
    let order = this.props.order;
    order.prints[this.props.id].comment = e.target.value;
    this.props.actions.saveOrderChanges(order);
  }
  setColorQuantity(inc){
    let order = this.props.order;
    if(inc){
      order.prints[this.props.id].colors = (order.prints[this.props.id].colors < 5)?
                                            order.prints[this.props.id].colors + 1:
                                            order.prints[this.props.id].colors;
    }
    else
    order.prints[this.props.id].colors--;
    if(order.prints[this.props.id].colors < 1)
    order.prints[this.props.id].colors = 1

    this.props.actions.saveOrderChanges(order);
  }
  removeImage(){
    let order = this.props.order;
    order.prints[this.props.id].img = "";
    this.props.actions.saveOrderChanges(order);
  }
  isPrintReady(){
    return (!!this.props.print.img);
  }
  isPrintClosed(){
    return (this.props.currentPrint != this.props.id);
  }
  countPrice(){
    if (!this.props.prints[this.props.id].size)
    return 0;
    //Рассчет стоимости
    return Math.round(((this.props.prints[this.props.id].size[0] * this.props.prints[this.props.id].size[1]) * this.props.prints[this.props.id].colors) * 0.005);
  }
  render() {

    return (

      <div className={styles.wrap + ' ' +
        ((this.props.currentPrint == -1)? '' :
        ((this.props.currentPrint == this.props.id)? styles.wrap_opened:
        styles.wrap_hidden)) + ' ' +
        ((this.props.draggedPrint == this.props.id)? styles.wrap_dragged:'') + ' ' +
        ((this.props.removePrintId == this.props.id)? styles.wrap_remove:'')
       }
       onMouseLeave={() => this.props.setRemovePrint(-1)}
       >
       {/*  Минимизированный вид */}
        <div className={styles.tableWrap} onClick={(this.props.id != this.props.currentPrint)? () => this.props.openPrint(this.props.id): ''}>
          {/*  Хедер */}
          <div className={styles.header}>
            <div className={styles.header__item}>{(this.props.print.img)?this.props.print.img.split('/')[this.props.print.img.split('/').length - 1]: ''}</div>
            <div className={styles.header__item}>Место печати</div>
            <div className={styles.header__item}>Размер печати, мм</div>
            <div className={styles.header__item}>Цветность</div>
            <div className={styles.header__item}>Цена, 1 ед</div>
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
                <div className={styles.removeImg} onClick={this.removeImage}>×</div>
                <div className={styles.arrow + ' ' + styles.arrow_x}>
                  <Isvg src="./img/arrow-left.svg"/>
                </div>
                <div className={styles.arrow + ' ' + styles.arrow_y}>
                  <Isvg src="./img/arrow-left.svg"/>
                </div>
                <div className={styles.label + ' ' + styles.label_y}>{this.props.print.size[1] || 0}</div>
                <div className={styles.label + ' ' + styles.label_x}>{this.props.print.size[0] || 0}</div>
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
            <div onClick={() => this.setColorQuantity(false)} className={styles.less}>—</div>
            <div onClick={() => this.setColorQuantity(true)} className={styles.more}>+</div>
            <span className={styles.quantity}>
              {((this.props.prints[this.props.id].colors > 4)? '∞' : this.props.prints[this.props.id].colors) || 1}
            </span>
              <Isvg src="./img/color-circle.svg"/>
            </div>
            <div className={styles.body__item + ' ' + styles.body__item_emount}>{this.countPrice()} руб</div>
          </div>
        </div>


        {/*  Контент */}

        <div className={styles.body_full}>
          <div className={styles.commentWrapper}>
            <textarea onChange={this.editComment} className={styles.comment} value={this.props.print.comment || ''} placeholder="Комментарий"></textarea>
          </div>
          {(typeof this.props.print.area == 'number' || this.props.print.area)? (
            <SizeList
              sizeList={this.props.sizeList}
              orderSizes={this.props.orderSizes}
              print={this.props.print}
              shirtPrintParams={this.props.shirtPrintParams}
              openPositionEditor={this.openPositionEditor}/>
          ) :''}
        </div>
        {
          (this.props.id != 0)?
          <div className={styles.remove}>
            <div onClick={() => this.props.setRemovePrint(this.props.id)} className={styles.activate}>×</div>
            <div className={styles.bttnRemove} onClick={() => this.props.removePrint(this.props.is)}>
              <Isvg src="./img/dustbin.svg"/>
            </div>
          </div>
          : ''
        }
        {this.state.isPositionEditorOpened &&
          <PositionEditor
            orderSizes={this.props.orderSizes}
            sizeList={this.props.sizeList}
            print={this.props.print}
            currentSize={this.state.currentSize}
            shirtPrintParams={this.props.shirtPrintParams}
            onClose={this.openPositionEditor}
            id={this.props.id}/>
        }
      </div>
    )
  }
}
PrintItem.defaultProps = {
  orderSizes: [0,0,0,0,0,0,0]
}
