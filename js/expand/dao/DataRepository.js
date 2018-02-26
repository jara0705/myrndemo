/**
 * Created by Jiaqi on 2018/1/27.
 */
import {
    AsyncStorage,
} from 'react-native';
import GitHubTrending from 'GitHubTrending'
export var FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};
export default class DataRepository {

    constructor(flag) {
        this.flag = flag;
        if (flag === FLAG_STORAGE.flag_trending) this.trending = new GitHubTrending();
    }

    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url)
                .then((wrapData) => {
                    if (wrapData) {
                        resolve(wrapData, true);
                    } else {
                        this.fetchNetRepository(url)
                            .then((data) => {
                                resolve(data);
                            })
                            .catch((error) => {
                                reject(error);
                            })
                    }
                }).catch((error) => {
                this.fetchNetRepository(url).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                })
            })
        })
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise}
     */
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.treding.fetchTrending(url)
                    .then((items) => {
                        if (!items) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(items);
                        this.saveRepository(url, items)
                    }).catch((error) => {
                    reject(error);
                })
            } else {
                fetch(url)
                    .then((response) => response.json())
                    .catch(error => {
                        reject(error);
                    })
                    .then((responseData) => {
                        if (!responseData || !responseData.items) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(responseData.items);
                        this.saveRepository(url, responseData.items);
                    }).done();
            }

        })
    }

    saveRepository(url, items, callBack) {
        if (!url || !items) {
            return;
        }
        let wrapData = {items: items, update_date: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(wrapData), callBack)
    }

    checkDate(longTime) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;
    }
}