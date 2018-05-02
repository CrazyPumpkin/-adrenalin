import React from "react";
import ColorItem from "./colorItem";
import { connect } from 'react-redux';
import Isvg from "react-inlinesvg";
import styles from "./colors.css";


function sidebarColorState(state) {
  console.log(state.Reducer);
  return {
    colors: state.Reducer.colors
  }
}

@connect(sidebarColorState)
export default class Colors extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        colors: (this.props.colors.length)? this.props.colors.slice(0,9): [],
        onPage: 9,
        currentPage: 1,
        previosClickedNext: false,
        previosClickedPrev: false,

      };
    this.nextColors = this.nextColors.bind(this);
    this.prevColors = this.prevColors.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("Next Props", nextProps);
    if (this.props.colors != nextProps.colors){
      this.setState({
        colors: nextProps.colors.slice(0, this.state.onPage * (this.state.currentPage)),
      });
    }
  }

  nextColors(){
    if(this.state.currentPage * this.state.onPage > this.props.colors.length - 1) return null;

    let currentPage = (this.state.previosClickedPrev)? this.state.currentPage + 1: this.state.currentPage;

    this.setState({
      colors: this.props.colors.slice(this.state.onPage * currentPage, this.state.onPage * (currentPage + 1)),
      currentPage: currentPage + 1,
      previosClickedNext: true,
      previosClickedPrev: false
    });
  }

  prevColors(){
    if(!this.state.currentPage) return null;
    let currentPage = (this.state.previosClickedNext)? this.state.currentPage - 1: this.state.currentPage;
    this.setState({
      colors: this.props.colors.slice(this.state.onPage * (currentPage - 1), this.state.onPage * currentPage),
      currentPage: currentPage - 1,
      previosClickedNext: false,
      previosClickedPrev: true
    });
  }
  render() {
    return(
      <div className={styles.wrapper}>
        <div onClick={this.prevColors}>
          <Isvg className={styles.icon} src={"./img/chevron-up.svg"}/>
        </div>
        {this.state.colors.map((color) => <ColorItem key={color.id} actions={this.props.actions} setColor={color}/>)}
        <div onClick={this.nextColors}>
          <Isvg className={styles.icon + ' ' + styles.icon_bottom} src={"./img/chevron-down.svg"}/>
        </div>
      </div>
    );
  }
}
