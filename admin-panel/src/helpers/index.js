import {Map} from 'immutable';

export let arrayToMap = (arr, ItemRecord, idKey = 'id') => {
    let res = arr.reduce(function (acc, item) {
        return acc.set(item[idKey], ItemRecord ? new ItemRecord(item) : item);
    }, new Map({}));
    return res;
}

export let getRandomId = () => (Date.now() + Math.random()).toString()