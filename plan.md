# Boy Kibble / 高蛋白男性简餐 Niche 站 — 完整项目计划

## Context

Google Trends 2026年3月4日邮件中 "Boy Kibble" 趋势引发关注。经过深度研究确认：
- "Boy kibble"（牛肉碎+白米饭，TikTok 2026年1月爆发）是入口，底层关键词宇宙达 5-15M 月搜索量(US)
- **核心机会：没有任何 niche 站专门面向"男性/健身/简单/便宜/高蛋白简餐"这个交叉定位**
- Fit Men Cook 走高端路线，大食品站全是女性/中性编码，这个位置是空的
- 无 YMYL 风险（食谱+生活方式，非医疗建议）
- 域名待定（需查可用性）
- 技术栈：Next.js 16 + Tailwind v4 + Cloudflare Pages

---

## 一、定位与差异化

**站名定位**：Simple High Protein Meals for Men（桥接型，不绑死 boy kibble meme）

**域名候选**：mealprepbro.com / gymbrorecipes.com / proteinbro.com（桥接型，需查可用性）

**核心差异化（vs 所有现有食品站）：**
1. **说话像 gym bro**：不写"温暖人心的料理"，写"40g protein, 20分钟, $2.50"
2. **Macros-first 设计**：每个食谱卡首先展示蛋白质/碳水/脂肪/卡路里/每餐成本
3. **丑就对了**：Boy kibble 审美就是反精致，手机拍即可
4. **工具驱动**：计算器/生成器是核心壁垒，不只是食谱博客
5. **Meme 响应速度**：下一个 food meme 出来时第一个写解释文章

**目标受众**：16-34岁男性（Gen Z + 年轻千禧），健身/举铁为核心身份，TikTok原生，预算敏感
- 71%美国人在刻意增加蛋白质（2024）
- 39%的16-24岁男性比去年吃更多肉
- 男性健康&健身市场：$1.42万亿→$2.88万亿（2030）

**竞品分析**：
- Fit Men Cook (fitmencook.com) — 走高端精致路线，我们走反精致
- mealpreponfleek.com — 通用/女性定位
- theproteinchef.co — 最接近的蛋白质专注站，但不是男性编码
- 大食品站(Allrecipes, Delish) — 不面向特定受众

---

## 二、站点架构

### URL 结构

```
/                           → 首页：Simple High Protein Meals for Men
├── /boy-kibble/            → Boy Kibble 趋势专区（Hub）
│   ├── /boy-kibble/what-is-boy-kibble/
│   ├── /boy-kibble/original-recipe/
│   └── /boy-kibble/variations/
├── /recipes/               → 食谱总目录
│   ├── /recipes/ground-beef/        → 按蛋白质源分类
│   ├── /recipes/chicken/
│   ├── /recipes/eggs/
│   ├── /recipes/tuna/
│   └── /recipes/[method]-[protein]-with-[side]/  → 程序化组合页
├── /meal-prep/             → Meal Prep 指南（Hub）
│   ├── /meal-prep/weekly-plan/
│   ├── /meal-prep/under-30-minutes/
│   └── /meal-prep/budget/
├── /nutrition/             → 营养/生活方式内容
│   ├── /nutrition/proteinmaxxing-guide/
│   ├── /nutrition/cheapest-protein-sources/
│   └── /nutrition/how-much-protein-per-day/
├── /tools/                 → 工具页（核心壁垒）
│   ├── /tools/protein-per-dollar-calculator/
│   ├── /tools/macro-calculator/
│   ├── /tools/meal-prep-cost-calculator/
│   └── /tools/weekly-meal-generator/
├── /gear/                  → 厨具评测（Amazon affiliate）
│   ├── /gear/best-rice-cookers/
│   ├── /gear/best-air-fryers/
│   └── /gear/meal-prep-containers/
└── /supplements/           → 补剂评测（利润中心）
    ├── /supplements/best-creatine/
    ├── /supplements/best-protein-powder/
    └── /supplements/best-pre-workout/
```

### 程序化 SEO 矩阵

**蛋白质源(15) × 烹饪方法(10) × 配菜(10) = 1,500个潜在组合页**

优先生成高搜索量组合：air fryer chicken breast with rice, cast iron ground beef with potatoes, instant pot ground beef and rice, microwave chicken breast meal prep

