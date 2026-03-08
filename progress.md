# Boy Kibble 项目进度

## 当前状态：Week 1 完成，站点已上线

- 域名：proteinbro.net（Cloudflare 购买）
- 线上地址：https://proteinbro.net
- GitHub：https://github.com/suyfdong/proteinbro
- 部署：Cloudflare Pages，push main 自动部署

## 已完成

### 规划阶段
- [x] 项目定位与差异化确定
- [x] Semrush 关键词验证（8M+/月）
- [x] 竞品分析
- [x] 完整计划编写（plan.md + keyword-analysis.md）

### 2026-03-08 开发
- [x] 域名购买 proteinbro.net + Cloudflare DNS + Pages 部署
- [x] GitHub 仓库创建
- [x] Next.js 16 + Tailwind v4 + TypeScript 项目搭建
- [x] 首页（hero + 工具区 + Boy Kibble teaser + 分类 + newsletter + footer）
- [x] Ground Beef Macro Calculator 工具页
- [x] "What is Boy Kibble?" 权威长文（~2500 词，含食谱、营养表、成本分析、10 变体、FAQ）
- [x] Protein Per Dollar Calculator 工具页（20+ 蛋白质源排行榜）

### 改动文件清单
```
src/app/layout.tsx          — 全局布局 + Google Fonts
src/app/globals.css         — Tailwind v4 + 自定义动画/纹理
src/app/page.tsx            — 首页
src/app/boy-kibble/page.tsx — Boy Kibble 文章
src/app/tools/ground-beef-macro-calculator/page.tsx      — 页面壳
src/app/tools/ground-beef-macro-calculator/calculator.tsx — 计算器组件
src/app/tools/protein-per-dollar-calculator/page.tsx      — 页面壳
src/app/tools/protein-per-dollar-calculator/calculator.tsx — 排行榜组件
src/components/newsletter-form.tsx — Newsletter 表单
src/data/ground-beef.ts     — USDA 牛肉营养数据
src/data/protein-sources.ts — 20+ 蛋白质源数据
src/app/tools/meal-prep-cost-calculator/page.tsx      — 页面壳 + SEO + FAQ
src/app/tools/meal-prep-cost-calculator/calculator.tsx — 计算器组件
src/data/meal-prep-ingredients.ts — 26 种食材预设数据
src/data/recipes.ts              — 10 个食谱数据
src/components/recipe-card.tsx   — 食谱交互组件（macro 环形图 + 份量调节）
src/app/recipes/page.tsx         — 食谱列表页
src/app/recipes/[slug]/page.tsx  — 食谱详情页（动态路由 + Recipe Schema）
```

### 2026-03-09 开发
- [x] Meal Prep Cost Calculator 工具页（预设食材、价格编辑、per-meal 成本 + 宏量分析）
- [x] 首页更新：Meal Prep Cost 工具卡片从 "Soon" 改为 "Live"
- [x] 首页 footer 添加 Meal Prep Cost 链接
- [x] 食谱页模板（交互式 macro 环形图、份量调节器、图标化步骤、成本仪表盘）
- [x] Recipe Schema JSON-LD（每个食谱自动生成结构化数据）
- [x] 10 篇核心食谱（数据驱动，动态路由 /recipes/[slug]）
- [x] /recipes 列表页（按蛋白质排序 + 统计 summary）
- [x] 首页更新：Recipes 区块从 "Coming Soon" 改为 "10 Recipes Live"，可点击

## 待办（Week 2-4）
- [ ] Beehiiv newsletter 接入
- [ ] HARO 关键词提醒 + Reddit 参与

## 关键文件
- 计划：`plan.md`
- 关键词库：`keyword-analysis.md`
