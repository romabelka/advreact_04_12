import AuthStore from './auth'
import NavigationStore from './navigation'
import Events from './events'
import People from './people'

const stores = {}
export const auth = new AuthStore(stores)
export const navigation = new NavigationStore(stores)

stores.auth = auth
stores.navigation = navigation
stores.events = new Events(stores)
stores.people = new People(stores)

export default stores