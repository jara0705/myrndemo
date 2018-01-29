/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import setup from './js/pages/setup'
// export default class myrndemo extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//         }
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 {/*<Navigator*/}
//                     {/*initialRoute={{component:Boy}}*/}
//                     {/*renderScene={(route, navigator) => {*/}
//                         {/*let Component = route.component*/}
//                         {/*return <Component navigator={navigator}{...route.params}/>*/}
//                     {/*}}>*/}
//
//                 {/*</Navigator>*/}
//                 <ListViewTest/>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });

AppRegistry.registerComponent('myrndemo', () => setup);
