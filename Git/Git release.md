# Git Release 

> 原文链接：https://www.cnblogs.com/kingBook/p/8117861.html

## GIt 命令

```
git tag -a v3.0 -m "这是4.0版本"
git push origin v3.0
//git tag -a 标签名称 -m "说明"
//git push origin 标签名称
```

删除tag

```
git tag -d v1.1  //删除本地tag

git push origin :v1.1//删除远程tag
//也可以这样  
git push origin --delete tag V1.1 
```

 

以上命令在项目仓库创建了一个v3.0的release，如下图：

![img](https://images2017.cnblogs.com/blog/714380/201712/714380-20171226143556166-1870203031.png)

------

## Github UI 界面

1.进入到项目仓库，选择release选项卡，可以点击create a new release/Draft a new release创建一个新的release.

![img](https://images2017.cnblogs.com/blog/714380/201712/714380-20171226140043479-2077959168.png)

2.未勾选This is a pre-release通过github官方提供的api可访问我们的release信息，格式如下：

```
/repos/:owner/:repo/releases/:id
```

更多API说明访问：https://developer.github.com/v3/repos/releases/

例：访问https://api.github.com/repos/kingBook/testGit/releases/latest可以获取如下信息

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
{
  "url": "https://api.github.com/repos/kingBook/testGit/releases/9028810",
  "assets_url": "https://api.github.com/repos/kingBook/testGit/releases/9028810/assets",
  "upload_url": "https://uploads.github.com/repos/kingBook/testGit/releases/9028810/assets{?name,label}",
  "html_url": "https://github.com/kingBook/testGit/releases/tag/2.0",
  "id": 9028810,
  "tag_name": "2.0",
  "target_commitish": "master",
  "name": "testGit v2.0",
  "draft": false,
  "author": {
    "login": "kingBook",
    "id": 4969180,
    "avatar_url": "https://avatars3.githubusercontent.com/u/4969180?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/kingBook",
    "html_url": "https://github.com/kingBook",
    "followers_url": "https://api.github.com/users/kingBook/followers",
    "following_url": "https://api.github.com/users/kingBook/following{/other_user}",
    "gists_url": "https://api.github.com/users/kingBook/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/kingBook/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/kingBook/subscriptions",
    "organizations_url": "https://api.github.com/users/kingBook/orgs",
    "repos_url": "https://api.github.com/users/kingBook/repos",
    "events_url": "https://api.github.com/users/kingBook/events{/privacy}",
    "received_events_url": "https://api.github.com/users/kingBook/received_events",
    "type": "User",
    "site_admin": false
  },
  "prerelease": false,
  "created_at": "2017-05-03T08:34:10Z",
  "published_at": "2017-12-26T06:01:54Z",
  "assets": [

  ],
  "tarball_url": "https://api.github.com/repos/kingBook/testGit/tarball/2.0",
  "zipball_url": "https://api.github.com/repos/kingBook/testGit/zipball/2.0",
  "body": "这是第二个版本"
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 