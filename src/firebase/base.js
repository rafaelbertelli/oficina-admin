import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import baseConfig from './baseConfig'

const app = firebase.initializeApp(baseConfig)
const base = Rebase.createClass(app.database())
export const auth = firebase.auth()
export default base
