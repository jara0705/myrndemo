/**
 * Created by Jiaqi on 2018/1/31.
 */

export default class ArrayUtils {
    /**
     * 更新数组
     * @param array
     * @param item
     */
    static updateArray(array, item) {
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item === temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /**
     * 克隆数组
     * @param from
     * @returns {Array}
     */
    static clone(from) {
        if (!from) return [];
        let newArray = [];
        for (let i = 0, len = from.length; i < len; i++) {
            newArray[i] = from[i];
        }
        return newArray;
    }

    /**
     * 判断两个数组的是否相等
     * @return boolean true 数组长度相等且对应元素相等
     * */
    static isEqual(arr1,arr2){
        if(!(arr1&&arr2))return false;
        if(arr1.length!=arr2.length)return false;
        for(let i=0,l=arr1.length;i<l;i++){
            if (arr1[i]!=arr2[i])return false;
        }
        return true;
    }

    static remove(arr, item) {
        if (!arr) return;
        for(let i=0,l=arr.length;i<l;i++){
            if (item === arr[i]) {
                arr.splice(i, 1);
            }
        }
    }
}