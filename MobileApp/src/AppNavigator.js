import {StackNavigator} from 'react-navigation'
import EventScreen from './components/screens/events/Event'
import EventListScreen from './components/screens/events/EventList'
import SignInScreen from './components/screens/auth/SignIn'

const AppNavigator = StackNavigator({
    auth: {
        screen: SignInScreen
    },
    eventList: {
        screen: EventListScreen
    },
    event: {
        screen: EventScreen
    },
})

export default AppNavigator