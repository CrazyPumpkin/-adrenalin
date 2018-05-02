import React from "react";


export default class Test extends React.Component{
  constructor(props) {
     super(props)
     this.transitionEnd = this.transitionEnd.bind(this)
     this.mountStyle = this.mountStyle.bind(this)
     this.unMountStyle = this.unMountStyle.bind(this)
     this.state ={ //base css
       show: true,
       style :{
         fontSize: 60,
         opacity: 0,
         color:'white',
         transition: 'all 2s ease',
       }
     }
   }

   componentWillReceiveProps(newProps) { //check for the mounted props
     if(!newProps.mounted)
       return this.unMountStyle() //call outro animation when mounted prop is false
     this.setState({ //remount the node when the mounted prop is true
       show: true
     })
     setTimeout(this.mountStyle, 10) //call the into animiation
   }

   unMountStyle() { //css for unmount animation
     this.setState({
       style: {
         fontSize: 60,
         opacity: 0,
         color:'white',
         transition: 'all 1s ease',
       }
     })
   }

   mountStyle() { // css for mount animation
     this.setState({
       style: {
         fontSize: 60,
         opacity: 1,
         color:'black',
         transition: 'all 1s ease',
       }
     })
   }

   componentDidMount(){
     setTimeout(this.mountStyle, 10) //call the into animiation
   }

   transitionEnd(){
     if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
       this.setState({
         show: false
       })
     }
   }

   render() {
     return this.state.show && <h1 style={this.state.style} onTransitionEnd={this.transitionEnd}>Hello</h1>
   }
 }
