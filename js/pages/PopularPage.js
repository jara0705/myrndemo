/**
 * Created by Jiaqi on 2018/1/25.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Navigator,
    TextInput,
    ListView,
    RefreshControl,
} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import DataRepository from '../expand/dao/DataRepository'
import RepositoryCell from '../common/RepositoryCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE);
        this.state={
            language:[],
        }
    }
    componentDidMount() {
        this.loadData();
    }


    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    language: result
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let content=this.state.language.length>0?<ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:"#e7e7e7", height:2}}
                renderTabBar={()=><ScrollableTabBar/>}
            >
                {this.state.language.map((result, i, arr)=>{
                    let lan=arr[i];
                    return lan.checked? <PopularTab key={i} tabLabel={lan.name}>Java</PopularTab>:null;
                })}
                <PopularTab tabLabel="java">Java</PopularTab>
                <PopularTab tabLabel="ios">IOS</PopularTab>
                <PopularTab tabLabel="android">Android</PopularTab>
                <PopularTab tabLabel="javascript">JavaScript</PopularTab>
            </ScrollableTabView>:null
        return <View style={styles.container}>
            <NavigationBar
                title={'最热'}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
            {content}
        </View>
    }
}

class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.dataRepository=new DataRepository();
        this.state={
            results:'',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
        }
    }

    componentDidMount(){
        this.onLoad();
    }

    onLoad(){
        this.setState({
            isLoading:true
        })
        let url = URL + this.props.tabLabel + QUERY_STR;
        this.dataRepository.fetchNetRepository(url)
            .then(result=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading:false,
                });
            })
            .catch(error=>{
                console.log(error);
            })
    }

    renderRow(data) {
        return <RepositoryCell data={data}/>
    }

    render(){
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onLoad()}
                        colors={['#2196F3']}
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={'#2196F3'}
                    />
                }
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 20
    }
})