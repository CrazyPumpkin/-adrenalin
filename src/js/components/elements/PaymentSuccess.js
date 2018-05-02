import React from "react";


export default class PaymentSuccess extends React.Component {
	render() {
		return (
      <div>
				<p>Success Message</p>
				<button onClick={this.props.closeModal}>ok</button>

			</div>
		);
	}
}
