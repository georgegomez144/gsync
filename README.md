## How to use Gsync

### Commands
  -b, --branches        branches to include  
                        if not specified, then ALL branches will be included  
  -c, --checkout        final branch to checkout to when process is complete. (default is 'master')  
  -m, --merge           branch to merge _from_ (ie. `git merge _master_`) (default is 'master')  
  --pull                _pull_ each branch **BEFORE** merging  
  --push                _push_ each branch to _remote_ **AFTER** merging  
  
  -d, --debug           _For Dev_ to output all variables passed  