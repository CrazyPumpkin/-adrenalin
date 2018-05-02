import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import ContactForm from 'elements/ContactForm/ContactForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    contactModal: state.Reducer.contactModal
  }
}

@connect(mapStateToProps)
export default class Store extends React.Component {
  constructor(props) {
    super(props)
    this.getRoute = this.getRoute.bind(this);
  }

  getRoute() {
    let currentLink = this.props.routes[this.props.routes.length-1].path;
    let separate = currentLink.split('/');
    let page = separate[separate.length-1];
    return page
  }

	render() {
		return (
      <div>
          <Header page={this.getRoute()}/>
          {this.props.children}
          <Sidebar page={this.getRoute()}/>
          {(this.props.contactModal)? <ContactForm /> :''}
      </div>
		);
	}
}
