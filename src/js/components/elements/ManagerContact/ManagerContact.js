import styles from './ManagerContact.css'
import React,{Component} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import Isvg from 'react-inlinesvg';
import * as Actions from 'actionCreators';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

const customStyles = {
  content : {
    width: '530px',
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    transform : 'translate(-50%,-50%)',
    border : 'none',
    boxShadow : '0px 0px 32px 0 rgba(76,76,76,.29)',
    borderRadius: '4px',
    overflow: 'visible',
    padding: 0,
    zIndex: 99
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
};

function mapStateToProps(state) {
  return {
    contactModal: state.Reducer.contactModal
  }
}
function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators(Actions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ManagerContact extends Component {
  constructor(props) {
    super(props);
    this.openContactModal = this.openContactModal.bind(this);

  }
  openContactModal(flag) {
    this.props.actions.openContactModal(flag);
  }

    render() {
        return (
          <div>
            <div className={styles.contact} onClick={() => this.openContactModal(true)}>
              <Isvg src="./img/manager-phone.svg"/>
              <span>Связаться с менеджером</span>
            </div>
          </div>
        );
    }
}
