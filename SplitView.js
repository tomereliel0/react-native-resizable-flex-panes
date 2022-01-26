/* source:      https://github.com/brucelin0325/react-native-resizable-flex-panes */

import React, { Component } from 'react'; 
import { StyleSheet, View, Dimensions, PanResponder, Animated } from 'react-native';
import Explorer from './Explorer';
import TextEditor from './TextEditor';

export default class SplitView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            offset          : 0,
            leftWidth       : 40,
            rightWidth      : 40,
            deviceWidth     : Dimensions.get('screen').width,
            isDividerClicked: false,

            pan             : new Animated.ValueXY()
        }

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            // Initially, set the X position offset when touch start
            onPanResponderGrant: (e, gestureState) => {
                this.setState({
                    offset: e.nativeEvent.pageX,
                    isDividerClicked: true
                })
            },

            // When we drag the divider, set the bottomHeight (component state) again.
            onPanResponderMove: (e, gestureState) => {

                this.setState({
                    rightWidth    : gestureState.moveX > (this.state.deviceWidth - 40) ? 40 : this.state.deviceWidth - gestureState.moveX,
                    offset: e.nativeEvent.pageX
                })
            },

            onPanResponderRelease: (e, gestureState) => {
                // Do something here for the touch end event
                this.setState({
                    offset: e.nativeEvent.pageX,
                    isDividerClicked: false
                })
            }
        });
    }


    render() {
        return ( 
            <View style={styles.content}>

                {/* Top View */}
                <Animated.View 
                    style       = {[{backgroundColor: 'red', minWidth: 40, flex: 1}, {width: this.state.leftWidth}]}

                >
                 {/* this.props.childone?this.props.childone:null */}
                </Animated.View>

                {/* Divider */}
                <View 
                    style={[{width: 10}, this.state.isDividerClicked ? {backgroundColor: '#666'} : {backgroundColor: '#e2e2e2'}]} 
                    {...this._panResponder.panHandlers}
                >
                </View>

                {/* Bottom View */}
                <Animated.View 
                    style={[{backgroundColor: 'blue', minWidth: 40}, {width: this.state.rightWidth}]} 
                   
                >
                 {/* this.props.childTwo?this.props.childTwo:null */}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content         : {
        flex        : 1,
        flexDirection: 'row'
    },
})