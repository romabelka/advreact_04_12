import { observable, action, computed } from "mobx"
import firebase from "firebase"
import BasicStore from "./BasicStore"

export default class EventsStore extends BasicStore {
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

  getEventList = async () => {
    this.getEventListStart()

    const ref = firebase.database().ref("events")

    try {
      const snapshot = await ref.once("value")
      this.getEventListSuccess(snapshot.val())
    } catch (err) {
      this.getEventListFail(err)
    }
  }

  @action
  getEventListStart = () => {
    this.loading = true
  }

  @action
  getEventListSuccess = events => {
    this.loading = false
    this.loaded = true
    this.entities = events
  }

  @action
  getEventListFail = err => {
    this.loading = false
    this.loaded = true
    this.err = err
  }
}
