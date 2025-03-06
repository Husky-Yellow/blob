---
sidebar: auto
---
# Git搜索

## 普通的搜索

相信一般人搜索项目时，都是直接搜索技术栈相关的项目。

高级一点的搜索，会根据 最匹配、最多 Star 来进行排序、选择相应的语言、选择仓库或者代码来进行筛选。

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search1.jpg)


## 搜索语法

搜索 GitHub 时，你可以构建匹配特定数字和单词的查询。

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search13.jpg)

### 查询大于或小于另一个值的值

您可以使用 `>`、`>=`、`<` 和 `<=` 搜索大于、大于等于、小于以及小于等于另一个值的值。

| 查询    | 示例                                                         |
| ------- | ------------------------------------------------------------ |
| `>*n*`  | **[cats vue:>1000](https://github.com/search?utf8=✓&q=vue+stars%3A>1000&type=Repositories)** 匹配含有 "vue" 字样、星标超过 1000 个的仓库。 |
| `>=*n*` | **[vue topics:>=5](https://github.com/search?utf8=✓&q=vue+topics%3A>%3D5&type=Repositories)** 匹配含有 "vue" 字样、有 5 个或更多主题的仓库。 |
| `<*n*`  | **[vue size:<10000](https://github.com/search?utf8=✓&q=vue+size%3A<10000&type=Code)** 匹配小于 10 KB 的文件中含有 "vue" 字样的代码。 |
| `<=*n*` | **[vue stars:<=50](https://github.com/search?utf8=✓&q=vue+stars%3A<%3D50&type=Repositories)** 匹配含有 "vue" 字样、星标不超过 50 个的仓库。 |

您还可以使用 范围查询 搜索大于等于或小于等于另一个值的值。

| 查询     | 示例                                                         |
| -------- | ------------------------------------------------------------ |
| `*n*..*` | **[vue stars:10..\*](https://github.com/search?utf8=✓&q=vue+stars%3A10..\*&type=Repositories)** 等同于 `stars:>=10` 并匹配含有 "vue" 字样、有 10 个或更多星号的仓库。 |
| `*..*n*` | **[vue stars:\*..10](https://github.com/search?utf8=✓&q=vue+stars%3A"\*..10"&type=Repositories)** 等同于 `stars:<=10` 并匹配含有 "vue" 字样、有不超过 10 个星号的仓库。 |

### 查询范围之间的值

您可以使用范围语法 `*n*..*n*` 搜索范围内的值，其中第一个数字 *n* 是最低值，而第二个是最高值。

| 查询       | 示例                                                         |
| ---------- | ------------------------------------------------------------ |
| `*n*..*n*` | **[vue stars:10..50](https://github.com/search?utf8=✓&q=cats+stars%3A10..50&type=Repositories)** 匹配含有 "vue" 字样、有 10 到 50 个星号的仓库。 |

### 查询日期

您可以通过使用 `>`、`>=`、`<`、`<=` 和 范围查询 搜索早于或晚于另一个日期，或者位于日期范围内的日期。

日期格式必须遵循 [ISO8601](http://en.wikipedia.org/wiki/ISO_8601) 标准，即 `YYYY-MM-DD`（年-月-日）。

| 查询                                 | 示例                                                         |
| ------------------------------------ | ------------------------------------------------------------ |
| `>*YYYY*-*MM*-*DD*`                  | **[vue created:>2016-04-29](https://github.com/search?utf8=✓&q=vue+created%3A>2016-04-29&type=Issues)** 匹配含有 "vue" 字样、在 2016 年 4 月 29 日之后创建的议题。 |
| `>=*YYYY*-*MM*-*DD*`                 | **[vue created:>=2017-04-01](https://github.com/search?utf8=✓&q=vue+created%3A>%3D2017-04-01&type=Issues)** 匹配含有 "vue" 字样、在 2017 年 4 月 1 日或之后创建的议题。 |
| `<*YYYY*-*MM*-*DD*`                  | **[vue pushed:<2012-07-05](https://github.com/search?q=vue+pushed%3A<2012-07-05&type=Code&utf8=✓)** 匹配在 2012 年 7 月 5 日之前推送的仓库中含有 "vue" 字样的代码。 |
| `<=*YYYY*-*MM*-*DD*`                 | **[vue created:<=2012-07-04](https://github.com/search?utf8=✓&q=vue+created%3A<%3D2012-07-04&type=Issues)** 匹配含有 "vue" 字样、在 2012 年 7 月 4 日或之前创建的议题。 |
| `*YYYY*-*MM*-*DD*..*YYYY*-*MM*-*DD*` | **[vue pushed:2016-04-30..2016-07-04](https://github.com/search?utf8=✓&q=vue+pushed%3A2016-04-30..2016-07-04&type=Repositories)** 匹配含有 "vue" 字样、在 2016 年 4 月末到 7 月之间推送的仓库。 |
| `*YYYY*-*MM*-*DD*..*`                | **[vue created:2012-04-30..\*](https://github.com/search?utf8=✓&q=vue+created%3A2012-04-30..\*&type=Issues)** 匹配在 2012 年 4 月 30 日之后创建、含有 "vue" 字样的议题。 |
| `*..*YYYY*-*MM*-*DD*`                | **[vue created:\*..2012-04-30](https://github.com/search?utf8=✓&q=vue+created%3A\*..2012-07-04&type=Issues)** 匹配在 2012 年 7 月 4 日之前创建、含有 "vue" 字样的议题。 |

您也可以在日期后添加可选的时间信息 `THH:MM:SS+00:00`，以便按小时、分钟和秒进行搜索。 这是 `T`，随后是 `HH:MM:SS`（时-分-秒）和 UTC 偏移 (`+00:00`)。

| 查询                                        | 示例                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| `*YYYY*-*MM*-*DD*T*HH*:*MM*:*SS*+*00*:*00*` | **[vue created:2017-01-01T01:00:00+07:00..2017-03-01T15:30:15+07:00](https://github.com/search?utf8=✓&q=vue+created%3A2017-01-01T01%3A00%3A00%2B07%3A00..2017-03-01T15%3A30%3A15%2B07%3A00&type=Issues)** 匹配在 2017 年 1 月 1 日凌晨 1 点（UTC 偏移为 `07:00`）与 2017 年 3 月 1 日下午 3 点（UTC 偏移为 `07:00`）之间创建的议题。 UTC 偏移量 `07:00`，2017 年 3 月 1 日下午 3 点。 UTC 偏移量 `07:00`。 |
| `*YYYY*-*MM*-*DD*T*HH*:*MM*:*SS*Z`          | **[vue created:2016-03-21T14:11:00Z..2016-04-07T20:45:00Z](https://github.com/search?utf8=✓&q=vue+created%3A2016-03-21T14%3A11%3A00Z..2016-04-07T20%3A45%3A00Z&type=Issues)** 匹配在 2016 年 3 月 21 日下午 2:11 与 2016 年 4 月 7 日晚上 8:45 之间创建的议题。 |

### 排除特定结果

您可以使用 `NOT` 语法排除包含特定字词的结果。 `NOT` 运算符只能用于字符串关键词， 不适用于数字或日期。

| 查询  | 示例                                                         |
| ----- | ------------------------------------------------------------ |
| `NOT` | **[hello NOT world](https://github.com/search?q=hello+NOT+world&type=Repositories)** 匹配含有 "hello" 字样但不含有 "world" 字样的仓库。 |

缩小搜索结果范围的另一种途径是排除特定的子集。 您可以为任何搜索限定符添加 `-` 前缀，以排除该限定符匹配的所有结果。

| 查询           | 示例                                                         |
| -------------- | ------------------------------------------------------------ |
| `-*QUALIFIER*` | **[vue stars:>10 -language:javascript](https://github.com/search?q=vue+stars%3A>10+-language%3Ajavascript&type=Repositories)** 匹配含有 "vue" 字样、有超过 10 个星号但并非以 JavaScript 编写的仓库。 |
|                | **[mentions:biaochenxuying -org:github](https://github.com/search?utf8=✓&q=mentions%3Adefunkt+-org%3Agithub&type=Issues)** 匹配提及 @biaochenxuying 且不在 GitHub 组织仓库中的议题 |

### 对带有空格的查询使用引号

如果搜索含有空格的查询，您需要用引号将其括起来。 例如：

- [cats NOT "hello world"](https://github.com/search?utf8=✓&q=cats+NOT+"hello+world"&type=Repositories) 匹配含有 "vue" 字样但不含有 "hello world" 字样的仓库。
- [build label:"bug fix"](https://github.com/search?utf8=✓&q=build+label%3A"bug+fix"&type=Issues) 匹配具有标签 "bug fix"、含有 "build" 字样的议题。

某些非字母数字符号（例如空格）会从引号内的代码搜索查询中删除，因此结果可能出乎意料。

### 使用用户名的查询

如果搜索查询包含需要用户名的限定符，例如 `user`、`actor` 或 `assignee`，您可以使用任何 GitHub 用户名指定特定人员，或使用 `@me` 指定当前用户。

| 查询                 | 示例                                                         |
| -------------------- | ------------------------------------------------------------ |
| `QUALIFIER:USERNAME` | [`author:biaochenxuying`](https://github.com/search?q=author%3Anat&type=Commits) 匹配 @biaochenxuying 创作的提交。 |
| `QUALIFIER:@me`      | [`is:issue assignee:@me`](https://github.com/search?q=is%3Aissue+assignee%3A%40me&type=Issues) 匹配已分配给结果查看者的议题 |

`@me` 只能与限定符一起使用，而不能用作搜索词，例如 `@me main.workflow`。

## 高级的搜索

### 按仓库名称、说明或自述文件内容搜索

通过 `in` 限定符，您可以将搜索限制为仓库名称、仓库说明、自述文件内容或这些的任意组合。

如果省略此限定符，则只搜索仓库名称和说明。

| 限定符            | 示例                                                         |
| ----------------- | ------------------------------------------------------------ |
| `in:name`         | [**vue in:name**](https://github.com/search?q=vue+in%3Aname&type=Repositories) 匹配其名称中含有 "jquery" 的仓库。 |
| `in:description`  | [**vue in:name,description**](https://github.com/search?q=vue+in%3Aname%2Cdescription&type=Repositories) 匹配其名称或说明中含有 "vue" 的仓库。 |
| `in:readme`       | [**vue in:readme**](https://github.com/search?q=vue+in%3Areadme&type=Repositories) 匹配其自述文件中提及 "vue" 的仓库。 |
| `repo:owner/name` | [**repo:biaochenxuying/blog**](https://github.com/search?q=repo%3Abiaochenxuying%2Fblog) 匹配特定仓库名称，比如：用户为 biaochenxuying 的 blog 项目。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search2.jpg)

### 在用户或组织的仓库内搜索

要在 `特定用户或组织` 拥有的所有仓库中搜索，您可以使用 `user` 或 `org` 限定符。

| 限定符            | 示例                                                         |
| ----------------- | ------------------------------------------------------------ |
| `user:*USERNAME*` | [**user:biaochenxuying forks:>=100**](https://github.com/search?q=user%3Abiaochenxuying+forks%3A>%3D100&type=Repositories) 匹配来自 @biaochenxuying、拥有超过 100 复刻的仓库。 |
| `org:*ORGNAME*`   | [**org:github**](https://github.com/search?utf8=✓&q=org%3Agithub&type=Repositories) 匹配来自 GitHub 的仓库。 |

### 按仓库大小搜索

`size` 限定符使用 [大于、小于和范围限定符](https://docs.github.com/cn/free-pro-team@latest/articles/understanding-the-search-syntax) 查找匹配特定大小（以千字节为单位）的仓库。

| 限定符     | 示例                                                         |
| ---------- | ------------------------------------------------------------ |
| `size:*n*` | [**size:1000**](https://github.com/search?q=size%3A1000&type=Repositories) 匹配恰好为 1 MB 的仓库。 |
|            | [**size:>=30000**](https://github.com/search?q=size%3A>%3D30000&type=Repositories) 匹配至少为 30 MB 的仓库。 |
|            | [**size:<50**](https://github.com/search?q=size%3A<50&type=Repositories) 匹配小于 50 KB 的仓库。 |
|            | [**size:50..120**](https://github.com/search?q=size%3A50..120&type=Repositories) 匹配介于 50 KB 与 120 KB 之间的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search3.jpg)

### 按关注者数量搜索

您可以使用 `followers` 限定符以及[大于、小于和范围限定符](https://docs.github.com/cn/free-pro-team@latest/articles/understanding-the-search-syntax)基于仓库拥有的关注者数量过滤仓库。

| 限定符          | 示例                                                         |
| --------------- | ------------------------------------------------------------ |
| `followers:*n*` | [**node followers:>=10000**](https://github.com/search?q=node+followers%3A>%3D10000) 匹配有 10,000 或更多关注者提及文字 "node" 的仓库。 |
|                 | [**styleguide linter followers:1..10**](https://github.com/search?q=styleguide+linter+followers%3A1..10&type=Repositories) 匹配拥有 1 到 10 个关注者并且提及 "styleguide linter" 一词的的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search4.jpg)

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search5.jpg)

### 按复刻数量搜索

`forks` 限定符使用[大于、小于和范围限定符](https://docs.github.com/cn/free-pro-team@latest/articles/understanding-the-search-syntax)指定仓库应具有的复刻数量。

| 限定符      | 示例                                                         |
| ----------- | ------------------------------------------------------------ |
| `forks:*n*` | [**forks:5**](https://github.com/search?q=forks%3A5&type=Repositories) 匹配只有 5 个复刻的仓库。 |
|             | [**forks:>=205**](https://github.com/search?q=forks%3A>%3D205&type=Repositories) 匹配具有至少 205 个复刻的仓库。 |
|             | [**forks:<90**](https://github.com/search?q=forks%3A<90&type=Repositories) 匹配具有少于 90 个复刻的仓库。 |
|             | [**forks:10..20**](https://github.com/search?q=forks%3A10..20&type=Repositories) 匹配具有 10 到 20 个复刻的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search6.jpg)

### 按星号数量搜索

您可以使用 [大于、小于和范围限定符](https://docs.github.com/cn/free-pro-team@latest/articles/understanding-the-search-syntax) 基于仓库具有的 [星标](https://docs.github.com/cn/free-pro-team@latest/articles/saving-repositories-with-stars) 数量搜索仓库

| 限定符      | 示例                                                         |
| ----------- | ------------------------------------------------------------ |
| `stars:*n*` | [**stars:500**](https://github.com/search?utf8=✓&q=stars%3A500&type=Repositories) 匹配恰好具有 500 个星号的仓库。 |
|             | [**stars:10..20**](https://github.com/search?q=stars%3A10..20+size%3A<1000&type=Repositories) 匹配具有 10 到 20 个星号、小于 1000 KB 的仓库。 |
|             | [**stars:>=500 fork:true language:vue**](https://github.com/search?q=stars%3A>%3D500+fork%3Atrue+language%3Avue&type=Repositories) 匹配具有至少 500 个星号，包括复刻的星号（以 vue 编写）的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search7.jpg)

### 按仓库创建或上次更新时间搜索

你可以基于创建时间或上次更新时间过滤仓库。

- 对于仓库创建，您可以使用 `created` 限定符；
- 要了解仓库上次更新的时间，您要使用 `pushed` 限定符。 `pushed` 限定符将返回仓库列表，按仓库中任意分支上最近进行的提交排序。

两者均采用日期作为参数。 日期格式必须遵循 ISO8601 标准，即 `YYYY-MM-DD`（年-月-日）。

也可以在日期后添加可选的时间信息 `THH:MM:SS+00:00`，以便按小时、分钟和秒进行搜索。 这是 `T`，随后是 `HH:MM:SS`（时-分-秒）和 UTC 偏移 (`+00:00`)。

日期支持 `大于、小于和范围限定符`。

| 限定符                 | 示例                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `created:*YYYY-MM-DD*` | [**vue created:<2020-01-01**](https://github.com/search?q=vue+created%3A<2020-01-01&type=Repositories) 匹配具有 "vue" 字样、在 2020 年之前创建的仓库。 |
| `pushed:*YYYY-MM-DD*`  | [**css pushed:>2020-02-01**](https://github.com/search?utf8=✓&q=css+pushed%3A>2020-02-01&type=Repositories) 匹配具有 "css" 字样、在 2020 年 1 月之后收到推送的仓库。 |
|                        | [**vue pushed:>=2020-03-06 fork:only**](https://github.com/search?q=vue+pushed%3A>%3D2020-03-06+fork%3Aonly&type=Repositories) 匹配具有 "vue" 字样、在 2020 年 3 月 6 日或之后收到推送并且作为复刻的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search9.jpg)

### 按语言搜索

您可以基于其编写采用的主要语言搜索仓库。

| 限定符                | 示例                                                         |
| --------------------- | ------------------------------------------------------------ |
| `language:*LANGUAGE*` | [**vue language:javascript**](https://github.com/search?q=vue+language%3Ajavascript&type=Repositories) 匹配具有 "vue" 字样、以 JavaScript 编写的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search8.jpg)

### 按主题搜索

您可以查找归类为特定 [主题](https://docs.github.com/cn/free-pro-team@latest/articles/classifying-your-repository-with-topics) 的所有仓库。

| 限定符          | 示例                                                         |
| --------------- | ------------------------------------------------------------ |
| `topic:*TOPIC*` | [**topic:algorithm**](https://github.com/search?utf8=✓&q=topic%3Aalgorithm&type=Repositories&ref=searchresults) 匹配已归类为 "algorithm" 主题的仓库。 |

估计又有很多人不知道 GitHub 上有话题一说的吧。

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search10.jpg)

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search11.jpg)

### 按主题数量搜索

您可以使用 `topics` 限定符以及 [大于、小于和范围限定符](https://docs.github.com/cn/free-pro-team@latest/articles/understanding-the-search-syntax) 按应用于仓库的 [主题](https://docs.github.com/cn/free-pro-team@latest/articles/classifying-your-repository-with-topics) 数量搜索仓库。

| 限定符       | 示例                                                         |
| ------------ | ------------------------------------------------------------ |
| `topics:*n*` | [**topics:5**](https://github.com/search?utf8=✓&q=topics%3A5&type=Repositories&ref=searchresults) 匹配具有五个主题的仓库。 |
|              | [**topics:>3**](https://github.com/search?utf8=✓&q=topics%3A>3&type=Repositories&ref=searchresults) 匹配超过三个主题的仓库。 |

![img](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search12.jpg)

### 使用可视界面搜索

还可以使用 [search](https://github.com/search) page 或 [advanced search](https://github.com/search/advanced) page 搜索 GitHub 哦。

这种搜索方式，估计就更少人知道了吧。

[advanced search](https://github.com/search/advanced) page 提供用于构建搜索查询的可视界面。

您可以按各种因素过滤搜索，例如仓库具有的星标数或复刻数。 在填写高级搜索字段时，您的查询将在顶部搜索栏中自动构建。

![高级搜索](https://gitee.com/husky-bear/picture-bed/raw/master/git/git_search13.gif)

### 按许可搜索

您可以按其[许可](https://docs.github.com/cn/free-pro-team@latest/articles/licensing-a-repository)搜索仓库。 您必须使用[许可关键词](https://docs.github.com/cn/free-pro-team@latest/articles/licensing-a-repository/#searching-github-by-license-type)按特定许可或许可系列过滤仓库。

| 限定符                      | 示例                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `license:*LICENSE_KEYWORD*` | [**license:apache-2.0**](https://github.com/search?utf8=✓&q=license%3Aapache-2.0&type=Repositories&ref=searchresults) 匹配根据 Apache License 2.0 授权的仓库。 |

### 按公共或私有仓库搜索

您可以基于仓库是公共还是私有来过滤搜索。

| 限定符       | 示例                                                         |
| ------------ | ------------------------------------------------------------ |
| `is:public`  | [**is:public org:github**](https://github.com/search?q=is%3Apublic+org%3Agithub&type=Repositories&utf8=✓) 匹配 GitHub 拥有的公共仓库。 |
| `is:private` | [**is:private pages**](https://github.com/search?utf8=✓&q=pages+is%3Aprivate&type=Repositories) 匹配您有访问权限且包含 "pages" 字样的私有仓库。 |

### 按公共或私有仓库搜索

您可以根据仓库是否为镜像以及托管于其他位置托管来搜索它们。

| 限定符         | 示例                                                         |
| -------------- | ------------------------------------------------------------ |
| `mirror:true`  | [**mirror:true GNOME**](https://github.com/search?utf8=✓&q=mirror%3Atrue+GNOME&type=) 匹配是镜像且包含 "GNOME" 字样的仓库。 |
| `mirror:false` | [**mirror:false GNOME**](https://github.com/search?utf8=✓&q=mirror%3Afalse+GNOME&type=) 匹配并非镜像且包含 "GNOME" 字样的仓库。 |

### 基于仓库是否已存档搜索

你可以基于仓库是否[已存档](https://docs.github.com/cn/free-pro-team@latest/articles/about-archiving-repositories)来搜索仓库。

| 限定符           | 示例                                                         |
| ---------------- | ------------------------------------------------------------ |
| `archived:true`  | [**archived:true GNOME**](https://github.com/search?utf8=✓&q=archived%3Atrue+GNOME&type=) 匹配已存档且包含 "GNOME" 字样的仓库。 |
| `archived:false` | [**archived:false GNOME**](https://github.com/search?utf8=✓&q=archived%3Afalse+GNOME&type=) 匹配未存档且包含 "GNOME" 字样的仓库。 |

### 基于具有 `good first issue` 或 `help wanted` 标签的议题数量搜索

您可以使用限定符 `help-wanted-issues:>n` 和 `good-first-issues:>n` 搜索具有最少数量标签为 `help-wanted` 或 `good-first-issue` 议题的仓库。

| 限定符                  | 示例                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `good-first-issues:>n`  | [**good-first-issues:>2 javascript**](https://github.com/search?utf8=✓&q=javascript+good-first-issues%3A>2&type=) 匹配具有超过两个标签为 `good-first-issue` 的议题且包含 "javascript" 字样的仓库。 |
| `help-wanted-issues:>n` | [**help-wanted-issues:>4 react**](https://github.com/search?utf8=✓&q=react+help-wanted-issues%3A>4&type=) 匹配具有超过四个标签为 `help-wanted` 的议题且包含 "React" 字样的仓库。 |

## 学习

其实，以上很多内容的都是来自于 GitHub 的官方文档，如果你还想学习更多技巧，请看

> [GitHub 官方文档](https://docs.github.com/cn) : [docs.github.com/cn](https://docs.github.com/cn)

如果你还不了解或者不会使用 GitHub ，可以看看这一章节：

> [Git 和 GitHub 学习资源](https://docs.github.com/cn/free-pro-team@latest/github/getting-started-with-github/git-and-github-learning-resources) ：https://docs.github.com/cn/free-pro-team@latest/github/getting-started-with-github/git-and-github-learning-resources