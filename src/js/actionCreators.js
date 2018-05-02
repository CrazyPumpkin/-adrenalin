import * as actionTypes from "actionTypes";
import fetch from "isomorphic-fetch";

function sidebarToggle(isOpen) {
	return {
		type: actionTypes.OPEN_SIDEBAR,
		isOpen: isOpen
	};
}

function changeSex(sex) {
	return {
		type: actionTypes.CHANGE_SEX,
		sex: sex
	};
}

function changeColor(color) {
	return {
		type: actionTypes.CHANGE_COLOR,
		color: color
	};
}

function setProducts(productList) {
	return {
		type: actionTypes.SET_PRODUCTS,
		products: productList
	};
}

function modalHandler(flag, product) {
	return {
		type: actionTypes.MODAL_HANDLER,
		modalIsOpen: flag,
		product: product
	};
}

function setProduct(product) {
	console.log(product);
	return {
		type: actionTypes.SET_PRODUCT,
		product: product
	};
}

function showOrder(orderIsOpen) {
	return {
		type: actionTypes.SHOW_ORDER,
		orderIsOpen: orderIsOpen
	};
}

function setColors(colorsList) {
	return {
		type: actionTypes.SET_COLORS,
		colors: colorsList
	};
}

function setSizes(sizesList) {
	return {
		type: actionTypes.SET_SIZES,
		sizes: sizesList
	};
}

function showSizes(sizesIsOpen) {
	return {
		type: actionTypes.SHOW_SIZES,
		sizesIsOpen: sizesIsOpen
	};
}

function setOrderSizesByColor(color, line) {
	return {
		type: actionTypes.SET_ORDER_SIZES_BY_COLOR,
		color: color,
		line: line
	};
}

function setOrderFromBasket(order) {
	return {
		type: actionTypes.SET_ORDER_FROM_BASKET,
		order: order
	};
}

function clearOrder() {
	console.log('clear');
	return {
		type: actionTypes.CLEAR_ORDER,
		order: {
			sizes: {},
			prints: []
		}
	};
}

function getPrice(calculationIsOpen) {
	return {
		type: actionTypes.GET_PRICE,
		calculationIsOpen: calculationIsOpen
	};
}

function addToBasket(productId, order) {
	return {
		type: actionTypes.ADD_TO_BASKET,
		order: order,
		productId: productId
	};
}

function removeFromBasket(orderId) {
	return {
		type: actionTypes.REMOVE_FROM_BASKET,
		orderId: orderId
	};
}

function changeBasketOrder(order) {
	return {
		type: actionTypes.CHANGE_BASKET_ORDER,
		order: order
	};
}

function updateBasketOrder(order) {
	return {
		type: actionTypes.UPDATE_BASKET_ORDER,
		order: order
	};
}

function selectSubreddit(subreddit) {
	return {
		type: actionTypes.SELECT_SUBREDDIT,
		subreddit: subreddit
	};
}

function invalidateSubreddit(subreddit) {
	return {
		type: actionTypes.INVALIDATE_SUBREDDIT,
		subreddit: subreddit
	};
}

function orderIsChanged(flag) {
	return {
		type: actionTypes.ORDER_IS_CHANGED,
		flag: flag
	}
}

function requestProducts(subreddit) {
	return {
		type: actionTypes.REQUEST_PRODUCTS,
		subreddit: subreddit
	};
}

function receiveProducts(subreddit, json) {
	return {
		type: actionTypes.RECEIVE_PRODUCTS,
		subreddit: subreddit,
		products: json.map(child => child)
	};
}

const fetchProducts = reddit => dispatch => {
	dispatch(requestProducts(reddit));
	return fetch(`./${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(reddit, json)));
};

function requestColors(subreddit) {
	return {
		type: actionTypes.REQUEST_COLORS,
		subreddit: subreddit
	};
}

function receiveColors(subreddit, json) {
	return {
		type: actionTypes.RECEIVE_COLORS,
		subreddit: subreddit,
		colors: json.map(child => child)
	};
}

const fetchColors = reddit => dispatch => {
	dispatch(requestProducts(reddit));
	return fetch(`./${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveColors(reddit, json)));
};

function requestSizes(subreddit) {
	return {
		type: actionTypes.REQUEST_SIZES,
		subreddit: subreddit
	};
}

function receiveSizes(subreddit, json) {
	return {
		type: actionTypes.RECEIVE_SIZES,
		subreddit: subreddit,
		sizes: json.map(child => child)
	};
}

const fetchSizes = reddit => dispatch => {
	dispatch(requestSizes(reddit));
	return fetch(`./${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receiveSizes(reddit, json)));
};

function changePreviewColor(newColor) {
	return {
		type: actionTypes.CHANGE_PREVIEW_COLOR,
		activeColor: newColor
	};
}
function setAdditionalColors(colors){
	return {
		type: actionTypes.SET_ADDITIONAL_COLORS,
		additionalColors: colors
	};
}
function activeModalTab(component) {
	return {
		type: actionTypes.ACTIVE_MODAL,
		tab: component
	};
}
function removeOrderByColor(color){
	return{
		type: actionTypes.REMOVE_ORDER_BY_COLOR,
		color: color
	}
}
function saveOrderChanges(order){
	return {
		type: actionTypes.SAVE_ORDER_CHANGES,
		order: order
	}
}
function openConfirm(flag) {
	return {
		type: actionTypes.OPEN_CONFIRM,
		flag: flag
	}
}
function openContactModal(flag){
	return {
		type: actionTypes.OPEN_CONTACT_MODAL,
		flag: flag
	}
}

function activeSidebar(flag) {
	return {
		type: actionTypes.ACTIVE_SIDEBAR,
		flag: flag
	}
}

export {
  sidebarToggle,
  changeSex,
  changeColor,
  setProducts,
  modalHandler,
  showOrder,
  setColors,
  setSizes,
  showSizes,
  setOrderSizesByColor,
  clearOrder,
  getPrice,
  addToBasket,
  selectSubreddit,
  invalidateSubreddit,
  requestProducts,
  receiveProducts,
  fetchProducts,
  requestSizes,
  receiveSizes,
  fetchSizes,
  requestColors,
  receiveColors,
  fetchColors,
  changePreviewColor,
	changeBasketOrder,
	activeModalTab,
	setOrderFromBasket,
	updateBasketOrder,
	setProduct,
	setAdditionalColors,
	removeOrderByColor,
	saveOrderChanges,
	openConfirm,
	activeSidebar,
	orderIsChanged,
	openContactModal,
	removeFromBasket
};
