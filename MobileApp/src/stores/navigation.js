import {observable, action, computed} from 'mobx'
import AppNavigator from '../AppNavigator'
import {NavigationActions} from 'react-navigation'
import BasicStore from './BasicStore'

export default class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('auth'))

    @action dispatch = (action) => {
        this.state = AppNavigator.router.getStateForAction(action, this.state)
    }

    @computed get config() {
        return {
            state: this.state,
            dispatch: this.dispatch
        }
    }

    goTo(routeName) {
        console.log('---', 1234, routeName)
        this.dispatch(NavigationActions.navigate({
            routeName
        }))
    }
}