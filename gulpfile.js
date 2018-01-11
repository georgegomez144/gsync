const gulp = require('gulp')
const argv = require('yargs').argv
const exec = require('child_process').exec

gulp.task('gsync', function(cb) {
  exec('git branch', function(err, stdout, stderr) {
    let branchToMergeWith = argv.m || argv.merge || 'master'
    let backToBranch = argv.c || argv.checkout || 'master'
    let branches = (argv.branches) ? argv.branches : stdout.replace(/[\*]/g, '').split('\n').map((v) => { return v.trim() }).filter((v) => { return (v || v === 'master') })
    let commandString = 'git checkout master '
    if(argv.pull) { commandString += ' && git pull'}
    branches.forEach((branch,i) => {
      commandString += '&& git checkout ' + branch
      if(argv.pull) { commandString += ' && git pull'}
      commandString += '&& git merge ' + branchToMergeWith
      if(argv.push) { commandString +=  '&& git push'}
    })
    commandString += ' && git checkout ' + backToBranch
    commandString += ' && git branch'
    if(argv.d || argv.debug) {
      console.log(
        'Argument flags passed: ', {
          'merge': branchToMergeWith,
          'checkout': backToBranch,
          'pull': argv.pull, 
          'push': argv.push
        }
      )
    }
    console.log('String to run: ', commandString)
    console.log('Final branch to checkout to: ', backToBranch)
    console.log('Running...')
    setTimeout(() => {
      exec(commandString, function(err, cmdOut) {
        console.log(cmdOut)
      })
    }, 1000)
    console.log('...done')
  })
})