import { ScheduledEvent } from '../../DiscordBot/'
import EVENTS from './constants'

const breakfast = '* 7 * * *'
const lunch = '* 11 * * *'
const dinner = '* 17 * * *'

const meal = new ScheduledEvent(EVENTS.MISSED_MEAL, [breakfast, lunch, dinner])

const scheduledEvents = [meal]
export default scheduledEvents
