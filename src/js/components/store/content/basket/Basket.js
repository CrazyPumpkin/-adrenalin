import styles from "./Basket.css";
import React from "react";
import BasketTable from "./BasketTable/BasketTable"
import { connect } from "react-redux";
import { Link } from "react-router";
import EmptyBasket from "./isEmpty/isEmpty"
import ManagerContact from 'elements/ManagerContact/ManagerContact';

function mapStateToProps(state) {
	return {
		basketOrder: state.Reducer.basketOrder
	};
}

@connect(mapStateToProps)
export default class Basket extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		console.log(this.props.basketOrder);
	}
	render() {
		return (
			<div>
				{(Object.keys(this.props.basketOrder.data).length !== 0) ? <BasketTable /> : <EmptyBasket />}
				<div className={styles.contact}>
					<ManagerContact />
				</div>
			</div>
		);
	}
}
