/**
 * Created by Jiaqi on 2018/1/25.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import MyPage from './my/MyPage';
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'tb_popular',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="home"
                        renderIcon={() => <Image style={styles.image}  source={require("../../res/images/ic_polular.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor:'#2196F3'}]} source={require("../../res/images/ic_polular.png")} />}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.image}  source={require("../../res/images/ic_trending.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor:'yellow'}]} source={require("../../res/images/ic_trending.png")} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <View style={styles.page2}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'red'}}
                        title="收藏"
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.image}  source={require("../../res/images/ic_favorite.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor:'red'}]} source={require("../../res/images/ic_favorite.png")} />}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="我的"
                        titleStyle={styles.tabText}
                        renderIcon={() => <Image style={styles.image}  source={require("../../res/images/ic_my.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor:'yellow'}]} source={require("../../res/images/ic_my.png")} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <MyPage {...this.props}></MyPage>
                    </TabNavigator.Item>
                </TabNavigator>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor: 'red',
    },
    page2: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    image: {
        height: 22,
        width: 22
    }
});
