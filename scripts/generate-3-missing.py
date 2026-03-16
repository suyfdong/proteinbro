import requests
import time
import os

TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
if not TOKEN:
    print("Error: Set REPLICATE_API_TOKEN environment variable")
    exit(1)
OUT_DIR = "/Users/susu/idea/boykibble/public/recipes"
BASE_STYLE = "Professional food photography, dramatic overhead flat lay shot, dark wood table background, masculine rustic plating, natural side lighting, shallow depth of field, 4k, hyper realistic, appetizing, no text, no watermark"

RECIPES = {
    "high-protein-tuna-pasta": "penne pasta tossed with flaked tuna, olive oil, red pepper flakes, fresh lemon wedge on the side, parmesan shavings, dark bowl on wood table",
    "turkey-chili-meal-prep": "thick hearty turkey chili in a dark bowl, visible kidney beans and ground turkey, topped with shredded cheese and a dollop of greek yogurt",
    "protein-pancakes": "stack of golden protein pancakes on a dark plate, drizzled with peanut butter, sliced banana on top, maple syrup bottle blurred in background",
}

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}

predictions = {}
for slug, desc in RECIPES.items():
    prompt = f"{desc}, {BASE_STYLE}"
    resp = requests.post(
        "https://api.replicate.com/v1/predictions",
        headers=HEADERS,
        json={
            "version": "609793a667ed94b210242837d3c3c9fc9a64ae93685f15d75002ba0ed9a97f2b",
            "input": {
                "prompt": prompt,
                "aspect_ratio": "4:3",
                "output_format": "webp",
                "output_quality": 85,
            },
        },
    )
    data = resp.json()
    if "id" not in data:
        print(f"ERROR submitting {slug}: {data}")
        continue
    predictions[slug] = data["id"]
    print(f"Submitted: {slug} -> {data['id']}")

if not predictions:
    print("No predictions submitted. Token may be revoked.")
    exit(1)

print(f"\n{len(predictions)} predictions submitted. Waiting 30s...")
time.sleep(30)

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
