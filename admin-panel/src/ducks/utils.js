import {List} from 'immutable'

export function generateId() {
    return Date.now()
}

export function fbToEntities(values, DataRecord) {
    return Object.entries(values)
        .reduce(
            (acc, [uid, value]) => acc.push(new DataRecord({ uid, ...value })),
            new List([])
        )
}