import AuthStore from './auth'
import NavigationStore from './navigation'

const stores = {}
export const auth = new AuthStore(stores)
export const navigation = new NavigationStore(stores)

stores.auth = auth
stores.navigation = navigation

export default stores