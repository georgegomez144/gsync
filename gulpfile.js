const gulp = require('gulp')
const exec = require('child_process').exec
const argv = require('yargs').argv

gulp.task('gsync', function(cb) {
  exec('git branch', function(err, stdout, stderr) {
    let debug = argv.d || argv.debug || false

    let merge = (typeof argv.c === 'string' && typeof argv.m === 'boolean') ? argv.c : (typeof argv.d === 'string' && typeof argv.m === 'boolean') ? argv.d : argv.m
    let checkout = (typeof argv.m === 'string' && typeof argv.c === 'boolean') ? argv.m : (typeof argv.d === 'string' && typeof argv.c === 'boolean') ? argv.d : argv.c

    let branchToMergeWith = merge || argv.merge || 'master'
    let backToBranch = checkout || argv.checkout || 'master'
    let branchesToInclude = argv.b || argv.branches || null
    let branches = (branchesToInclude) ? branchesToInclude.split(',') : stdout.replace(/[\*]/g, '').split('\n').map((v) => { return v.trim() }).filter((v) => { return (v || v === 'master') })
    let commandString = ''
    
    if(argv.pull) { commandString += 'git checkout ' + branchToMergeWith + ' && git pull && '}
    branches = branches.filter(branch => {
      return (branch !== branchToMergeWith)
    });
    branches.forEach((branch,i) => {
      commandString += ((i > 0) ? ' && ':'') + 'git checkout ' + branch
      if(argv.pull) { commandString += ' && git pull'}
      commandString += ' && git merge ' + branchToMergeWith
      if(argv.push) { commandString +=  ' && git push'}
    })
    commandString += ' && git checkout ' + backToBranch
    commandString += ' && git branch'
    if(debug) {

      console.log('')
      console.log('---------Debugger is running-----------')
      console.log('')
      console.log('Actions: ')
      console.log('--------')
      console.log('   Branches to loop through: ', branches)
      console.log('   Command to run: ', '\'' + commandString + '\'')
      console.log('   debug: ', debug)
      console.log('')
      console.log('Argument flags passed: ')
      console.log('----------------------')
      console.log('   merge: ', branchToMergeWith)
      console.log('   checkout: ', backToBranch)
      console.log('   pull: ', argv.pull)
      console.log('   push: ', argv.push)
      console.log('')
      console.log('argv: ', argv)
      console.log('')
      console.log('')
      console.log('---------Debugger is running-----------')
    }
    console.log('')
    console.log('Final branch to checkout to: ', backToBranch)
    console.log('')
    console.log('String to run: ', '\'' + commandString + '\'')
    console.log('')
    console.log('Running...')
    console.log('')
    console.log((debug) ? '---------Debugger is running-----------':'')
    if(!debug) {
      setTimeout(() => {
        exec(commandString, function(err, cmdOut) {
          console.log(cmdOut)
          console.log('...done')
        })
      }, 1000)
    } else { console.log('Run command disabled....') }
  })
})