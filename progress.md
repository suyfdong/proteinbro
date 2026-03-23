# Boy Kibble 项目进度

## 当前状态：184 页（30 食谱 + 120 Combo + 9 分类 + 4 Meal Prep + 4 Nutrition + 4 Gear + 3 Boy Kibble + 4 工具 + 6 静态页）

- 线上：https://proteinbro.net
- GitHub：https://github.com/suyfdong/proteinbro
- 部署：Cloudflare Pages，push main 自动部署
- 总页面：184 个
- 工具：4 个全部 Live（Beef Macro / Protein Per Dollar / Meal Prep Cost / Weekly Generator）

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

## Day 5 — 2026-03-23

- [x] Nutrition Hub（4 个新页面）
  - /nutrition/ — Hub 主页（蛋白质速查排行 + 3 个指南入口）
  - /nutrition/proteinmaxxing-guide/ — 完整指南（5 条规则、样本日 174g/$9.20、购物清单、Do/Don't）
  - /nutrition/how-much-protein-per-day/ — 蛋白质需求（按目标分层表、体重速查表、分餐建议、myth debunk）
  - /nutrition/cheapest-protein-sources/ — 20 种蛋白质源 g/$ 排行（价值分层、分类最佳、每日成本场景）
- [x] Gear Hub（4 个新页面，Amazon affiliate 预留）
  - /gear/ — Hub 主页（完整装备清单 ~$142）
  - /gear/best-air-fryers/ — 4 款空气炸锅评测 + 烹饪时间表
  - /gear/best-rice-cookers/ — 3 款电饭煲评测 + 米饭比例速查
  - /gear/meal-prep-containers/ — 4 款容器评测 + 玻璃 vs 塑料对比
- [x] Boy Kibble 子页面（2 个新页面）
  - /boy-kibble/original-recipe/ — 完整食谱（步骤、比例表、meal prep 5 天指南、成本明细、Recipe Schema）
  - /boy-kibble/variations/ — 10 种变体（Korean/Taco/Teriyaki 等，宏量对比表、5 天轮换方案）
- [x] Weekly Kibble Generator 工具（/tools/weekly-meal-generator/）
  - 蛋白质目标滑块（80-250g）+ 周预算滑块（$15-$100）
  - 6 种蛋白质排除筛选
  - 5 天轮换一键生成 + Lock/Re-roll 单日
  - 蛋白质达标进度条 + 购物清单
- [x] Combo 矩阵扩展（46 → 120 个程序化页面）
  - 新增 74 个 combo（更多配菜组合：quinoa, brown rice, broccoli, pasta, mixed veggies）
- [x] 首页 Hero 右侧 Protein Ticker 动态卡片
  - 自动轮播 6 种蛋白质源（环形图 + 宏量条 + protein/$ 效率）
  - 微浮动动画 + 鼠标悬停暂停 + 圆点导航
- [x] 首页更新
  - Nutrition "Coming Soon" → "Live"
  - Weekly Generator "Soon" → "Live"（4 工具全部 Live）
  - 导航栏新增 Nutrition + Gear
  - Footer 新增 Nutrition + Gear + Weekly Generator 链接
- [x] Sitemap 更新（184 个 URL）

**Day 5 改动文件：**
```
新增：
  src/app/nutrition/page.tsx                      — Nutrition Hub
  src/app/nutrition/proteinmaxxing-guide/page.tsx  — Proteinmaxxing 指南
  src/app/nutrition/how-much-protein-per-day/page.tsx — 每日蛋白质需求
  src/app/nutrition/cheapest-protein-sources/page.tsx — 最便宜蛋白质源排行
  src/app/gear/page.tsx                           — Gear Hub
  src/app/gear/best-air-fryers/page.tsx           — 空气炸锅评测
  src/app/gear/best-rice-cookers/page.tsx         — 电饭煲评测
  src/app/gear/meal-prep-containers/page.tsx      — 容器评测
  src/app/boy-kibble/original-recipe/page.tsx     — Boy Kibble 原版食谱
  src/app/boy-kibble/variations/page.tsx          — Boy Kibble 10 种变体
  src/app/tools/weekly-meal-generator/page.tsx    — 工具页壳
  src/app/tools/weekly-meal-generator/generator.tsx — 生成器交互组件
  src/components/hero-protein-ticker.tsx          — Hero 蛋白质轮播卡片

修改：
  src/app/page.tsx         — Hero 双列布局 + Ticker + Nutrition/Gear Live + 导航 + Footer
  src/app/sitemap.ts       — 新增所有新页面 URL（184 总 URL）
  src/app/boy-kibble/page.tsx — 新增子页面导航链接
  src/app/globals.css      — 新增 gentle-float 动画
  src/data/combos.ts       — Combo 矩阵从 46 扩展到 120
```

---

## 下一步

- [ ] Supplements 页（/supplements/：best creatine、best protein powder、best pre-workout — 高佣 affiliate 15-40%）
- [ ] 继续扩展 Combo 矩阵（120 → 200+，添加 slow-cooker 和更多组合）
- [ ] 页面视觉优化（减少长段文字，增加动效、图表、交互组件）
- [ ] Reddit 参与（r/MealPrepSunday、r/EatCheapAndHealthy、r/gainit）
- [ ] 数字产品（"$5/Day Bulk" Meal Plan PDF）
- [ ] Weekly Generator 付费功能（保存计划、导出购物清单）

## 关键文件

- 计划：`plan.md`
- 关键词库：`keyword-analysis.md`
