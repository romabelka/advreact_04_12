import AuthStore from './auth'
import NavigationStore from './navigation'
import EventsStore from './events'
import PeopleStore from './people'

const stores = {}
export const auth = new AuthStore(stores)
export const navigation = new NavigationStore(stores)
export const events = new EventsStore(stores)
export const people = new PeopleStore(stores)

stores.auth = auth
stores.navigation = navigation
stores.events = events
stores.people = people

export default stores
