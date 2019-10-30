import Response from '../ResponseManager/Response'

const CMD_PREFIX = '$'

const pingPhrase = RegExp('\\$ping')
export const ping = new Response(
  '$ping',
  pingPhrase,
  msg => 'pong! :ping_pong:'
)

const unknownPhrase = RegExp('\\$.*')
export const unknown = new Response(
  '$unknown',
  unknownPhrase,
  msg => "What!? My ear's aren't as good as they used to be!"
)

export const commands = [ping, unknown]
