import styles from "./Sidebar.css";
import React from "react";
import Menu from "./menu/Menu";
import FilterBar from "./filterBar/filterBar";
import { connect } from 'react-redux';

import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';  // import
import { bindActionCreators } from 'redux';
import Test from './test/test';


function SidebarTogglelState(state) {
  return {
    isOpen: state.Reducer.isOpen,
    sidebarActive: state.Reducer.sidebarActive
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(SidebarTogglelState, mapDispatchToProps)
export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.openSidebarHandler = this.openSidebarHandler.bind(this);
    // this.props.actions.activeSidebar(this.props.sidebarActive);
  }

  openSidebarHandler(e) {
    e.stopPropagation();
    if (!this.props.isOpen) {
      this.props.actions.sidebarToggle(this.props.isOpen);
      setTimeout(() => {
        this.props.actions.activeSidebar(this.props.sidebarActive);
      }, 10);
    } else {
      this.props.actions.activeSidebar(this.props.sidebarActive);
      setTimeout(() => {
        this.props.actions.sidebarToggle(this.props.isOpen);
      }, 300);
    }
  }

  render () {
    return (
      <aside className={styles.wrap}>
        <a onClick={this.openSidebarHandler} className={styles.toggleBtn + " " +  (this.props.isOpen ? styles.toggleBtn_visible : "")}>
          <span></span>
        </a>
        {this.props.isOpen ? <Menu open={this.props.open} menuHandler={this.openSidebarHandler}/> : null}
        {/*<Test mounted={this.props.isOpen} />*/}

        <FilterBar page={this.props.page} actions={this.props.actions}/>
      </aside>
    );
  }
};
