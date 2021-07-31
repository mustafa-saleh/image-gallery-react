var spawnSync = require('child_process').spawnSync

const result = spawnSync('npm run lint && npm run format && git add .', {
  stdio: 'inherit',
  shell: true,
})
if (result.status !== 0) {
  process.exit(result.status)
}
