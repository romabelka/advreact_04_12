import conferences from './conferences'
import firebase from 'firebase'

export function saveEventsToFB() {
    const eventsRef = firebase.database().ref('/events')
    conferences.forEach(conference  => eventsRef.push(conference))
}

export function getEventsFromFB() {
    const db = firebase.database()
    const eventsRef =  db.ref(`/events`)
    return eventsRef.once('value').then(result => result.val()
    );
}

window.saveEventsToFB = saveEventsToFB