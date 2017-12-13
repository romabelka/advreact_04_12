import firebase from 'firebase'

export function generateId() {
    return Date.now()
}

export function getEvents() {
    const db = firebase.database()
    const eventsRef =  db.ref(`/events`)
    return eventsRef.once('value').then(result => result.val());
}