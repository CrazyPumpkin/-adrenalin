import styles from "./colorPallete.css";
import React from "react";
import ReactDOM from "react-dom";
import Isvg from "react-inlinesvg";
import { connect } from 'react-redux';
import ColorItem from 'elements/ColorPalleteItem';

import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';


function mapStateToProps(state) {
  return {
    colors: state.Reducer.colors,
    additionalColors: state.Reducer.additionalColors
  }
}
function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}
@connect(mapStateToProps, mapDispatchToProps)
export default class colorPallete extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      colors: this.props.colors,
    };
    this.addColor = this.addColor.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  //Закрытие модалки при клике вне ее
  componentWillMount() {
     document.addEventListener('click', this.handleClickOutside, false);
   }
   //Закрытие модалки при клике вне ее
   componentWillUnmount() {
   document.removeEventListener('click', this.handleClickOutside, false);
   }
   //Закрытие модалки при клике вне ее
   handleClickOutside(event) {
         // Получаем элемент, на который произведен клик
         const domNode = ReactDOM.findDOMNode(this);

         // Проверяем, что элемент присутствует в переменной,
         // а так же, является ли "domNode" узел потомком "event.target" узла.
         // Если не является, то скрываем элемент.
         if ((!domNode || !domNode.contains(event.target))) {
             this.props.onRequestClose();
         }
     }
  componentWillReceiveProps(nextProps){
    this.setState({
      colors: nextProps.colors,
    });
  }
  addColor(id){

    let colors = this.props.additionalColors;

    if (colors.findIndex((item) => item.id == id) != -1) return null;

    let newColor = this.props.colors.find((item) => item.id == id);
    colors.push(newColor);
    this.props.actions.setAdditionalColors(colors.slice());
    console.log(this.props.additionalColors);

    // this.setState({colors: colors.slice()});

  }
	render() {
		return (
      <div className={styles.palleteWrapper}>
        <div className={styles.header}>
          {this.state.colors.slice(0, 9).map((color) => <ColorItem handler={this.addColor} key={color.id} actions={this.props.actions} setColor={color}/>)}
        </div>
        <hr/>
        <div className={styles.body}>
          {this.state.colors.slice(9, this.state.colors.length + 1).map((color) => <ColorItem handler={this.addColor} key={color.id} actions={this.props.actions} setColor={color}/>)}
        </div>
      </div>
		);
	}
}
