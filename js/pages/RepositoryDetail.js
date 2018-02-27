/**
 * Created by Jiaqi on 2018/2/7.
 */
import React, {Component} from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    WebView,
    Platform,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
const TRENDING_URL = 'https://github.com/';
export default class RepositoryDetail extends Component {

    constructor(props) {
        super(props);
        this.url = this.props.item.html_url ? this.props.item.html_url : TRENDING_URL + this.props.item.fullName;
        let title = this.props.item.full_name ? this.props.full_name : this.props.item.fullName;
        this.state={
            url:this.url,
            canGoBack: false,
            title:title
        }
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        });
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    title={this.state.title}
                    style={{backgroundColor: '#6495ED'}}
                />
                <WebView
                    ref={webView=>this.webView = webView}
                    startInLoadingState={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}/>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})