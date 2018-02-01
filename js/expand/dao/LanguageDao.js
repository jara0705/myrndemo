/**
 * Created by Jiaqi on 2018/1/31.
 */
import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native'
import keysData from '../../../res/data/keys.json'
export var FLAG_LANGUAGE = {flag_language:'flag_language_language', flag_key:"flag_Language_key"}
export default class LanguageDao {
    constructor(flag) {
        this.flag = flag;
    }
    fetch() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error) {
                    reject(error);
                } else {
                    if (result) {
                        try {
                            resolve(JSON.parse(result));
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        var data = this.flag == FLAG_LANGUAGE.flag_key? keysData:null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }

    save(data){
        AsyncStorage.setItem(this.flag, JSON.stringify(data),(error)=>{

        })
    }

}