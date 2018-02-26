/**
 * Created by Jiaqi on 2018/1/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    ScrollView,
    TouchableHighlight
} from "react-native";

import NavigationBar from '../../common/NavigationBar'
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from './SortKeyPage'
export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='我的'
                    style={{backgroundColor:'#6495ED'}}
                />
                <Text
                    onPress={()=>{
                        this.props.navigator.push({
                            component:CustomKeyPage,
                            params:{...this.props}
                        })
                    }}
                    style={styles.tips}>自定义标签</Text>
                <Text
                    onPress={()=>{
                        this.props.navigator.push({
                            component:SortKeyPage,
                            params:{...this.props}
                        })
                    }}
                    style={styles.tips}>标签排序</Text>
                <Text
                    onPress={()=>{
                        this.props.navigator.push({
                            component:CustomKeyPage,
                            params:{
                                ...this.props,
                                isRemoveKey: true
                            }
                        })
                    }}
                    style={styles.tips}>标签移除</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    tips: {
        fontSize:29
    }
})