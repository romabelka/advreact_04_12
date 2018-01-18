import {StackNavigator, TabNavigator} from 'react-navigation'
import EventScreen from './components/screens/events/Event'
import SignInScreen from './components/screens/auth/SignIn'
import EventList from './components/screens/events/EventList'
import EventMap from './components/screens/events/EventMap'
import PeopleList from './components/screens/people/PeopleList'
import PersonPhoto from './components/screens/people/PersonPhoto'

const ListsNavigator = TabNavigator({
    events: {
        screen: EventList
    },
    people: {
        screen: PeopleList
    }
})

const AppNavigator = StackNavigator({
    auth: {
        screen: SignInScreen
    },
    lists: {
        screen: ListsNavigator
    },
    event: {
        screen: EventMap
    },
    personPhoto: {
        screen: PersonPhoto
    }
})

export default AppNavigator