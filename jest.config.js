module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['./src/tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}
