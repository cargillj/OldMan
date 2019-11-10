import * as Discord from 'discord.io'
import * as auth from '../auth.json'
import moment from 'moment'

class Bot extends Discord.Client {
  birthDate: moment.Moment
  say: Function
  constructor(options) {
    super(options)
    this.birthDate = moment()
    this.say = this.sendMessage
  }
}

var DiscordBot = new Bot({
  token: auth.token,
  autorun: true
})

export default DiscordBot
