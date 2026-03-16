import requests
import time
import os

TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
if not TOKEN:
    print("Error: Set REPLICATE_API_TOKEN environment variable")
    exit(1)
OUT_DIR = "/Users/susu/idea/boykibble/public/recipes"
BASE_STYLE = "Professional food photography, dramatic overhead flat lay shot, dark wood table background, masculine rustic plating, natural side lighting, shallow depth of field, 4k, hyper realistic, appetizing, no text, no watermark"

# Combo image prompts: slug -> food description
COMBOS = {
    # Chicken breast combos
    "air-fryer-chicken-breast-with-rice": "golden crispy air fried chicken breast sliced on a dark plate with fluffy white rice, light char marks visible",
    "air-fryer-chicken-breast-with-sweet-potato": "crispy air fried chicken breast with roasted sweet potato cubes on a dark ceramic plate, herbs on top",
    "air-fryer-chicken-breast-with-broccoli": "air fried golden chicken breast with bright green broccoli florets on a dark plate, lemon wedge",
    "baked-chicken-breast-with-rice": "oven baked chicken breast with golden seasoning crust, white rice on the side, dark plate",
    "baked-chicken-breast-with-sweet-potato": "baked seasoned chicken breast with roasted sweet potato wedges on a dark sheet pan, rosemary garnish",
    "grilled-chicken-breast-with-rice": "grilled chicken breast with beautiful char lines, white rice, dark plate on wooden table",
    "cast-iron-chicken-breast-with-rice": "pan seared chicken breast with golden crust in a cast iron skillet, white rice on the side",
    "skillet-chicken-breast-with-rice": "seared chicken breast in a skillet with white rice, golden brown crust, herbs",
    "instant-pot-chicken-breast-with-rice": "shredded chicken breast over white rice in a dark bowl, juicy and tender, green onion garnish",
    "sheet-pan-chicken-breast-with-mixed-veggies": "sheet pan with sliced chicken breast and colorful roasted vegetables, golden brown, parchment paper",

    # Chicken thighs
    "air-fryer-chicken-thighs-with-rice": "crispy skin air fried chicken thighs with white rice on a dark plate, golden brown skin",
    "sheet-pan-chicken-thighs-with-sweet-potato": "crispy roasted chicken thighs with sweet potato cubes on a sheet pan, golden skin, herbs",
    "sheet-pan-chicken-thighs-with-potatoes": "sheet pan crispy chicken thighs with roasted potato wedges, golden brown, rosemary",
    "baked-chicken-thighs-with-rice": "oven roasted chicken thighs with crispy golden skin, white rice on dark plate",
    "cast-iron-chicken-thighs-with-rice": "crispy chicken thighs in a cast iron skillet, golden brown skin, white rice on side",

    # Ground beef
    "skillet-ground-beef-with-rice": "seasoned ground beef crumbles over white rice in a dark bowl, green onion garnish",
    "cast-iron-ground-beef-with-potatoes": "browned ground beef crumbles with crispy potato cubes in a cast iron skillet, rustic",
    "cast-iron-ground-beef-with-rice": "ground beef with brown crust in a cast iron skillet, white rice on the side, dark plate",
    "sheet-pan-ground-beef-with-potatoes": "sheet pan ground beef crumbles with roasted potato wedges, golden brown edges",
    "instant-pot-ground-beef-with-rice": "ground beef and rice one pot meal in a dark bowl, mixed together, cilantro garnish",

    # Ground turkey
    "skillet-ground-turkey-with-rice": "lean ground turkey crumbles with seasoning over white rice, dark bowl, lime wedge",
    "skillet-ground-turkey-with-sweet-potato": "seasoned ground turkey with roasted sweet potato cubes and spinach in a dark bowl",
    "sheet-pan-ground-turkey-with-sweet-potato": "sheet pan with turkey meatballs and roasted sweet potato cubes, golden brown",
    "cast-iron-ground-turkey-with-rice": "ground turkey with brown sear in cast iron skillet, white rice on side",

    # Salmon
    "air-fryer-salmon-with-rice": "air fried salmon fillet with crispy skin over white rice, lemon wedge, dark plate",
    "baked-salmon-with-rice": "baked salmon fillet with honey soy glaze glistening, white rice, cucumber slices, dark plate",
    "baked-salmon-with-broccoli": "baked salmon fillet with roasted broccoli on a dark plate, lemon and herbs",
    "cast-iron-salmon-with-rice": "pan seared salmon with crispy skin in cast iron skillet, white rice, sesame seeds",
    "sheet-pan-salmon-with-mixed-veggies": "sheet pan salmon fillet with colorful roasted vegetables, golden brown, parchment",

    # Shrimp
    "air-fryer-shrimp-with-rice": "crispy air fried shrimp over white rice in a dark bowl, lemon wedge, parsley",
    "skillet-shrimp-with-rice": "garlic butter shrimp seared golden in a skillet, white rice, fresh parsley",
    "skillet-shrimp-with-pasta": "sauteed shrimp with pasta in a garlic butter sauce, dark bowl, parsley garnish",
    "grilled-shrimp-with-rice": "grilled shrimp skewers over white rice on a dark plate, char marks, lemon",

    # Pork chops
    "air-fryer-pork-chops-with-rice": "air fried pork chop with golden crust, white rice, dark plate",
    "cast-iron-pork-chops-with-rice": "seared pork chop with caramelized brown sugar crust in cast iron, rice on side",
    "cast-iron-pork-chops-with-potatoes": "seared pork chops with crispy roasted potatoes in a cast iron skillet",
    "grilled-pork-chops-with-rice": "grilled pork chop with char lines, white rice, green beans, dark plate",
    "baked-pork-chops-with-sweet-potato": "baked pork chops with roasted sweet potato wedges on dark plate, herbs",

    # Tilapia
    "air-fryer-tilapia-with-rice": "air fried tilapia fillet with golden coating, white rice, lemon wedge, dark plate",
    "baked-tilapia-with-rice": "baked tilapia fillet with lemon pepper seasoning, white rice, dark plate",
    "skillet-tilapia-with-rice": "pan seared tilapia fillet golden brown, white rice on side, lemon, dark plate",

    # Eggs
    "skillet-eggs-with-rice": "four scrambled eggs over white rice in a dark bowl, green onion, sriracha drizzle",
    "baked-eggs-with-sweet-potato": "baked egg cups with sweet potato hash in a muffin tin, golden tops, herbs",

    # Tofu
    "air-fryer-tofu-with-rice": "crispy golden air fried tofu cubes over white rice, sesame seeds, soy sauce drizzle, dark bowl",
    "skillet-tofu-with-rice": "pan fried crispy tofu cubes with white rice in a dark bowl, green onions, sesame",
    "baked-tofu-with-quinoa": "crispy baked tofu cubes with fluffy quinoa in a dark bowl, edamame, sesame dressing",
}

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

os.makedirs(OUT_DIR, exist_ok=True)

# Skip already downloaded
existing = {f.replace(".webp", "") for f in os.listdir(OUT_DIR) if f.endswith(".webp")}
to_generate = {k: v for k, v in COMBOS.items() if k not in existing}

if not to_generate:
    print("All combo images already exist!")
    exit(0)

print(f"Generating {len(to_generate)} combo images ({len(existing)} already exist)...")

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
        print(f"  FAILED to submit: {slug} -> {data}")
    time.sleep(0.5)  # Rate limiting

print(f"\n{len(predictions)} submitted. Waiting for generation...")
time.sleep(30)

# Download results
success = 0
fail = 0
for slug, pred_id in predictions.items():
    for attempt in range(15):
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
            if attempt < 14:
                time.sleep(8)
    else:
        print(f"  TIMEOUT: {slug}")
        fail += 1

print(f"\nDone! Success: {success}, Failed: {fail}")
print(f"Total images in {OUT_DIR}: {len([f for f in os.listdir(OUT_DIR) if f.endswith('.webp')])}")
