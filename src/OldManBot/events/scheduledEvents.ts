import { ScheduledEvent } from '../../DiscordBot/'
import EVENTS from './constants'

const meal = '* */8 * * *'

const scheduledMeals = new ScheduledEvent(EVENTS.MISSED_MEAL, [meal])

const scheduledEvents = [scheduledMeals]
export default scheduledEvents
