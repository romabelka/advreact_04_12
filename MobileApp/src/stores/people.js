import { observable, action, computed } from "mobx"
import firebase from "firebase"
import BasicStore from "./BasicStore"

export default class PeopleStore extends BasicStore {
  @observable entities = {}
  @observable loading = false
  @observable loaded = false
  @observable err = null

  @computed
  get list() {
    return Object.entries(this.entities).map(([key, val]) => {
      return {
        uid: key,
        ...val
      }
    })
  }

  constructor(...args) {
    super(...args)
  }

  getPersonList = async () => {
    this.getPersonListStart()

    const ref = firebase.database().ref("people")

    try {
      const snapshot = await ref.once("value")
      this.getPersonListSuccess(snapshot.val())
    } catch (err) {
      this.getPersonListFail(err)
    }
  }

  @action
  getPersonListStart = () => {
    this.loading = true
  }

  @action
  getPersonListSuccess = people => {
    this.loading = false
    this.loaded = true
    this.entities = people
  }

  @action
  getPersonListFail = err => {
    this.loading = false
    this.loaded = true
    this.err = err
  }
}
