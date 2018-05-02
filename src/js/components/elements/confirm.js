import styles from './confirm.css';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

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
    confirmModal: state.Reducer.confirmModal,
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
export default class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.confirmHandler = this.confirmHandler.bind(this);
  }

  closeModal() {
    this.props.actions.openConfirm(false);
    this.props.actions.orderIsChanged(false);
  }

  confirmHandler(e) {
    this.props.confirmHandler(e);
    this.props.actions.openConfirm(false);
  }

  render() {
    return (
      <Modal isOpen={this.props.confirmModal} onRequestClose={this.closeModal} contentLabel={this.props.contentLabel} style={customStyles}>
        <div className={styles.confirm__wrap}>
          {this.props.descriptionText.map((item, index) => <span key={index}className={styles.text}>{item}</span>)}
          <div className={styles.btn_wrap}>
            {this.props.disableText ? <a className={styles.btn} onClick={this.closeModal}>{this.props.disableText}</a> : null}
            {this.props.confirmText ? <a className={styles.btn} onClick={this.confirmHandler}>{this.props.confirmText}</a> : null}
          </div>
        </div>
      </Modal>
    );
  }
}
