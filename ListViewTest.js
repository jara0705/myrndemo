/**
 * Created by Jiaqi on 2018/1/23.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ListView,
} from 'react-native';
import NavigationBar from './js/common/NavigationBar'
import Toast, {DURATION} from 'react-native-easy-toast'
var data = {
    "result": [
        {
            "email": "1",
            "name": "1"
        },
        {
            "email": "2",
            "name": "2"
        },
        {
            "email": "3",
            "name": "3"
        },
        {
            "email": "4",
            "name": "4"
        },
    ],
    "statusCode": 0
};
export default class ListViewTest extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result)
        }
    }

    renderRow(item) {
        return <View style={styles.row}>
            <TouchableOpacity
            onPress={()=>{
                this.toast.show('你单机了',DURATION.LENGTH_LONG)
            }
            }>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View style={styles.line}>

        </View>
    }

    renderFooter() {
        return <Image
            style={{width:400, height:100}}
            source={{uri:'https://images.gr-assets.com/hostedimages/1406479536ra/1055627.gif'}}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'ListViewTest'}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item)=>this.renderRow(item)}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                    renderFooter={()=>this.renderFooter()}/>
                <Toast ref={toast=>{this.toast=toast}}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 18,
    },
    row: {
        height: 70
    },
    line: {
        height: 1,
        backgroundColor: "black"
    }
});
