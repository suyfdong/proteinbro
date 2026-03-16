import requests
import time
import os

TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
if not TOKEN:
    print("Error: Set REPLICATE_API_TOKEN environment variable")
    exit(1)
OUT_DIR = "/Users/susu/idea/boykibble/public/recipes"
BASE_STYLE = "Professional food photography, dramatic overhead shot, dark moody background, restaurant quality plating, shallow depth of field, warm cinematic lighting, 4k, hyper realistic, appetizing"

RECIPES = {
    "ground-beef-and-rice": "ground beef crumbles and fluffy white rice in a dark ceramic bowl, garnished with sliced green onions and soy sauce drizzle",
    "ground-beef-and-broccoli": "ground beef stir fry with bright green broccoli florets over white rice in a dark bowl, sesame seeds on top",
    "chicken-and-rice-meal-prep": "five meal prep containers with sliced grilled chicken breast, white rice, and steamed broccoli, lined up neatly",
    "stuffed-peppers-ground-beef-rice": "four colorful stuffed bell peppers filled with ground beef and rice, topped with melted golden cheese, in a baking dish",
    "korean-beef-rice-bowl": "korean ground beef bowl with white rice, sliced green onions, sesame seeds, and a fried egg on top, dark bowl",
    "ground-beef-taco-bowl": "taco bowl with seasoned ground beef, rice, black beans, shredded cheese, salsa, and fresh cilantro in a dark bowl",
    "cheesy-ground-beef-rice-casserole": "cheesy ground beef and rice casserole in a cast iron skillet, melted golden cheese on top, bubbly and hot",
    "chicken-thigh-meal-prep": "crispy roasted chicken thighs with roasted sweet potato cubes and broccoli on a sheet pan, golden brown skin",
    "canned-tuna-rice-bowl": "tuna rice bowl with flaked tuna over white rice, drizzled with soy sauce and sriracha, sesame seeds, dark bowl",
    "ground-beef-rice-beans": "ground beef with black beans and white rice in a dark bowl, topped with hot sauce and fresh cilantro",
    "turkey-meatballs-meal-prep": "golden brown turkey meatballs arranged on white rice in meal prep containers, fresh parsley garnish",
    "egg-fried-rice-high-protein": "egg fried rice in a dark wok, visible scrambled egg pieces, peas and carrots, green onions, steam rising",
    "cottage-cheese-protein-bowl": "cottage cheese bowl topped with sliced banana, golden granola, blueberries, and a drizzle of honey, white bowl on dark surface",
    "garlic-butter-shrimp-rice": "garlic butter shrimp over white rice, golden pink shrimp glistening with butter sauce, fresh parsley and lemon wedge",
    "protein-overnight-oats": "overnight oats in a mason jar with layers of oats, berries, and peanut butter, topped with banana slices",
    "ground-turkey-sweet-potato-bowl": "ground turkey bowl with roasted sweet potato cubes, black beans, baby spinach, and lime wedge, dark bowl",
    "salmon-rice-bowl": "glazed salmon fillet over white rice with sliced cucumber and sesame seeds, honey soy glaze glistening",
    "sausage-peppers-onions-meal-prep": "roasted Italian sausage links with colorful bell peppers and caramelized onions on a sheet pan, golden brown",
    "greek-yogurt-protein-parfait": "layered greek yogurt parfait in a glass with granola, mixed berries, and honey drizzle, vibrant colors",
    "pork-chop-rice-meal-prep": "seared pork chop with caramelized crust, white rice, and steamed green beans on a dark plate",
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

os.makedirs(OUT_DIR, exist_ok=True)

# Skip already downloaded
existing = {f.replace(".webp", "") for f in os.listdir(OUT_DIR) if f.endswith(".webp")}
to_generate = {k: v for k, v in RECIPES.items() if k not in existing}

if not to_generate:
    print("All images already exist!")
    exit(0)

print(f"Generating {len(to_generate)} images ({len(existing)} already exist)...")

# Submit all predictions
predictions = {}
for slug, desc in to_generate.items():
    prompt = f"{desc}. {BASE_STYLE}"
    resp = requests.post("https://api.replicate.com/v1/predictions", headers=headers, json={
        "version": "black-forest-labs/flux-1.1-pro",
        "input": {
            "prompt": prompt,
            "aspect_ratio": "4:3",
            "output_format": "webp",
            "output_quality": 85,
        }
    })
    data = resp.json()
    pred_id = data.get("id")
    if pred_id:
        predictions[slug] = pred_id
        print(f"  Submitted: {slug} -> {pred_id}")
    else:
        print(f"  FAILED: {slug} -> {data}")

print(f"\nAll submitted. Waiting for generation...")
time.sleep(20)

# Download results
success = 0
fail = 0
for slug, pred_id in predictions.items():
    for attempt in range(10):
        resp = requests.get(f"https://api.replicate.com/v1/predictions/{pred_id}", headers=headers)
        data = resp.json()
        status = data.get("status")

        if status == "succeeded":
            output_url = data["output"]
            img_data = requests.get(output_url).content
            filepath = os.path.join(OUT_DIR, f"{slug}.webp")
            with open(filepath, "wb") as f:
                f.write(img_data)
            size_kb = len(img_data) // 1024
            print(f"  OK: {slug}.webp ({size_kb}KB)")
            success += 1
            break
        elif status == "failed":
            print(f"  FAILED: {slug} -> {data.get('error')}")
            fail += 1
            break
        else:
            if attempt < 9:
                time.sleep(8)

print(f"\nDone! Success: {success}, Failed: {fail}")
print(f"Total images: {len(os.listdir(OUT_DIR))}")