数据库字段：protein_source, method, side, calories, protein_g, cost_per_serving, cook_minutes
发布节奏：先50-100个高优先级，然后每周20-50个

---

## 三、变现策略（纯线上，无实物配送）

### 3.1 工具/SaaS（核心壁垒 + 最大上升空间）

**Phase 1 — 免费工具（SEO 引流 + 邮件收集）：**

| 工具 | 竞争 | 说明 |
|------|------|------|
| **Protein Per Dollar Calculator** | 无人专做 | 输入食材+价格+重量，算出每克蛋白质成本排名 |
| **Ground Beef Macro Calculator** | 无专属版 | 不同瘦/肥比例(80/20, 85/15, 93/7)的营养计算 |
| **Meal Prep Cost Calculator** | 几乎无人做 | 输入食材清单，算出每周/每餐总成本 |

实现：纯前端React组件，无需后端。2-3天上线。
数据源：USDA FoodData Central API（免费/公共域）

**Phase 2 — Freemium SaaS（$5-8/月）：**

**Weekly Kibble Generator**：基于蛋白质目标+周预算，生成5餐轮换+购物清单
- 免费：基础生成
- 付费：保存/替换/导出购物清单
- 定位差异：不是"meal variety planner"，而是"meal rotation optimizer"
- 现有工具（Eat This Much $9/月, Strongr Fastr $5/月）全不面向此受众

市场数据：Meal planning app 市场 $2.45B（2025），CAGR 10-13%

### 3.2 数字产品

| 产品 | 定价 | 说明 |
|------|------|------|
| "The $5/Day Bulk" Meal Plan PDF | $9-19 | 30天，150g+蛋白质，<$35/周 |
| "Kibble Spreadsheet Pro" | $19-29 | Google Sheets 模板：蛋白质/成本排名 + 自动算周购物费 |
| "Batch Sunday" 视频课程 | $47-97 | 90分钟周末 meal prep，面向零基础 |
| "Protein Bible" 年度数据库 | $9/年 | 100+食物蛋白质/成本数据，每季更新 |

### 3.3 在线 Affiliate（纯线上）

**补剂（利润中心）：**

| 品牌 | 佣金 | 适配度 |
|------|------|--------|
| Crazy Nutrition | 40%新客 / 30%复购 | 高 |
| MyProtein | 最高20% | 高 — 健身社区知名度 |
| BulkSupplements | 15% | 极高 — 预算定位完美匹配 |
| Onnit | 15% (45天cookie) | 高 |
| Bodybuilding.com | 8%新 / 3%复 | 中 |

**Fitness App**：Cronometer (35%付费 + $0.10/注册), MyFitnessPal (~7%订阅)
**高端课程**：Precision Nutrition PN1 (30%, 每单$300-480)
**Amazon 厨具**：Home & Kitchen 4-4.5% (rice cooker, air fryer, meal prep containers)

### 3.4 展示广告

| 平台 | 门槛 | RPM | 备注 |
|------|------|-----|------|
| Mediavine | 50K sessions | $20-35 | 食品niche, 男性受众略低于女性 |
| Raptive | 100K PV | $25-45 | |

### 3.5 Newsletter（Beehiiv）

"Weekly Kibble" 周报：meal rotation + 购物清单 + 蛋白质源spotlight + 产品推荐
5K订阅者预估：~$20K-22K/年

---

## 四、SEO 策略

### 4.1 内容架构（Hub & Spoke × 5集群）

| 集群 | Pillar 页面 | Spoke 举例 |
|------|-----------|-----------|
| Boy Kibble Core | What is Boy Kibble? Complete Guide | recipe, variations, nutrition |
| Ground Beef Recipes | Ground Beef Meal Prep: 30 Recipes Under $10 | 每个组合 |
| Budget High Protein | High Protein Meals Under $2/Serving | tuna, eggs, chicken thigh |
| Meal Prep for Men | Weekly Meal Prep: 7-Day Plan | Sunday prep, batch cooking |
| Cooking Method Hubs | Air Fryer High Protein Recipes | cast iron, microwave, no-cook |

### 4.2 Recipe Schema（必须）

每页 JSON-LD：Recipe + NutritionInformation + aggregateRating + FAQPage
- `image` 字段必填（无图=无Rich Result）
- Rich Result：58% CTR vs 41% non-rich
- Server-side 注入，不用 client-side

### 4.3 对抗 AI Overview

