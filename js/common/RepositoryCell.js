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

export default class RepositoryCell extends Component {

    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        return <TouchableOpacity
            onPress={this.props.onSelect}
            style={styles.container}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.data.full_name}</Text>
                <Text style={styles.description}>{this.props.data.description}</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Author:</Text>
                        <Image
                            style={{height:22,width:22}}
                            source={{uri:this.props.data.owner.avatar_url}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Stars:</Text>
                        <Text>{this.props.data.stargazers_count}</Text>
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
    }
})