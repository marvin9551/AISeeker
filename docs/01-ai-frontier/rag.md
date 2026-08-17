# RAG 与检索

> 检索增强生成（RAG）是让模型基于自有知识回答问题的核心技术。
> 这里关注文档解析、向量库、GraphRAG、Agentic RAG 与评估。

## 知识框架

1. **文档解析**：PDF/Word/网页 结构化抽取
2. **切片与嵌入**：chunk 策略、embedding 模型选型
3. **存储与检索**：向量库（Milvus、Qdrant、FAISS 等）、混合检索、重排
4. **生成与引用**：Prompt 组装、引用溯源、答案评估
5. **进阶方向**：GraphRAG、Agentic RAG、多模态 RAG

## 常用评估工具

- RAGAS：RAG 效果评估框架
- Promptfoo / DeepEval：评测与回归测试
- 各类 RAG benchmark 数据集

## 近期动态

<!-- TODO: 按首页「记录格式」补充，按时间倒序排列。 -->

## 常见问题

- 为什么我的 RAG 总答非所问？排查链路是什么？
- 向量检索 + 关键词混合检索为什么更稳？
- RAG 和微调应该怎么选？
