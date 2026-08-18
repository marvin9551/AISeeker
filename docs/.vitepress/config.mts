import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'AISeeker',
  description: '一站式 AI 知识库：最新 AI 技术、面试题库、学习路线与使用指南',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前沿技术', link: '/01-ai-frontier/' },
      { text: '学习路线', link: '/02-learning/' },
      { text: '面试题库', link: '/03-interview/' },
      { text: '使用指南', link: '/04-ai-guide/' },
      { text: '资源导航', link: '/05-resources/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/marvin9551/AISeeker' },
    ],

    sidebar: {
      '/01-ai-frontier/': [
        {
          text: '前沿技术',
          items: [
            { text: '概览', link: '/01-ai-frontier/index' },
            { text: '大模型进展', link: '/01-ai-frontier/models' },
            { text: 'Agent 技术', link: '/01-ai-frontier/agents' },
            { text: 'RAG 与检索', link: '/01-ai-frontier/rag' },
            { text: '多模态', link: '/01-ai-frontier/multimodal' },
            { text: 'AI 工具与平台', link: '/01-ai-frontier/tools' },
          ],
        },
      ],
      '/02-learning/': [
        {
          text: '学习路线',
          items: [
            { text: '概览', link: '/02-learning/index' },
            { text: '开发者路线图', link: '/02-learning/developer-roadmap' },
            { text: '非技术用户上手', link: '/02-learning/non-developer-guide' },
          ],
        },
      ],
      '/03-interview/': [
        {
          text: '面试题库',
          items: [
            { text: '概览', link: '/03-interview/index' },
            { text: '基础概念', link: '/03-interview/fundamentals' },
            { text: '大模型 LLM', link: '/03-interview/llm' },
            { text: 'RAG 与检索', link: '/03-interview/rag' },
            { text: 'Agent 与工具调用', link: '/03-interview/agents' },
            { text: '工程实践与编程', link: '/03-interview/engineering' },
          ],
        },
      ],
      '/04-ai-guide/': [
        {
          text: '使用指南',
          items: [
            { text: '概览', link: '/04-ai-guide/index' },
            { text: '提示词入门', link: '/04-ai-guide/prompt-engineering' },
            { text: 'ChatGPT 使用技巧', link: '/04-ai-guide/chatgpt' },
            { text: 'Claude 使用技巧', link: '/04-ai-guide/claude' },
            { text: '工具对比与选型', link: '/04-ai-guide/tool-comparison' },
          ],
        },
      ],
      '/05-resources/': [
        {
          text: '资源导航',
          items: [
            { text: '概览', link: '/05-resources/index' },
            { text: '精选链接', link: '/05-resources/curated-links' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/marvin9551/AISeeker/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    footer: {
      message: '免费开放，坚决不做知识付费 · 内容由社区共创 · <a href="https://github.com/marvin9551/AISeeker">GitHub</a>',
      copyright: 'Copyright 2026 AISeeker contributors · MIT License',
    },

    notFound: {
      title: '页面不存在',
      quote: '这里什么都没有，回到首页继续探索吧。',
      linkText: '回到首页',
      code: '404',
    },
  },
})