| 策略 | 说明 |
|------|------|
| 工具页优先 | Calculator 页面 AI 无法替代 |
| 极具体长尾 | "air fryer ground beef bowl under $3" |
| GEO优化 | FCP < 0.4秒 → 3x AI引用率 |
| 真人UGC | 社区提交 boy kibble 照片 |
| 成本数据 | 动态价格数据 AI 难以准确回答 |
| 邮件列表 | 零平台风险 |
| 视频多渠道 | TikTok/YouTube 不依赖搜索 |

2026年3月4日 Google 更新了 AI Mode，增加了食谱创作者展示位。

### 4.4 技术 SEO

- Next.js 16 App Router, SSG (generateStaticParams)
- Tailwind v4, 移动优先, tap target ≥ 48px
- WebP图片, 1200px宽, hero图 priority={true}
- Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1
- 不用AMP（2026已死）
- app/sitemap.ts 自动生成 + canonical URL

### 4.5 Link Building

**Tier 1（月1-3）**：Yummly/FoodGawker + Pinterest + Reddit (r/MealPrepSunday 570万, r/EatCheapAndHealthy 450万)
**Tier 2（月3-9）**：HARO/Connectively + 男性健身博客 guest post + 专家 roundup
**Tier 3（现在！）**：Boy kibble 趋势 newsjacking — Fortune/CNN/Newsweek 正在报道

### 4.6 发布节奏

| 阶段 | 时间 | 内容 |
|------|------|------|
| Foundation | 月1-3 | 5个Pillar + 24核心食谱(2/周) + 3工具页 |
| Scale | 月4-6 | 36编辑食谱(3/周) + 120程序化页(10/周) |
| Authority | 月7-12 | 程序化(20-30/周) + 更新早期内容 + TikTok |

到 Mediavine 时间线：最快6-9月（借趋势），中位12-18月

---

## 五、技术栈

```
Framework:  Next.js 16 + React 19 + TypeScript 5
Styling:    Tailwind CSS v4 (PostCSS plugin mode)
Icons:      lucide-react
Charts:     Recharts (calculator/tool pages)
Deploy:     Cloudflare Pages (output: "export")
Data:       USDA FoodData Central API (免费) + 本地JSON
Newsletter: Beehiiv
Analytics:  Cloudflare Analytics / GA4
```

---

## 六、收入预估

| 阶段 | 时间 | 月流量 | 广告 | Affiliate | 工具/产品 | Newsletter | 月总计 |
|------|------|--------|------|-----------|----------|-----------|--------|
| Launch | 月1-3 | 5-10K | $0 | $50-200 | $0-100 | $0 | $50-300 |
| Growth | 月4-9 | 30-50K | $0-750 | $300-800 | $200-500 | $50 | $550-2,100 |
| Mediavine | 月10-18 | 80-150K | $1.6-4.5K | $0.8-2K | $0.5-1.5K | $200-500 | $3.1-8.5K |
| Scale | 月18-36 | 250-500K | $5-15K | $2-5K | $1-3K | $0.5-1.5K | $8.5-24.5K |

---

## 七、风险与应对

| 风险 | 级别 | 应对 |
|------|------|------|
| AI Overview 吃流量 | 🔴 高 | 工具页壁垒 + 邮件 + 视频 + GEO |
| Meme 消退 | 🟡 中 | 域名不绑meme，核心靠常青词 |
| 竞争者进入 | 🟡 中 | 速度+工具化+社区 |
| 食品摄影 | 🟢 低 | 反精致审美 |

---

## 八、执行清单

### Week 1
- [ ] 查域名可用性 + 注册 + Cloudflare
- [ ] 创建项目 + Next.js 16 + Tailwind v4
- [ ] 写 "What is Boy Kibble?" 权威长文

### Week 2-4
- [ ] Protein Per Dollar Calculator 工具页
- [ ] 10篇核心食谱 + Recipe Schema
- [ ] HARO 关键词提醒 + Reddit 参与

### Month 2-3
- [ ] 30+食谱 + Macro Calculator + Meal Prep Cost Calculator
- [ ] Beehiiv newsletter + 程序化页面(前50个)
- [ ] BulkSupplements / MyProtein affiliate 申请

### Month 4-6
- [ ] 50K sessions → Mediavine
- [ ] Weekly Kibble Generator (freemium)
- [ ] TikTok + 第一个数字产品($9 PDF)
