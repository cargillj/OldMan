import * as Discord from 'discord.io'
import * as auth from '../auth.json'
import moment from 'moment'
import { logger } from '../utils/Logger'

class Bot extends Discord.Client {
  birthDate: moment.Moment
  say: Function
  constructor(options) {
    super(options)
    this.birthDate = moment()
    this.say = this.sendMessage
  }
}

var bot = new Bot({
  token: auth.token,
  autorun: true
})

export { bot }
