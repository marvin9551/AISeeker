# 什么是 DeepSeek Harness

> DeepSeek Harness（DSH）是 DeepSeek 于 2026 年 8 月 13 日开源的 Agent 运行环境，官方定义一句话：「Model + Harness = Agent」。它既不做模型、也不做聊天界面，而是把工具调用、会话管理、沙箱、存储和 Agent 循环组织成一套可拆装的系统，核心设计是「一切皆插件」。适用对象是想自己组装、替换 Agent 运行组件的开发者；不适合想要开箱即用完整产品的用户。

一句话区分：模型决定 Agent「能做什么」，Harness 决定 Agent「如何把事情做完」。相关概念见 [Agent 技术](./agents)。

## DeepSeek Harness 不是 Claude Code

DSH 发布后常被类比为「DeepSeek 版 Claude Code」，这个类比是错的。Claude Code 和 OpenAI Codex 是紧耦合的封闭产品，DSH 是开放可组装的 Agent 运行平台。

| 类型 | 核心特征 | 典型例子 | 什么时候用 |
|:---|:---|:---|:---|
| 聊天机器人 | 多轮问答，无工具调用 | DeepSeek 官方 App | 日常问答 |
| Coding Agent 产品 | 模型 + 工具 + 调度紧耦合封装，厂商定死 | Claude Code、OpenAI Codex | 开箱即用的编程助手 |
| Agent 框架 | 提供构建 Agent 的代码库 | LangGraph、AutoGen | 自己写代码编排 Agent |
| Agent 运行平台 | 模型、工具、会话、循环全部可插拔 | DeepSeek Harness | 想自由组装、替换 Agent 的任意组件 |

Claude Code 的模型、工具和调度策略由 Anthropic 决定，构成商业壁垒。DSH 从发布起就开源，把 Harness 层价值拉平为公共品，把竞争压回模型能力和价格——策略类似 R1 开源权重冲击 o1 溢价。DSH 的定位更像 Eclipse 或《我的世界》的地基，官方预置模式只是其上的一种「官方发行版」。

## Harness 的核心构成

| 模块 | 作用 | 面试追问 |
|:---|:---|:---|
| Model Adapter | 对接不同厂商模型，模型无关 | 换模型会不会影响会话状态？ |
| Tool Registry | 工具注册、卸载与依赖管理 | 工具冲突时系统怎么处理？ |
| Session Log / Trajectory | 记录 Agent 执行的每一步 | 会话怎么恢复、怎么分叉？ |
| Sandbox | 隔离代码与命令执行 | 沙箱能隔离到什么程度？ |
| Agent Loop | 思考-行动-观察循环 | 为什么 Loop 本身也要能替换？ |
| Storage | 持久化会话与上下文 | 升级后旧会话读不了怎么办？ |

## 一切皆插件：Cordis 架构

传统 Harness 像一栋浇筑好的大楼：核心结构厂商定死，用户只能在外部加 Skill 或接 MCP（见 [Agent 技术](./agents) 的协议条目）。DSH 把这栋大楼拆成一盒乐高——不只外围能力插件化，连 Model Adapter、Tool Registry、Session Log 甚至 Agent Loop 都是插件。目标是 Self-Evolving Agent Harness：Agent 能在运行中检查、挂载、修改自己的 Runtime。

支撑这套架构的是 Cordis 框架，来自 DeepSeek 与北京大学联合论文《A Programming Paradigm for Spatiotemporal Composability》。Cordis 已在 Koishi 聊天机器人框架中运行四年，4000+ 社区插件生产环境验证。它解决两个问题：

### 时间可组合性：卸载后副作用撤销

坏例子：一个插件注册了事件监听、启动定时器，卸载后监听器和定时器残留，系统被污染。

好例子：Cordis 要求所有对 Context 的修改通过 `ctx.effect` 进行，每次修改留下一个 inverse（撤销方法）。注册监听器时留下注销方法，启动定时器时留下关闭方法。插件卸载时，系统按相反顺序执行这些 inverse，把系统恢复到这个插件加入之前的状态。

### 空间可组合性：依赖关系自动调整

组件提前声明「我依赖什么」。Context 变化时，Runtime 重新检查依赖是否成立，分三种情况：原本缺失的依赖出现就激活（activating）、依赖消失就停用（deactivating）、无关则不变（neutral）。实现对应 `notify()` 和 `refresh()`。

典型场景：一个聊天记录插件依赖数据库服务。数据库出现时它可以启动；数据库被卸载后，Cordis 发现依赖失效，让这个插件随之退出，而不是继续访问不存在的服务。

