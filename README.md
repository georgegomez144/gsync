# How to use Gsync

## Commands
    -b, --branches        branches to include  if not specified, then ALL branches will be included  
    -c, --checkout        final branch to checkout to when process is complete. (default is 'master')  
    -m, --merge           branch to merge _from_ (ie. `git merge master`) (default is 'master')  
        --pull            _pull_ each branch **BEFORE** merging  
        --push            _push_ each branch to _remote_ **AFTER** merging  
    
    -d, --debug           _For Dev_ to output all variables passed


 
## Examples

#### Default settings
###### By default, the standard command will sync ALL branches with the master branch and check you out to the master branch when complete.
    
    gulp gsync  

#### Choosing a branch to merge FROM
###### This command will merge `newBranch` into all branches locally **ONLY** and checkout to `master` when complete (default functionality)   
    
    gulp gsync -m=newBranch

#### Choosing a branch to merge *FROM* and checkout *TO* when completed
###### This command will merge `newBranch` into ALL branches locally and checkout to `anotherBranch` once completed    
    
    gulp gsync -m=newBranch -c=anotherBranch  
or

    gulp gsync --merge=newBranch --checkout=anotherBranch

To merge **FROM** `newBranch` branch and checkout to the same branch (`newBranch`) can be written in the format above or the shortcut below:  
    
    gulp gsync -mc=newBranch
or  

    gulp gsync -cm=newBranch

#### Updating from/to the remote branch
###### To pull or push to the remote branch use the `--pull` or `--push` flags  

to pull each branch from remote
will first pull `master` branch then merge `master` to all branches and checkout to `master`  
    
    gulp gsync --pull  
    
will first pull `newBranch` branch then merge `newBranch` to all branches (including `master`) and checkout to `newBranch`  
    
    gulp gsync --pull -cm=newBranch  

###### to push each branch to remote  
will push each branch directly **after** merge from `master` branch and checkout to `master`  

    gulp gsync --push

will push each branch directly **after** merge from `newBranch` and checkout to `master`

    gulp gsync --push -m=newBranch -c=master
    
###### to update all *local* from remote before merge and push up to *remote* after merge completed  
    
this will first checkout to `master` branch, pull from remote then checkout to remaining branches and pull their remote, merge `master`, push each to remote then finally checkout to master and show branches

    gulp gsync --pull --push
    
this will do the same, but instead merge `newBranch` to all branches and finally checkout to `master`
     
    gulp gsync --pull --push -c=master -m=newBranch
    
this will do the same, but instead merge `anotherBranch` to all branches and finally checkout to `anotherBranch`
    
    gulp gsync --pull --push -mc=anotherBranch
    
    
this will do the same, but instead merge `master` to all branches and finally checkout to `anotherBranch`

    gulp gsync --pull --push -c=anotherBranch

#### Debugging or previewing command string before running
###### Any command with the `-d` flag will print the output of all variables used and the final command string in the console, but will not run the code.  
    
    gulp gsync -d


