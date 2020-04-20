### Git 一问一答系列

1. **如果你在 index-recommend 分支上开发了 recommend 的功能，但是没用合并到 master  分支，这个时候你又创建了一个分支 index-weekend，请问这个时候在 index-weekend 会不会有 index-recommend 分支上开发的程序？**

   答：没有，注意创建分支的底层实现，创建一个分支实际上是将当前 master 分支的指针指向这个新创建的分支，如果要切换到这个新创建的分支，实际上是将 HEAD 指针指向了这个新创建的分支。这里 index-recommend 分支并没有合并到 master 分支，所以master 分支上并没有 index-recommend 的内容，此时在新创建的分支是将 master 的指针指向了新创建的分支，所以新创建的分支上并没有 index-recommend 上的内容，但是 master 上之前的内容是都有的。

   - **如果此时 index-recommend 和 新创建的分支 index-weekend 合并后，此时 index-weekend 上已经有最新最全的代码了，请问此时 master 上是不是最新最全的代码？**

     答：不是的，因为master分支的指针还在创建 index-weekend 分支的地方，当 index-weekend 分支合并到 master 分支之后 master 上才有最新最全的代码。

2. 创建新分支的时候是在当前分支的基础上进行创建的，也就是将当前分支的指针赋给这个新分支，而并不一定将 master 分支的指针赋给这个新分支。

   但是有一点需要注意的是 master 分支是主分支，任何分支的功能开发完成之后要及时 merge 到主分支，所以一般来说，master 分支上始终保存着最新的代码。

