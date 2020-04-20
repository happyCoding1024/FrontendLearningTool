## 如何删除 GitHub 仓库中的文件夹，同时保留本地的文件夹

> 应用场景：
>
> 删除 GitHub 仓库中的某个文件夹，但是在本地仓库中存在这个文件夹。

以删除 GitHub 仓库中的 .idea 文件夹为例：

1. 删除 GitHub 仓库中的 .idea 文件夹

   ```shell
   git rm -r --cached .idea
   ```

2. 在本地仓库中的 `.gitignore` 文件下加入下面的内容：

   ```shell
   /.idea
   ```

   经过这步操作之后， Git 就不会再管理`.idea` 文件夹了，即使 `.idea ` 文件夹发生了变化，那么 `git status` 也不会有 `.idea` 的信息。

如果你想将本地的文件夹和 GitHub 中的文件夹同时删除，只需将本地的文件夹删除之后，push 到 GitHub 仓库中即可。

