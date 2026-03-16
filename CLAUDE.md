# CLAUDE.md — ProteinBro 项目指南

## 项目概要

- **站名**：ProteinBro — Simple High Protein Meals for Men
- **线上**：https://proteinbro.net
- **GitHub**：https://github.com/suyfdong/proteinbro
- **定位**：面向 16-34 岁健身男性的高蛋白简餐 niche 站，工具驱动 + SEO
- **语气**：gym bro 风格，反精致，数字优先（"40g protein, $2.50, 20 min"）

## 技术栈

- Next.js 16 + React 19 + TypeScript 5
- Tailwind CSS v4（PostCSS plugin 模式）
- lucide-react 图标
- 静态导出：`output: "export"`（Cloudflare Pages 部署）
- 字体：Barlow Condensed（heading）/ DM Sans（body）/ JetBrains Mono（数字）
- 暗色主题：zinc-950 底色 + green-500 主色

## 项目结构

```
src/
├── app/
│   ├── layout.tsx                 — 全局布局 + Google Fonts + GA4
│   ├── globals.css                — Tailwind v4 + 自定义动画
│   ├── page.tsx                   — 首页
│   ├── boy-kibble/page.tsx        — Boy Kibble 趋势文章
│   ├── recipes/
│   │   ├── page.tsx               — 食谱列表页（含分类入口 + combo 列表）
│   │   └── [slug]/page.tsx        — 统一详情页（食谱/combo/分类三合一路由）
│   ├── meal-prep/
│   │   ├── page.tsx               — Meal Prep Hub
│   │   ├── weekly-plan/page.tsx   — 7 天周计划 + 购物清单
│   │   ├── under-30-minutes/page.tsx — 快速备餐（按时间分桶）
│   │   └── budget/page.tsx        — 预算排行（蛋白质/美元条形图）
│   ├── tools/
│   │   ├── ground-beef-macro-calculator/   — 牛肉宏量计算器
│   │   ├── protein-per-dollar-calculator/  — 蛋白质性价比排行
│   │   └── meal-prep-cost-calculator/      — 备餐成本计算器
│   ├── sitemap.ts                 — 自动站点地图（99 URL）
│   └── robots.ts                  — 爬虫指引
├── components/
│   ├── newsletter-form.tsx        — Beehiiv Newsletter 表单
│   ├── recipe-card.tsx            — 食谱交互组件（macro 环形图 + 份量调节）
│   └── combo-card.tsx             — Combo 交互组件（评分条 + 换搭配链接）
└── data/
    ├── ground-beef.ts             — USDA 牛肉营养数据
    ├── protein-sources.ts         — 20+ 蛋白质源数据
    ├── meal-prep-ingredients.ts   — 26 种备餐食材数据
    ├── recipes.ts                 — 30 个手写食谱数据
    ├── combos.ts                  — 46 个程序化 Combo（蛋白质×方法×配菜）
    └── categories.ts              — 9 个蛋白质分类定义

public/
├── favicon.svg                    — 哑铃图标
├── recipes/*.webp                 — 76 张 AI 生成食物图片（Replicate FLUX）
└── google*.html                   — Google Search Console 验证
```

## 关键约定

- **每个工具页**：`page.tsx`（SEO metadata + FAQ Schema JSON-LD）+ `calculator.tsx`（"use client" 交互组件）
- **食谱页**：数据驱动，`src/data/recipes.ts`，通过 `generateStaticParams` 静态生成
- **Combo 页**：程序化生成，`src/data/combos.ts`，蛋白质×方法×配菜矩阵，HowTo + FAQPage Schema
- **分类页**：9 个蛋白质分类 Hub，`src/data/categories.ts`，CollectionPage Schema
- **`[slug]` 路由**：单一动态路由处理食谱、combo、分类三种内容（按优先级查找）
- **SEO**：每页有 metadata + canonical URL + openGraph；食谱有 Recipe Schema，combo 有 HowTo + FAQ Schema
- **Newsletter**：Beehiiv 接入（隐藏 iframe POST），publication ID: 4471e49d-5852-4780-816b-3c0a9c625521
- **Analytics**：GA4（G-WYD72QPSFN）+ Google Search Console 已验证
- **图片**：Replicate FLUX 1.1 Pro 生成，WebP 格式，存 `public/recipes/`
- **设计原则**：少文字、多数字、多交互组件；避免长篇段落；用可视化（环形图、stat card、排行榜）代替文字说明
- **价格数据**：美国均价（March 2026），所有价格用户可编辑
- **营养数据**：来源 USDA FoodData Central

## 常用命令

```bash
npm run dev          # 本地开发（Turbopack）
npm run build        # 构建（静态导出到 out/）
git push origin main # 推送后 Cloudflare Pages 自动部署
```

## 文档

- `plan.md` — 完整项目计划（定位、架构、变现、SEO 策略）
- `keyword-analysis.md` — Semrush 关键词研究数据
- `progress.md` — 开发进度追踪
