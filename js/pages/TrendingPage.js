/**
 * Created by Jiaqi on 2018/2/27.
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
    TouchableOpacity,
    Image
} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../common/NavigationBar'
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository'
import TrendingCell from '../common/TrendingCell'
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao'
import RepositoryDetail from './RepositoryDetail'
import TimeSpan from '../model/TimeSpan'
import Popover from '../common/Popover'
var timeSpanTextArray = [new TimeSpan('今 天', 'since=daily')
    , new TimeSpan('本 周', 'since=weekly')
    , new TimeSpan('本 月', 'since=monthly')];
const URL = 'https://github.com/trending/';
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            language: [],
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanTextArray[0]
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
            })
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, heigth, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, heigth: heigth}
            });
        });
    }

    renderTitleView() {
        return <View>
            <TouchableOpacity
                ref='button'
                onPress={()=>this.showPopover()}
            >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text
                        style={{fontSize:18,color:'white',fontWeight:'400'}}
                    >趋势</Text>
                    <Image
                        style={{width:12, height:12, marginLeft:5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    closePopover() {
        this.setState({
            isVisible: false,
        })
    }

    onSelectTimeSpan(timeSpan) {
        this.setState({
            timeSpan:timeSpan,
            isVisible:false
        })
    }

    render() {
        let navigationBar =
            <NavigationBar
                title={this.renderTitleView()}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
        let content = this.state.language.length > 0 ? <ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor:"#e7e7e7", height:2}}
                renderTabBar={()=><ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}}
                                                      tabStyle={{height: 39}}/>}
            >
                {this.state.language.map((result, i, arr) => {
                    let language = arr[i];
                    return language.checked ? <TrendingTab key={i} tabLabel={language.name}
                                                           timeSpan={this.state.timeSpan} {...this.props}/> : null;
                })}
            </ScrollableTabView> : null;
        let timeSpanView =
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement="bottom"
                contentStyle={{backgroundColor:'#343434', opacity:0.82}}
                onClose={()=>this.closePopover()}>
                {timeSpanTextArray.map((result, i, arr) => {
                    return <TouchableOpacity
                        key={i}
                        underlayColor='transparent'
                        onPress={()=>this.onSelectTimeSpan(arr[i])}>
                        <Text style={{fontSize:18, color:'white', fontWeight:'400', padding:8}}>
                            {arr[i].showText}
                        </Text>
                    </TouchableOpacity>
                })}
                <Text></Text>
            </Popover>
        return <View style={styles.container}>
            {navigationBar}
            {content}
            {timeSpanView}
        </View>
    }
}

class TrendingTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            isLoading: false,
        }
    }

    componentDidMount() {
        this.onLoad(this.props.timeSpan, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.onLoad(nextProps.timeSpan)
        }
    }

    onRefresh() {
        this.onLoad(this.props.timeSpan)
    }

    onLoad(timeSpan, isRefresh) {
        this.setState({
            isLoading: true
        });
        let url = this.getFetchUrl(timeSpan, this.props.tabLabel);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                let items = result && result.items ? result.items : result ? result : [];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false,
                });
                if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                    return this.dataRepository.fetchNetRepository(url);
                }
            })
            .then(items => {
                if (!items || items.length === 0)return;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                })
            })
            .catch(error => {
                // console.log(error);
            })
    }

    onSelect(item) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                item: item,
                ...this.props
            }
        })
    }

    renderRow(data) {
        return <TrendingCell
            onSelect={(data)=>this.onSelect(data)}
            key={data.id}
            data={data}/>
    }

    getFetchUrl(timeSpan, category) {
        return URL + category + '?' + timeSpan.searchText;
    }

    render() {
        return <View style={{flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(data)=>this.renderRow(data)}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onRefresh()}
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