import { Client } from './ResponseManager'
import { responses } from './responses'

responses.map(response => Client.registerResponse(response))
