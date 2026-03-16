# Boy Kibble 项目进度

## 当前状态：99 页（30 食谱 + 46 Combo + 9 分类 + 4 Meal Prep + 10 静态页）

- 线上：https://proteinbro.net
- GitHub：https://github.com/suyfdong/proteinbro
- 部署：Cloudflare Pages，push main 自动部署
- 总页面：99 个（30 食谱 + 46 Combo 程序化页 + 9 分类页 + 4 Meal Prep + 10 静态页）

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
- [x] 新增 10 个食谱（总计 20 个，覆盖 turkey/eggs/shrimp/salmon/pork/yogurt/cottage cheese）
- [x] AI 生成 20 张写实食物图片（Replicate FLUX 1.1 Pro，WebP 格式）
- [x] 食谱详情页 + 列表页 + 相关推荐全部加图
- [x] OG 图片（每个食谱社交分享有预览图）

**Day 3 改动文件：**
```
新增：
  public/favicon.svg                        — 哑铃图标
  public/google9b410392de760fe0.html        — Google 验证文件
  public/recipes/*.webp                     — 20 张 AI 食物图片
  src/app/sitemap.ts                        — 站点地图（28 页）
  src/app/robots.ts                         — 爬虫指引

修改：
  src/app/layout.tsx                        — favicon + GA4 脚本
  src/app/recipes/page.tsx                  — 列表页加缩略图
  src/app/recipes/[slug]/page.tsx           — 详情页加大图 + 相关推荐加图
  src/data/recipes.ts                       — 新增 10 个食谱（共 20）
  src/components/newsletter-form.tsx        — Beehiiv 接入 + 验证 + 状态反馈
  next.config.ts                            — 静态图片配置
  progress.md
```

## Day 4 — 2026-03-16

- [x] 46 个 Combo 程序化 SEO 页（蛋白质 × 烹饪方法 × 配菜，HowTo + FAQPage Schema）
- [x] 9 个蛋白质分类页（Hub & Spoke，CollectionPage Schema）
- [x] 新增 10 个食谱（#21-30，总计 30 个）+ AI 图片
- [x] 内部链接优化（食谱列表加分类入口、详情页按标签推荐、工具页加食谱推荐）
- [x] Meal Prep Hub（4 个新页面：主页 + 周计划 + 快速备餐 + 预算排行）
- [x] 首页 Meal Prep 从 "Coming Soon" → "Live"
- [x] Sitemap 更新（99 个 URL）

**Day 4 改动文件：**
```
新增：
  src/data/combos.ts                          — 46 个 Combo 数据 + 生成逻辑
  src/data/categories.ts                      — 9 个分类定义 + 匹配函数
  src/components/combo-card.tsx               — Combo 交互组件（评分条、宏量环、换搭配）
  src/app/meal-prep/page.tsx                  — Meal Prep Hub
  src/app/meal-prep/weekly-plan/page.tsx      — 7 天周计划 + 购物清单
  src/app/meal-prep/under-30-minutes/page.tsx — 快速备餐（按时间分桶）
  src/app/meal-prep/budget/page.tsx           — 预算排行（蛋白质/美元条形图）
  public/recipes/*.webp                       — 56 张新 AI 食物图片（46 combo + 10 食谱）
  scripts/generate-combo-images.py            — Combo 图片生成脚本
  scripts/generate-3-missing.py               — 补充图片生成脚本

修改：
  src/app/recipes/[slug]/page.tsx  — 支持 combo/分类路由 + 标签匹配推荐 + 分类链接
  src/app/recipes/page.tsx         — 分类快捷入口 + combo 列表
  src/app/sitemap.ts               — 新增 combo/分类/meal-prep URL
  src/app/page.tsx                 — Meal Prep Live + footer 链接
  src/data/recipes.ts              — 新增 10 个食谱（共 30）
  src/app/tools/ground-beef-macro-calculator/page.tsx   — 加牛肉食谱推荐
  src/app/tools/protein-per-dollar-calculator/page.tsx  — 加分类入口
  src/app/tools/meal-prep-cost-calculator/page.tsx      — 加备餐食谱推荐
```

---

## 下一步

- [ ] Boy Kibble 子页面（original recipe、variations）
- [ ] Nutrition Hub（/nutrition/：proteinmaxxing guide、cheapest sources、how much protein）
- [ ] Gear 页（/gear/：air fryer、rice cooker、meal prep containers — Amazon affiliate）
- [ ] Weekly Meal Generator 工具（SaaS 潜力）
- [ ] Reddit 参与（r/MealPrepSunday、r/EatCheapAndHealthy）

## 关键文件

- 计划：`plan.md`
- 关键词库：`keyword-analysis.md`
