set filec
set prompt="[$USER@`hostname` `pwd`]# "
alias cd 'cd \!*;set prompt="[$USER@`hostname` `pwd`]#"'
alias ls 'ls-asCF'
alias ll 'ls-alF | more'
alias a alias
alias c clear
alias h history

if ( $?iprompt ) then
	set history=100
endif
