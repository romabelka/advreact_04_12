import BasicStore from './BasicStore'
import {observable, action, computed, toJS} from 'mobx'
import AppNavigator from '../AppNavigator'
import {NavigationActions} from 'react-navigation'

export default class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('auth'))

    @action dispatch = (event) => {
        this.state = AppNavigator.router.getStateForAction(event, this.state)
    }

    @computed get config() {
        return {
            state: toJS(this.state),
            dispatch: this.dispatch
        }
    }

    goTo(routeName) {
        this.dispatch(NavigationActions.navigate({
            routeName
        }))
    }

    reset(routeName, params) {
        const action = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName, params })
            ]
        })

        this.dispatch(action)
    }
}