Cordis 还有一个结论叫 Confluence（合流性）：只要可组合条件成立，两种完全不同的加载路径最终稳定下来的系统状态等价。这意味着 Agent 可以不断试错，试错历史不会永久污染 Runtime。

## 四种工作模式

| 模式 | 特征 | 什么时候用 |
|:---|:---|:---|
| 极简模式 | 精简交互，快速问答 | 日常问答 |
| 标准模式 | 默认模式，工具调用 + 任务执行 | 常规开发任务 |
| 创造模式 | 更自由的探索路径 | 开放式、无明确步骤的任务 |
| PTC 模式 | 模型写程序一次性执行长流程，中间数据保留在执行环境 | 长流程批量任务，显著节省 Token |

PTC（Programmatic Tool Calling）是 DSH 的差异化功能：普通 Agent 一轮任务几十次工具调用、每次都要回传上下文，PTC 让模型把整条流程写成程序，中间数据留在执行环境中，只传结果。

## 可观测性：Trajectory 轨迹视图

DSH 把 Agent 执行过程记录成一份只增不改的会话日志：系统提示词、推理过程、工具调用及结果、子 Agent 调度、每一次上下文注入，以及耗时和 Token 消耗。用户可以用轨迹视图回溯每一步，复盘问题、恢复会话、分叉出新任务。

## 什么时候不该用 DeepSeek Harness

- **要生产级稳定**：官方 README 用全大写警告「THERE WILL BE COMPATIBILITY-BREAKING CHANGES」，会话格式不提供兼容承诺，升级后旧会话可能读不了。v0.1 只适合评估，不适合做唯一生产工具。
- **要开箱即用**：需要 Node.js 环境、CLI 启动、Web 界面配置，Skills 加载、插件说明都有学习成本。
- **对成本敏感**：Agent 长任务 Token 消耗大。DSH 开源但模型 API 收费，且 V4 API 已改为峰谷分时定价：高峰时段 V4 Flash 输出涨至 4.5 倍、V4 Pro 缓存命中涨至 12 倍。
- **安全要求高**：插件能访问本地 Shell 和文件系统，攻击面大。社区已有 dsh-security 仓库展示可行的攻击链 demo，还有 ad 插件和 anti-ad 插件的攻防。
- **只想聊天**：用 DeepSeek 官方 App 就够了。
- **怕维护复杂度**：组件细化到原子级后，为保证组件独立而引入的 integration component 可能呈 O(n²) 增长。

## 面试怎么回答

> Harness 是让大模型成为 Agent 的整套运行系统，负责工具调用、会话管理、沙箱和任务循环。DeepSeek Harness 的特殊点是把这些全部插件化——基于源自 Koishi 的 Cordis 框架，模型适配器、工具注册表、会话日志甚至 Agent Loop 都能自由替换，并通过可撤销副作用实现热插拔。它和 Claude Code 的根本区别是：后者是紧耦合的封闭产品，DSH 是开放、可组装、可自我演进的 Agent 运行平台。

## 动手前自检

1. 环境：装 Node.js，按官方 README 安装 `dsh` 命令行。
2. 配置：启动 dsh，在 Web 界面填 API Key、选模型（默认 DeepSeek V4 Pro，可换 Anthropic、OpenAI、Kimi）。模型选型参考 [大模型进展](./models)。
3. 验证：选一个本地工作区，跑「改一行代码并跑测试」这样的小任务，确认文件读写和命令执行权限符合预期。
4. 复盘：打开 Trajectory 视图，看工具调用、耗时和 Token 消耗，对比 PTC 模式与非 PTC 模式的成本差异。
5. 扩展：从社区精选列表挑插件安装。装之前确认来源，第三方插件默认有 Shell 权限。

## 延伸阅读

- [DeepSeek Harness GitHub 仓库](https://github.com/deepseek-ai/deepseek-harness)
- [DeepSeek Harness 安全使用政策](https://www.deepseek.com/harness/privacy/)
- [澎湃：DeepSeek 智能体框架开放测试，Harness 是什么？](https://m.thepaper.cn/newsDetail_forward_33783308)
- [澎湃：上线 12 小时 5 万星，DeepSeek Harness 实测](https://www.thepaper.cn/newsDetail_forward_33787836)
- [腾讯新闻：一切皆插件，赌的是 Agent 大平台](https://news.qq.com/rain/a/20260818A029IG00)
- [新浪：深度拆解 DeepSeek Harness 架构](https://finance.sina.com.cn/tech/roll/2026-08-17/doc-ininrkkn9056577.shtml)
