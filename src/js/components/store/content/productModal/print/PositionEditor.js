import styles from "./PositionEditor.css";
import React from "react";
import Isvg from 'react-inlinesvg';
import Modal from 'react-modal';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MAX_WIDTH = '356';
const MAX_SHIRT_WIDTH = '600';

const customStyles = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%,-50%)',
    border : 'none',
    boxShadow : '0px 1px 19px rgba(0,0,0,.5)',
    borderRadius: '5px',
    overflow: 'visible',
    padding: '0',
  },
  overlay: {
    backgroundColor: 'transparent'
  }
};

function mapStateToProps(state) {
  return {
    order: state.Reducer.order,
    reducer: state.Reducer,
    actions: state.actions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PositionEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: true,
      currentSize: this.props.currentSize,
      nextSize: 0,
      prevSize: 0,
      // sizeList
      // orederSizes
    };
    this.closeModal = this.closeModal.bind(this);
    this.nextSize = this.nextSize.bind(this);
    this.prevSize = this.prevSize.bind(this);
    this.slideNext = this.slideNext.bind(this);
    this.slidePrev = this.slidePrev.bind(this);
    this.countSize = this.countSize.bind(this);
    this.movePrint = this.movePrint.bind(this);
    this.changeOffsetLeft = this.changeOffsetLeft.bind(this);
    this.changeOffsetTop = this.changeOffsetTop.bind(this);
    this.setStandartPosition = this.setStandartPosition.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.addListener = this.addListener.bind(this);
    // this.mouseMove = this.mouseMove.bind(this);
    }
  componentWillMount(){
    this.nextSize(this.state.currentSize);
    this.prevSize(this.state.currentSize);
  }
  componentDidMount(){
    this.addListener(true);
  }
  componentWillUnmount(){
    this.addListener(false);
  }
  addListener(flag){
    if(flag){
      document.addEventListener('keydown',this.keydownHandler);
    }
    else{
      document.removeEventListener('keydown',this.keydownHandler);
    }
  }
  setStandartPosition(){
    let order = this.props.order;
    //Calculate middle
    order.prints[this.props.id].offsets[this.state.currentSize][0];

    let accessAreaWidth = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0],
        accessAreaHeight = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1],
        printWidth = order.prints[this.props.id].size[0],
        printHeight = order.prints[this.props.id].size[1],
        offsetLeft = (accessAreaWidth / 2) - (printWidth / 2),
        offsetTop = (accessAreaHeight / 2) - (printHeight / 2);

    order.prints[this.props.id].offsets[this.state.currentSize][0] = Math.round(offsetLeft);
    order.prints[this.props.id].offsets[this.state.currentSize][1] = Math.round(offsetTop);

    this.props.actions.saveOrderChanges(order);
  }
  //Функция обрабатывающая изменения положения с клавиатуры
  keydownHandler(e){
    let order = JSON.parse(JSON.stringify(this.props.order)),
        accessAreaWidth = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0],
        accessAreaHeight = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1],
        printWidth = order.prints[this.props.id].size[0],
        printHeight = order.prints[this.props.id].size[1];

    switch (e.keyCode) {
      case 37:
          order.prints[this.props.id].offsets[this.state.currentSize][0] -= 1;
          break;
      case 38:
          order.prints[this.props.id].offsets[this.state.currentSize][1] -= 1;
          break;
      case 39:
          order.prints[this.props.id].offsets[this.state.currentSize][0] += 1;
          break;
      case 40:
          order.prints[this.props.id].offsets[this.state.currentSize][1] += 1;
          break;
      default:
          console.log('error');
    }
    if(order.prints[this.props.id].offsets[this.state.currentSize][1] > accessAreaHeight ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] > accessAreaWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] < -printWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][1] < -printHeight){
    return null;
  }

    this.props.actions.saveOrderChanges(order);
  }

  movePrint(direction) {
      let order = JSON.parse(JSON.stringify(this.props.order)),
          accessAreaWidth = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0],
          accessAreaHeight = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1],
          printWidth = order.prints[this.props.id].size[0],
          printHeight = order.prints[this.props.id].size[1];
      switch (direction) {
          case 'left':
              order.prints[this.props.id].offsets[this.state.currentSize][0]-=10;
              break;
          case 'top':
              order.prints[this.props.id].offsets[this.state.currentSize][1]-=10;
              break;
          case 'right':
              order.prints[this.props.id].offsets[this.state.currentSize][0]+=10;
              break;
          case 'bottom':
              order.prints[this.props.id].offsets[this.state.currentSize][1]+=10;
              break;
          default:
              console.log('error');
      }
      if(order.prints[this.props.id].offsets[this.state.currentSize][1] > accessAreaHeight ||
         order.prints[this.props.id].offsets[this.state.currentSize][0] > accessAreaWidth ||
         order.prints[this.props.id].offsets[this.state.currentSize][0] < -printWidth ||
         order.prints[this.props.id].offsets[this.state.currentSize][1] < -printHeight){
      return null;
    }
      this.props.actions.saveOrderChanges(order);
  }

  changeOffsetLeft(e){
    let order = JSON.parse(JSON.stringify(this.props.order)),
        accessAreaWidth = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0],
        accessAreaHeight = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1],
        printWidth = order.prints[this.props.id].size[0],
        printHeight = order.prints[this.props.id].size[1];
    // let prints = this.state.prints;
    if(e.keyCode == 38){
      order.prints[this.props.id].offsets[this.state.currentSize][0]++;
    } else if(e.keyCode == 40){
      order.prints[this.props.id].offsets[this.state.currentSize][0]--;
    } else {
      order.prints[this.props.id].offsets[this.state.currentSize][0] = e.target.value;
    }
    if(order.prints[this.props.id].offsets[this.state.currentSize][1] > accessAreaHeight ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] > accessAreaWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] < -printWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][1] < -printHeight){
    return null;
  }
    this.props.actions.saveOrderChanges(order);
  }
  changeOffsetTop(e){
    let order = JSON.parse(JSON.stringify(this.props.order)),
        accessAreaWidth = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0],
        accessAreaHeight = this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1],
        printWidth = order.prints[this.props.id].size[0],
        printHeight = order.prints[this.props.id].size[1];
    // let prints = this.state.prints;
    if(e.keyCode == 38){
      order.prints[this.props.id].offsets[this.state.currentSize][1]++;
    } else if(e.keyCode == 40){
      order.prints[this.props.id].offsets[this.state.currentSize][1]--;
    } else {
      order.prints[this.props.id].offsets[this.state.currentSize][1] = e.target.value;
      // prints[this.props.index].size[0] = e.target.value;
    }
    if(order.prints[this.props.id].offsets[this.state.currentSize][1] > accessAreaHeight ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] > accessAreaWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][0] < -printWidth ||
       order.prints[this.props.id].offsets[this.state.currentSize][1] < -printHeight){
    return null;
  }
    this.props.actions.saveOrderChanges(order);
    // this.setState({prints:prints});
  }

  countSize(size){
    return MAX_WIDTH * size / MAX_SHIRT_WIDTH;
  }
  closeModal(){
    this.setState({isOpen: false});
    this.props.onClose();
  }
  nextSize(currentSize){
    let nextSize = 0;
    let counter = 0;
    nextSize = currentSize + 1;

    while(!this.props.orderSizes[nextSize]){
      nextSize++;
      counter++;
      if (nextSize > this.props.sizeList.length - 1)
      nextSize = 0;
      if (counter == this.props.sizeList.length)
      return null;
    }
    this.setState({nextSize:nextSize});
  }
  prevSize(currentSize){
    let nextSize = 0;
    let counter = 0;
    nextSize = currentSize - 1;

    while(!this.props.orderSizes[nextSize]){
      nextSize--;
      counter++;
      if (nextSize < 0)
      nextSize = this.props.sizeList.length - 1;
      if (counter == this.props.sizeList.length)
      return null;
    }
    this.setState({ prevSize: nextSize });
  }
  slideNext(){
    this.setState({
      currentSize: this.state.nextSize
    });
    this.nextSize(this.state.nextSize);
    this.prevSize(this.state.nextSize);
  }
  slidePrev(){
    this.setState({
      currentSize: this.state.prevSize
    });
    this.prevSize(this.state.prevSize);
    this.nextSize(this.state.prevSize);
  }
  render() {

    return (
      <Modal isOpen={this.state.isOpen}  onRequestClose={this.closeModal} style={customStyles} contentLabel={"Расположение печати на изделии"}>
          <div onKeyDown={this._keyDownHandler} className={styles.wrap}>
            <div className={styles.header}>
              <span>Расположение печати на изделии</span>
              <div onClick={this.closeModal} className={styles.close}>
                ×
              </div>

            </div>
            <div className={styles.body}>
              <div onClick={this.openPositionEditor} className={styles.sizeItem + ' ' + styles.noselect}>
                <div className={styles.shirt}
                  style={{width: this.countSize(this.props.shirtPrintParams[this.props.print.area].size[this.state.currentSize][0]) + 'px'}}>
                  <div id={'accessArea'}  className={styles.accessArea}
                        style={{
                          width: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0]) + 'px'),
                          height: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][1]) + 'px'),
                          top: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedOffset[this.state.currentSize]) + 'px')
                        }}>
                    <div id={'print'} className={styles.print}
                      style={{
                        width: this.countSize(this.props.order.prints[this.props.id].size[0]) + 'px',
                        height: this.countSize(this.props.order.prints[this.props.id].size[1]) + 'px',
                        left: this.countSize(this.props.order.prints[this.props.id].offsets[this.state.currentSize][0]) + 'px',
                        top: this.countSize(this.props.order.prints[this.props.id].offsets[this.state.currentSize][1]) + 'px'
                      }}>
                      <img src={this.props.print.img} alt=""/>

                      <div className={styles.resizePointWrapper}>
                        <div onClick={() => this.movePrint('left')} className={styles.resizePoint + ' ' + styles.resizePoint_left}>
                          <Isvg src="./img/resizePoint.svg" />
                        </div>
                        <div onClick={() => this.movePrint('top')} className={styles.resizePoint + ' ' + styles.resizePoint_top}>
                          <Isvg src="./img/resizePoint.svg" />
                        </div>
                        <div onClick={() => this.movePrint('right')} className={styles.resizePoint + ' ' + styles.resizePoint_right}>
                          <Isvg src="./img/resizePoint.svg" />
                        </div>
                        <div onClick={() => this.movePrint('bottom')} className={styles.resizePoint + ' ' + styles.resizePoint_bottom}>
                          <Isvg src="./img/resizePoint.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.offsetWrapper}
                        style={{
                          top:(this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedOffset[this.state.currentSize]) + 'px'),
                          left: '50%',
                          marginLeft:('-' + this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedSize[this.state.currentSize][0] / 2) + 'px')
                        }}>
                    <div className={styles.top}
                      style={{
                        height: this.countSize(this.props.order.prints[this.props.id].offsets[this.state.currentSize][1]) + 'px'
                      }}>
                      <div className={styles.input}>
                      <input type="text"
                             value={this.props.order.prints[this.props.id].offsets[this.state.currentSize][1]}
                             onChange={this.changeOffsetTop}
                             onKeyDown={this.changeOffsetTop}
                             onFocus={() => this.addListener(false)}
                             onBlur={() => this.addListener(true)}
                             />
                      </div>
                    </div>
                    <div className={styles.left}
                      style={{
                        width: this.countSize(this.props.order.prints[this.props.id].offsets[this.state.currentSize][0]) + 'px'
                      }}>
                      <div className={styles.input}>
                      <input type="text"
                             value={this.props.order.prints[this.props.id].offsets[this.state.currentSize][0]}
                             onChange={this.changeOffsetLeft}
                             onKeyDown={this.changeOffsetLeft}
                             onFocus={() => this.addListener(false)}
                             onBlur={() => this.addListener(true)}
                             />
                      </div>
                    </div>
                  </div>
                  <Isvg src={this.props.shirtPrintParams[this.props.print.area].fullImage[this.state.currentSize]}/>

                </div>
                <div className={styles.size}>
                  <div className={styles.sizeLabel}>{this.props.shirtPrintParams[this.props.print.area].size[this.state.currentSize][0] + ' мм'}</div>
                  <div className={styles.arrow + ' ' + styles.arrow_x}>
                      <Isvg src="./img/arrow-left.svg"/>
                  </div>
                  <div className={styles.arrow + ' ' + styles.arrow_y}>
                      <Isvg src="./img/arrow-left.svg"/>
                  </div>
                </div>
                <div className={styles.label}>{this.props.sizeList[this.state.currentSize]}</div>
                <div className={styles.setDefault} onClick={this.setStandartPosition}>Стандартное расположение</div>
                <div onClick={this.slidePrev} className={styles.slide + ' ' + styles.slide_prev}> {'< ' + this.props.sizeList[this.state.prevSize]} </div>
                <div onClick={this.slideNext} className={styles.slide + ' ' + styles.slide_next}> {this.props.sizeList[this.state.nextSize] + ' >'} </div>
              </div>
            </div>
          </div>
      </Modal>
    )
  }
}
