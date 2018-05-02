import * as actionTypes from "actionTypes";

const initialState = {
	isOpen: false,
	products: [],
	color: "000",
	// sex: "male",
	modalIsOpen: true,
	product: {id:false},
	orderIsOpen: false,
	colors: [],
	sizes: [],
	sizesIsOpen: false,
	sizeList: [
		"XS", "S", "M", "L", "XL", "XXL", "XXXL"
	],
	order: {
		sizes:{},
		prints:[],
	},
	calculationIsOpen: false,
	amount: 0,
	basketOrder: {
    "data": [{
			"orderId": "1",
			"modelId": "000",
			"status": 0,
			"sizes": {
				"white": ["", "3", "3", "3", "", "", ""],
				"red": ["3", "", "", "", "3", "", ""]
			},
			"prints":[{
					"img": "./img/print1.png",
					"size": [200, 100],
					"area": 0,
					"offsets": [
							[50, 0],
							[0, 30],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 3,
					"comment": "Lorem ipsum"
			}, {
					"img": "./img/print1.png",
					"size": [200, 100],
					"area": 0,
					"offsets": [
							[50, 0],
							[0, 30],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 3,
					"comment": "Lorem ipsum"
			}, {
					"img": "./img/print2.png",
					"size": [300, 200],
					"area": 3,
					"offsets": [
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 2,
					"comment": "Lorem ipsum 2"
			}],
			"price":[{
				"name": 'Model Man 15356-3',
				"value": 270,
				"quantity": 520
			},
			{
				"name": 'Принт «Print112.psd»   на груди   20х40см  полноцвет',
				"value": 900,
				"quantity": 1
			},
			{
				"name": 'Доставка Ростов-на-Дону Уременко, 18',
				"value": 7800,
				"quantity": 1
			}]
    },
		{
			"orderId": "2",
			"modelId": "001",
			"status": 1,
			"sizes": {
				"white": ["", "3", "3", "3", "", "", ""],
				"red": ["3", "", "", "", "3", "", ""]
			},
			"prints":[{
					"img": "./img/print1.png",
					"size": [200, 100],
					"area": 0,
					"offsets": [
							[50, 0],
							[0, 30],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 3,
					"comment": "Lorem ipsum"
			}, {
					"img": "./img/print1.png",
					"size": [200, 100],
					"area": 0,
					"offsets": [
							[50, 0],
							[0, 30],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 3,
					"comment": "Lorem ipsum"
			}, {
					"img": "./img/print2.png",
					"size": [300, 200],
					"area": 3,
					"offsets": [
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0],
							[0, 0]
					],
					"colors": 2,
					"comment": "Lorem ipsum 2"
			}],
			"price":[{
				"name": 'Model Man 15356-3',
				"value": 270,
				"quantity": 520
			},
			{
				"name": 'Принт «Print112.psd»   на груди   20х40см  полноцвет',
				"value": 900,
				"quantity": 1
			},
			{
				"name": 'Доставка Ростов-на-Дону Уременко, 18',
				"value": 7800,
				"quantity": 1
			}]
		},
		{
			"orderId": "3",
			"modelId": "001",
			"status": 2,
			"sizes": {
				"white": ["", "3", "3", "3", "", "", ""],
				"red": ["3", "", "", "", "3", "", ""]
			},
			"prints":[],
			"price":[{
				"name": 'Model Man 15356-3',
				"value": 270,
				"quantity": 520
			},
			{
				"name": 'Принт «Print112.psd»   на груди   20х40см  полноцвет',
				"value": 900,
				"quantity": 1
			},
			{
				"name": 'Доставка Ростов-на-Дону Уременко, 18',
				"value": 7800,
				"quantity": 1
			}]
		},
		{
			"orderId": "4",
			"modelId": "001",
			"status": 3,
			"sizes": {
				"white": ["", "3", "3", "3", "", "", ""],
				"red": ["3", "", "", "", "3", "", ""]
			},
			"prints":[],
			"price":[{
				"name": 'Model Man 15356-3',
				"value": 270,
				"quantity": 520
			},
			{
				"name": 'Принт «Print112.psd»   на груди   20х40см  полноцвет',
				"value": 900,
				"quantity": 1
			},
			{
				"name": 'Доставка Ростов-на-Дону Уременко, 18',
				"value": 7800,
				"quantity": 1
			}]
		},
		{
			"orderId": "5",
			"modelId": "001",
			"delivery": {

			},
			"status": 4,
			"sizes": {
				"white": ["", "3", "3", "3", "", "", ""],
				"red": ["3", "", "", "", "3", "", ""]
			},
			"prints":[],
			"price":[{
				"name": 'Model Man 15356-3',
				"value": 270,
				"quantity": 520
			},
			{
				"name": 'Принт «Print112.psd»   на груди   20х40см  полноцвет',
				"value": 900,
				"quantity": 1
			},
			{
				"name": 'Доставка Ростов-на-Дону Уременко, 18',
				"value": 7800,
				"quantity": 1
			}]
		}]
},
	activeColor: "",
	modalActiveTab: "info",
	additionalColors: [],
	confirmModal: false,
	sidebarActive: false,
	orderIsChanged: false,
	contactModal: false
};

export default function Сatalog(state = initialState, action) {

	switch (action.type) {
	case actionTypes.OPEN_SIDEBAR:
		return Object.assign({}, state, {isOpen: !state.isOpen});
	case actionTypes.ACTIVE_SIDEBAR:
		return Object.assign({}, state, {sidebarActive: !state.sidebarActive});

	case actionTypes.SET_PRODUCTS:
		return Object.assign({}, state, {products: [...action.products]});

	case actionTypes.SET_PRODUCT:
		return Object.assign({}, state, {product: action.product});

	case actionTypes.CHANGE_COLOR:
		return Object.assign({}, state, {color: action.color});

	case actionTypes.CHANGE_SEX:
		return Object.assign({}, state, {sex: action.sex});

	case actionTypes.MODAL_HANDLER:
		return Object.assign({}, state, {modalIsOpen: action.modalIsOpen, product: action.product, activeColor: state.color});

	case actionTypes.SHOW_ORDER:
		return Object.assign({}, state, {orderIsOpen: action.orderIsOpen});

	case actionTypes.SET_COLORS:
		return Object.assign({}, state, {colors: [...action.colors]});

	case actionTypes.SET_SIZES:
		return Object.assign({}, state, {sizes: [...action.sizes]});

	case actionTypes.SHOW_SIZES:
		return Object.assign({}, state, {sizesIsOpen: action.sizesIsOpen});

	case actionTypes.SET_ORDER_SIZES_BY_COLOR:
		let order = Object.assign({}, state.order);
		order.sizes[action.color] = action.line;
		return Object.assign({}, state, {order: order});

	case actionTypes.REMOVE_ORDER_BY_COLOR:
		order = Object.assign({}, state.order);
		delete order.sizes[action.color];
		return Object.assign({}, state, {order: order});

	case actionTypes.SET_ORDER_FROM_BASKET:
		return Object.assign({}, state, {order: action.order});

	case actionTypes.CLEAR_ORDER:
	{
		console.log(action.order);
		return Object.assign({}, state, {order: action.order});
	}
	case actionTypes.GET_PRICE:
		return Object.assign({}, state, {calculationIsOpen: action.calculationIsOpen, amount: action.amount});

	case actionTypes.REMOVE_FROM_BASKET:
		setOrder = Object.assign({}, state.basketOrder);
		let orderId  = action.orderId;
		let orderIndex = setOrder["data"].findIndex((item) => item.orderId == orderId);
		setOrder["data"].splice(orderIndex, 1);
		return Object.assign({}, state, {basketOrder: setOrder});

	case actionTypes.ADD_TO_BASKET:
		let setOrder = Object.assign({}, state.basketOrder);
		let productOrder = {};

		productOrder.modelId = action.productId;
		productOrder.orderId = +state.basketOrder.data[state.basketOrder.data.length - 1].orderId + 1;
		productOrder.sizes = action.order.sizes;
		productOrder.prints = action.order.prints.slice();
		productOrder.status = action.order.status;
		productOrder.price = action.order.price;
		setOrder["data"].push(productOrder);
		return Object.assign({}, state, {basketOrder: setOrder});

	case actionTypes.ORDER_IS_CHANGED:
		return Object.assign({}, state, { orderIsChanged: action.flag})

	case actionTypes.CHANGE_BASKET_ORDER:
		setOrder = Object.assign({}, state.basketOrder);
		productOrder = {};
		productOrder.modelId = action.order.modelId;
		productOrder.orderId = action.order.orderId;
		productOrder.sizes = action.order.sizes;
		productOrder.prints = action.order.prints.slice();
		productOrder.status = action.order.status;
		productOrder.price = action.order.price;
		orderIndex = setOrder["data"].findIndex((item) => item.orderId == action.order.orderId);
		setOrder["data"][orderIndex] = productOrder;
		return Object.assign({}, state, {basketOrder: setOrder});

	case actionTypes.UPDATE_BASKET_ORDER:
		return Object.assign({}, state, {basketOrder: action.order});

	case actionTypes.CHANGE_PREVIEW_COLOR:
		return Object.assign({}, state, {activeColor: action.activeColor});

	case actionTypes.ACTIVE_MODAL:
		return Object.assign({}, state, {modalActiveTab: action.tab});

	case actionTypes.SET_ADDITIONAL_COLORS:
		return Object.assign({}, state, {additionalColors: action.additionalColors});

	case actionTypes.OPEN_CONFIRM:
		return Object.assign({}, state, {confirmModal: action.flag});

	case actionTypes.OPEN_CONTACT_MODAL:
		return Object.assign({}, state, {contactModal: action.flag});

	//Prints editor
	case actionTypes.SAVE_ORDER_CHANGES:
		return Object.assign({}, state, {order: action.order});

  /*async actions */
	case actionTypes.SELECT_SUBREDDIT :
		return action.subreddit;

	case actionTypes.INVALIDATE_SUBREDDIT :
		return Object.assign({}, state, {});

	case actionTypes.REQUEST_PRODUCTS :
		return Object.assign({}, state, {});

	case actionTypes.RECEIVE_PRODUCTS :
		return Object.assign({}, state, {products: action.products});

	case actionTypes.REQUEST_COLORS :
		return Object.assign({}, state, {});

	case actionTypes.RECEIVE_COLORS :
		return Object.assign({}, state, {colors: action.colors});

	case actionTypes.REQUEST_SIZES :
		return Object.assign({}, state, {});

	case actionTypes.RECEIVE_SIZES :
		return Object.assign({}, state, {sizes: action.sizes});
  /*async actions */

	default:
		return state;
	}
}
