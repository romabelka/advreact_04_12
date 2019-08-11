import {getRandomId} from '../helpers';

export let randomId = store => next => action => {
    let {payload = {}} = action;
    let {generateId, ...rest} = payload;
    if (!generateId) return next(action);
    next({
        ...action,
        payload : {
            ...rest,
            randomId : getRandomId()
        }
    })
}