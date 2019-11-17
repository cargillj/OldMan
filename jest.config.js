module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['./src/DiscordBot/tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
