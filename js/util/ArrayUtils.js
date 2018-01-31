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
        for (var i=0, len=array.length; i<len; i++) {
            var temp = array[i];
            if (item===temp) {
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
}