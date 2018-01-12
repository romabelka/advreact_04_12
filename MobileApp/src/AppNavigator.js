import { StackNavigator } from "react-navigation"
import EventScreen from "./components/screens/events/Event"
import EventPeopleNavigator from "./components/screens/EventPeopleNavigator"
import SignInScreen from "./components/screens/auth/SignIn"

const AppNavigator = StackNavigator(
  {
    auth: {
      screen: SignInScreen
    },
    peopleEventList: {
      screen: EventPeopleNavigator
    },
    event: {
      screen: EventScreen
    }
  }
)

export default AppNavigator
