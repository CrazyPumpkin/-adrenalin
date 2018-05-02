import React from "react";


export default class PaymentError extends React.Component {
	render() {
		return (
      <div>
				<p>Error Message</p>
				<button onClick={() => this.props.setTab('paymentsuccess')}>ok</button>

			</div>
		);
	}
}
