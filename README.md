## How to use Gsync

### Commands
  -b, --branches        branches to include  
                        if not specified, then ALL branches will be included  
  -c, --checkout        final branch to checkout to when process is complete  
  -m, --merge           branch to merge _from_ (ie. `git merge _master_`)  
  --pull                _pull_ each branch **BEFORE** merging  
  --push                _push_ each branch to _remote_ **AFTER** merging  
  
  -d, --debug           _For Dev_ to output all variables passed  