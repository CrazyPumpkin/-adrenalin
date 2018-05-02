import styles from "./sizeParams.css";
import React from "react";
import { connect } from 'react-redux';
import SizeItem from './sizeItem';
import * as Actions from 'actionCreators';
import { bindActionCreators } from 'redux';
import { Motion, spring} from 'react-motion';
import { Link } from 'react-router';


function sizesState(state) {
  return {
      sizes: state.Reducer.sizes,
      sizeList: state.Reducer.sizeList,
      actions: state.actions,
      routerParams: state.routerParams
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

@connect(sizesState, mapDispatchToProps)
export default class sizeParams extends React.Component{
  constructor(props){
    super(props);
    this.hideSizesHandler = this.hideSizesHandler.bind(this)
  }

  hideSizesHandler() {
    this.props.actions.showSizes(false);
  }

  componentDidMount(){
    this.props.actions.fetchSizes('sizes');
  }

  render() {
    return (

      <div className={styles.wrap}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.head}>
              <th className={styles.rowTitle}></th>
            {this.props.sizeList.map((iSize, index) => <th key={index}>{iSize}</th>)}
            </tr>
            {this.props.sizes.map((size) =>  <SizeItem key={size.id} size={size}/>)}
          </tbody>
        </table>
        <footer className={styles.footer}>
          <Link to={'/store/catalog/' + this.props.routerParams.params.sex + '/' + this.props.routerParams.params.color + '/' + this.props.routerParams.params.model+'/order'} activeClassName={'active'} className={styles.button}>Выбрать размеры</Link>
        </footer>
      </div>

    )
  }
}
