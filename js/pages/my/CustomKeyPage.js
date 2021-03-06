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
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import CheckBox from 'react-native-check-box';
import ArrayUtils from '../../util/ArrayUtils'
export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.changeValues = [];
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(this.props.flag);
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then((data) => {
                this.setState({
                    dataArray: data
                })
            })
            .catch(error => {

            })
    }

    onSave() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        for (let i = 0, l=this.changeValues.length; i < l; i++) {
            ArrayUtils.remove(this.state.dataArray, this.changeValues[i])
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    renderView() {
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray(len - 1))}
                </View>
                <View style={styles.line}/>
            </View>
        )
        return views;
    }

    onClick(data) {
        if (!this.isRemoveKey) data.checked = !data.checked;
        ArrayUtils.updateArray(this.changeValues, data);
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = this.isRemoveKey ? false : data.checked;
        return (
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={data.checked}
                checkedImage={<Image style={{tintColor:'#6495ED'}} source={require('./img/ic_check_box.png')}/>}
                unCheckedImage={<Image style={{tintColor:'#6495ED'}} source={require('./img/ic_check_box_outline_blank.png')}/>}
            />
        )
    }

    onBack() {
        if (this.changeValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {
                    text: '否', onPress: () => {
                    this.props.navigator.pop();
                }, style: 'cancel'
                },
                {
                    text: '是', onPress: () => {
                    this.onSave();
                }
                }
            ]
        )
    }

    render() {
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        title = this.props.flag === FLAG_LANGUAGE.flag_language?'自定义语言':title;

        let navigationBar =
            <NavigationBar
                title={title}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                style={{backgroundColor:'#2196f3'}}
                rightButton={ViewUtils.getRightButton(rightButtonTitle,()=>this.onSave())}/>;
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    tips: {
        fontSize: 29,
    },
    title: {
        fontSize: 15,
        color: 'white'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',

    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})