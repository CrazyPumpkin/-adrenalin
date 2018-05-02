import styles from './contactForm.css'
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
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 3
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
export default class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.closeContactModal = this.closeContactModal.bind(this);
  }
  closeContactModal(){
    this.props.actions.openContactModal(false);
  }
    render() {
        return (
          <div className={styles.wrapper}>
            <Modal contentLabel={'Менеджер'} onRequestClose={() => this.closeContactModal()} isOpen={this.props.contactModal} style={customStyles}>
                <div className={styles.confirm__wrap}>
                  <header className={styles.header}>
                    <span className={styles.heading}>Контактная информация для связи с Вами</span>
                  </header>
                  <section className={styles.section}>
                    <input className={styles.textInput} type="text" placeholder="Имя"/>
                    <input className={styles.textInput} type="text" placeholder="Номер телефона"/>
                    <input className={styles.textInput} type="text" placeholder="Email"/>
                  </section>
                  <footer className={styles.footer}>
                    <span onClick={() => this.closeContactModal()} className={styles.bttn + ' ' + styles.bttn_cancel}>Отмена</span>
                    <span className={styles.bttn + ' ' + styles.bttn_submit}>Готово</span>
                  </footer>
                </div>
            </Modal>
          </div>
        );
    }
}
