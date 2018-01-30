/**
 * Created by Jiaqi on 2018/1/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Text,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props)
    }

    onSave() {
        this.props.navigator.pop();
    }

    render() {
        let rightButton = <TouchableOpacity
            onPress={()=>this.onSave()}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>
        return (
            <View style={styles.container}>
                <NavigationBar
                    title='自定义标签页'
                    style={{backgroundColor:'#6495ED'}}
                    leftButton={ViewUtils.getLeftButton(()=>this.onSave())}
                    rightButton={rightButton}
                />
                <Text style={styles.tips}>自定义标签</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tips: {
        fontSize:29,
    },
    title: {
        fontSize:15,
        color:'white'
    }
})