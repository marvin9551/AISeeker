# Agent 技术

> 关注 AI Agent 的工程实践：框架、工具协议、多智能体协作、可靠性设计。

## 核心概念速览

- **Agent**：能自主规划、调用工具、与环境交互完成任务的 AI 系统，区别于单轮问答。
- **ReAct / Planning**：让模型「思考-行动-观察」循环的核心范式。
- **MCP**（Model Context Protocol）：标准化模型与外部工具/数据源的连接协议。
- **Multi-Agent**：多个角色化 Agent 协作完成复杂任务。
- **Workflow 编排**：Dify、n8n 等低代码平台与 LangGraph 等代码框架。

## 值得关注的框架与工具

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| LangGraph | 代码框架 | 有状态、可编排的 Agent 构建框架 |
| OpenAI Agents SDK | 代码框架 | 轻量 Agent 框架，内置工具与 Guardrails |
| AutoGen | 代码框架 | 微软出品，多智能体对话 |
| CrewAI | 代码框架 | 角色化团队协作 |
| Dify / n8n | 低代码平台 | 可视化编排，适合快速搭建 |
| [DeepSeek Harness](./deepseek-harness) | Agent 运行平台 | 「一切皆插件」，模型/工具/Agent Loop 均可替换，MIT 开源 |

> 说明：工具生态变化很快，这个表格需要持续维护，欢迎提交更新。

## 近期动态

<!-- TODO: 按首页「记录格式」补充，按时间倒序排列。 -->

## 经典阅读

- 一篇 RAG 与 Agent 结合的系统性梳理文章（待补充链接）
- MCP 官方规范与快速上手文档（待补充链接）
