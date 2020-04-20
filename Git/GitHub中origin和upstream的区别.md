# GitHub中origin和upstream的区别

> 原文链接： https://blog.csdn.net/liuchaoxuan/article/details/80656145 

Fork，本身并不是git工具中的一个命令，也不是对git的扩展，它是在GitHub上的概念，是另一种clone方式——在服务器端的clone。
而我们通常意义上的clone，是将远程repo 复制一份到本地。

当你从GitHub上 clone 一个 repo 到本地时，除非你已明确声明是这个repo的contributor，否则你是不能向其pull request的，此时，该远程的repo对于本地repo来说，就是upstream。
当你从GitHub上 fork 一个 repo 之后，再 clone forked repo 到本地，你就可以任意向其pull request，此时，远程的 repo 就是 origin。

下面一段是来自 GitHub pages 的解释:

> When a repo is cloned, it has a default remote called origin that points to your fork on GitHub, not the original repo it was forked from.
>
> To keep track of the original repo, you need to add another remote named upstream
>
> git remote add upstream git://github.com/user/repo_name.git

总结下来： 

1. 如果是 upstream repo，你只可以拉取最新代码（即 git fetch ），从而保证你本地的仓库与源仓库同步 
2. 如果是 origin repo，就是你自己的repo（自己创建的，或者 fork 的项目）你可以做 任何推拉操作（pull and push） 
3. 你可以通过 pull request 向 upstream repo 贡献代码