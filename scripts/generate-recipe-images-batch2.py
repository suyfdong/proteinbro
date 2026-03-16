import requests
import time
import os

TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
if not TOKEN:
    print("Error: Set REPLICATE_API_TOKEN environment variable")
    exit(1)
OUT_DIR = "/Users/susu/idea/boykibble/public/recipes"
BASE_STYLE = "Professional food photography, dramatic overhead flat lay shot, dark wood table background, masculine rustic plating, natural side lighting, shallow depth of field, 4k, hyper realistic, appetizing, no text, no watermark"

# New batch 2 recipe image prompts
RECIPES = {
    "air-fryer-chicken-breast-rice": "golden crispy air fried chicken breast sliced against the grain, fluffy white jasmine rice on a dark ceramic plate, subtle steam rising, sriracha drizzle",
    "crispy-tofu-stir-fry-rice": "golden crispy cubed tofu stir fry with bright green broccoli florets in a dark bowl over white rice, sesame seeds scattered, sriracha drizzle",
    "high-protein-tuna-pasta": "penne pasta tossed with flaked tuna, olive oil, red pepper flakes, fresh lemon wedge on the side, parmesan shavings, dark bowl on wood table",
    "baked-salmon-broccoli": "honey glazed baked salmon fillet with bright green roasted broccoli on a dark sheet pan, lemon slices, golden glaze visible",
    "air-fryer-pork-chops-sweet-potato": "crispy air fried bone-in pork chop with roasted sweet potato cubes on a dark plate, golden caramelized edges, smoky paprika crust",
    "chicken-burrito-bowl": "colorful chicken burrito bowl with sliced grilled chicken, black beans, white rice, salsa, lime wedge, in a dark bowl, cilantro garnish",
    "ground-beef-egg-scramble": "cast iron skillet with scrambled eggs mixed with ground beef crumbles, melted shredded cheese on top, hot sauce drizzle, shot from above",
    "tilapia-rice-bowl": "pan seared cajun tilapia fillet with crispy golden crust on white rice, lemon butter sauce, dark plate on rustic wood",
    "turkey-chili-meal-prep": "thick hearty turkey chili in a dark bowl, visible kidney beans and ground turkey, topped with shredded cheese and a dollop of greek yogurt",
    "protein-pancakes": "stack of golden protein pancakes on a dark plate, drizzled with peanut butter, sliced banana on top, maple syrup bottle blurred in background",
}

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

# Submit all predictions
predictions = {}
for slug, desc in RECIPES.items():
    prompt = f"{desc}, {BASE_STYLE}"
    resp = requests.post(
        "https://api.replicate.com/v1/predictions",
        headers=HEADERS,
        json={
            "version": "7a15fe64f1a62ad27b6cfd0a36d1cf5e62913e0c0cb60bda6e9a8771b8c9a0c5",
            "input": {
                "prompt": prompt,
                "aspect_ratio": "4:3",
                "output_format": "webp",
                "output_quality": 85,
            },
        },
    )
    data = resp.json()
    predictions[slug] = data["id"]
    print(f"Submitted: {slug} -> {data['id']}")

print(f"\n{len(predictions)} predictions submitted. Waiting 30s...")
time.sleep(30)

# Poll for results
for slug, pred_id in predictions.items():
    for attempt in range(20):
        resp = requests.get(
            f"https://api.replicate.com/v1/predictions/{pred_id}",
            headers=HEADERS,
        )
        data = resp.json()
        status = data["status"]
        if status == "succeeded":
            img_url = data["output"]
            if isinstance(img_url, list):
                img_url = img_url[0]
            img_data = requests.get(img_url).content
            path = f"{OUT_DIR}/{slug}.webp"
            with open(path, "wb") as f:
                f.write(img_data)
            print(f"OK: {slug} ({len(img_data)//1024}KB)")
            break
        elif status == "failed":
            print(f"FAILED: {slug} - {data.get('error')}")
            break
        else:
            time.sleep(5)
    else:
        print(f"TIMEOUT: {slug}")

print("Done!")
