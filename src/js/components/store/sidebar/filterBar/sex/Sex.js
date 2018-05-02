import styles from './Sex.css'
import React from 'react';
import SexItem from "./SexItem";

export default class Gender extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={styles.sexWrap}>
        <SexItem setSex={"male"} url={"./img/man.svg"}/>
        <SexItem setSex={"female"} url={"./img/women.svg"}/>
        <SexItem setSex={"children"} url={"./img/children.svg"}/>
      </div>
    );
  }
}
