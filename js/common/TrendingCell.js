/**
 * Created by Jiaqi on 2018/1/28.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
export default class TrendingCell extends Component {

    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        let data = this.props.data;
        let description = '<p>' + data.description + "</p>";
        return <TouchableOpacity
            onPress={this.props.onSelect}
            style={styles.container}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{data.fullName}</Text>
                <HTMLView
                    value={description}
                    onLinkPress={(url) => {}}
                    stylesheet={{
                        p: styles.description,
                        a: styles.description
                    }}
                />
                <Text style={styles.description}>{data.meta}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.description}>Build by:</Text>
                        {data.contributors.map((result, i, arr)=>{
                            return <Image
                                key={i}
                                style={{height:22,width:22}}
                                source={{uri:arr[i]}}
                            />
                        })}

                    </View>
                    <Image
                        style={{height:22,width:22}}
                        source={require('../../res/images/ic_star.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    },
    container: {
        flex:1,
    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#dddddd',
        borderWidth:0.5,
        borderRadius:5,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    },
})