import React from 'react';
import PrintArea from './PrintArea';


export default class PrintAreas extends React.Component {
  render() {
    return (
        <div>
        {
          this.props.shirtPrintParams.map((item, index) => (
            <PrintArea  key={index} id={index} printIndex={this.props.printIndex} currentArea={this.props.print.area} image={item.image} label={item.name} />
          ))
        }
        </div>
    );
  }
}
