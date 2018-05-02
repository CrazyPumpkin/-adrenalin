import styles from "./sizeList.css";
import React from 'react';
import Isvg from 'react-inlinesvg';

const MAX_WIDTH = '136';
const MAX_SHIRT_WIDTH = '600';

export default class sizeList extends React.Component {
  constructor(props){
    super(props);
    this.countSize = this.countSize.bind(this);
  }
  countSize(size){
    return MAX_WIDTH * size / MAX_SHIRT_WIDTH;

  }

  render() {
    return (
        <div className={styles.sizeList}>
          {this.props.sizeList.map((item, size) => (
            <div key={size}
                  onClick={() => this.props.openPositionEditor(size)}
                  className={styles.sizeItem + ' ' + ((this.props.orderSizes[size])? '':styles.sizeItem_unactive)}
                  style={{flexBasis: this.countSize(this.props.shirtPrintParams[this.props.print.area].size[size][0]) + 'px'}}
                  >
              <div className={styles.shirt}>
                <div className={styles.accessArea}
                  style={{
                    width: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedSize[size][0]) + 'px'),
                    height: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedSize[size][1]) + 'px'),
                    top: (this.countSize(this.props.shirtPrintParams[this.props.print.area].allowedOffset[size]) + 'px')
                  }}>
                  <div className={styles.print}
                        style={{
                          width: (this.countSize(this.props.print.size[0]) + 'px'),
                          height: (this.countSize(this.props.print.size[1]) + 'px'),
                          left: (this.countSize(this.props.print.offsets[size][0]) + 'px'),
                          top: (this.countSize(this.props.print.offsets[size][1]) + 'px')
                        }}>
                    <img src={this.props.print.img} alt=""/>
                  </div>
                </div>
                <img className={styles.scheme} src={ this.props.shirtPrintParams[this.props.print.area].fullImage[size] }/>
              </div>

              <div className={styles.label}>{item}</div>
            </div>

          ))}
        </div>
    );
  }
}
