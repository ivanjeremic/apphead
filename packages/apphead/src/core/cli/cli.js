import { cac } from 'cac'

const cli = cac('apphead')

cli.option('--type <type>', 'Choose a project type', {
  default: 'node',
})