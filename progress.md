# Boy Kibble 项目进度

## 当前状态：3 工具 + 10 食谱 + Newsletter 已上线

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

## Day 3 — 2026-03-10

- [x] Beehiiv newsletter 接入（注册 + 创建 Subscribe Form + 嵌入网站）
- [x] 表单直接 POST 到 Beehiiv（隐藏 iframe，用户无需跳转）
- [x] 自定义英文验证提示（替代浏览器中文默认提示）
- [x] 提交状态反馈（loading → success "You're in!"）
- [x] Favicon（哑铃图标，绿色 + 深色底）
- [x] sitemap.xml 自动生成（16 个页面）
- [x] robots.txt
- [x] Google Search Console 验证 + 提交 sitemap
- [x] GA4 接入（G-WYD72QPSFN）

**Day 3 改动文件：**
```
新增：
  public/favicon.svg                        — 哑铃图标
  public/google9b410392de760fe0.html        — Google 验证文件
  src/app/sitemap.ts                        — 站点地图（16 页）
  src/app/robots.ts                         — 爬虫指引

修改：
  src/app/layout.tsx                        — favicon + GA4 脚本
  src/components/newsletter-form.tsx        — Beehiiv 接入 + 验证 + 状态反馈
  progress.md
```

---

## 下一步

- [ ] HARO 关键词提醒 + Reddit 参与
- [ ] 更多食谱（目标：月底 30+）
- [ ] 程序化 SEO 页面（蛋白质 × 烹饪方法 × 配菜组合）
- [ ] OG 图片（社交媒体分享预览）
- [ ] Cloudflare Analytics（备用流量统计）

## 关键文件

- 计划：`plan.md`
- 关键词库：`keyword-analysis.md`
