import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";
import App from "./components/app";
import Basket from "./components/store/content/basket/Basket";
import Content from "./components/store/content/Content";
import Catalog from "./components/store/content/catalog/catalog";
import Store from "./components/store/store";
import Home from "./components/home/Home";
import ProductModal from "./components/store/content/productModal/productModal";
import Info from "./components/store/content/productModal/info/modalInfo";
import Order from "./components/store/content/productModal/order/modalOrder";
import Sizes from "./components/store/content/productModal/sizeParams/sizeParams";
import Print from "./components/store/content/productModal/print/print";
import Brif from "./components/store/content/brif/Brif";
import AgreementInfo from "./components/store/content/information/Agreement/agreement";
import DeliveryInfo from "./components/store/content/information/Delivery/delivery";
import ContactsInfo from "./components/store/content/information/Contacts/contacts";
import PaymentInfo from "./components/store/content/information/Payment/payment";



import RouterParams from 'router-redux-params';

export default (
  <Route component={RouterParams}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/store" component={Store}>
      // <IndexRedirect to="/store/catalog/male" />
      <Route path="/store" component={Content}>
        <IndexRoute component={Catalog}></IndexRoute>
        <Route path="/store/catalog" component={Catalog}>
          <IndexRedirect to="/store/catalog/male/000" />
          <Route path="/store/catalog/:sex/:color">
            <Route path="/store/catalog/:sex/:color/:model" component={ProductModal}>
              <IndexRedirect to="/store/catalog/:sex/:color/:model/info" />
              <Route path="/store/catalog/:sex/:color/:model/:tab" component={ProductModal}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="/store/basket" component={Basket}></Route>
        <Route path="/store/basket/brif/:orderId" component={Brif}></Route>
        <Route path="/store/information">
          <IndexRedirect to="/store/information/agreement" component={AgreementInfo} />
          <Route path="/store/information/agreement" component={AgreementInfo}/>
          <Route path="/store/information/contacts" component={ContactsInfo}/>
          <Route path="/store/information/delivery" component={DeliveryInfo}/>
          <Route path="/store/information/payment" component={PaymentInfo}/>
        </Route>
      </Route>
    </Route>
    </Route>
  </ Route>
);
