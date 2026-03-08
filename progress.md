# Boy Kibble 项目进度

## 当前状态：3 工具 + 10 食谱已上线

- 线上：https://proteinbro.net
- GitHub：https://github.com/suyfdong/proteinbro
- 部署：Cloudflare Pages，push main 自动部署
- 总页面：18 个（首页 + Boy Kibble 文章 + 3 工具 + 食谱列表 + 10 食谱详情 + 404）

---

## Day 1 — 2026-03-08

- [x] 域名 + Cloudflare + GitHub + Next.js 16 项目搭建
- [x] 首页（hero + 工具区 + Boy Kibble teaser + newsletter + footer）
- [x] Ground Beef Macro Calculator
- [x] "What is Boy Kibble?" 长文
- [x] Protein Per Dollar Calculator（20+ 蛋白质源排行榜）

## Day 2 — 2026-03-09

- [x] Meal Prep Cost Calculator（26 种预设食材、价格编辑、per-meal 成本 + 宏量分析）
- [x] 10 篇食谱（数据驱动、动态路由 + Recipe Schema JSON-LD）
- [x] 食谱交互组件（macro 环形图、份量调节器、图标化步骤、成本仪表盘）
- [x] /recipes 列表页（按蛋白质排序 + 统计卡片）
- [x] 首页更新（3 工具全 Live、Recipes 可点击）

**Day 2 改动文件：**
```
新增：
  src/app/tools/meal-prep-cost-calculator/page.tsx      — 工具页壳
  src/app/tools/meal-prep-cost-calculator/calculator.tsx — 计算器组件
  src/data/meal-prep-ingredients.ts  — 26 种食材数据
  src/data/recipes.ts                — 10 个食谱数据
  src/components/recipe-card.tsx     — 食谱交互组件
  src/app/recipes/page.tsx           — 食谱列表页
  src/app/recipes/[slug]/page.tsx    — 食谱详情页

修改：
  src/app/page.tsx  — 首页（工具卡片 Live + Recipes 链接）
  progress.md
```

---

## 下一步

- [ ] Beehiiv newsletter 接入（替换当前假表单）
- [ ] HARO 关键词提醒 + Reddit 参与
- [ ] 更多食谱（目标：月底 30+）
- [ ] 程序化 SEO 页面（蛋白质 × 烹饪方法 × 配菜组合）
- [ ] sitemap.ts 自动生成
- [ ] GA4 / Cloudflare Analytics 接入

## 关键文件

- 计划：`plan.md`
- 关键词库：`keyword-analysis.md`
