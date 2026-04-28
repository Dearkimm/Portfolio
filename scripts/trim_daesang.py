"""Auto-trim grey carousel padding from daesang-welllife dashboard images."""
import os
import sys
from PIL import Image, ImageChops

sys.stdout.reconfigure(encoding="utf-8")

FOLDER = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..",
    "public",
    "projects",
    "daesang-welllife",
)
BG = (166, 166, 166)
TOLERANCE = 25


def is_bg(px):
    return all(abs(px[i] - BG[i]) <= TOLERANCE for i in range(3))


def find_bounds(img):
    px = img.load()
    w, h = img.size
    step = max(1, w // 200)

    top = 0
    while top < h and all(is_bg(px[x, top]) for x in range(0, w, step)):
        top += 1

    bottom = h - 1
    while bottom > top and all(is_bg(px[x, bottom]) for x in range(0, w, step)):
        bottom -= 1

    left = 0
    while left < w and all(is_bg(px[left, y]) for y in range(0, h, step)):
        left += 1

    right = w - 1
    while right > left and all(is_bg(px[right, y]) for y in range(0, h, step)):
        right -= 1

    return left, top, right + 1, bottom + 1


def main():
    files = sorted(f for f in os.listdir(FOLDER) if f.lower().endswith((".jpg", ".jpeg", ".png")))
    for f in files:
        p = os.path.join(FOLDER, f)
        img = Image.open(p).convert("RGB")
        bbox = find_bounds(img)
        if bbox == (0, 0, img.width, img.height):
            print(f"{f}: already trimmed")
            continue
        cropped = img.crop(bbox)
        ext = os.path.splitext(p)[1].lower()
        if ext in (".jpg", ".jpeg"):
            cropped.save(p, "JPEG", quality=92, optimize=True)
        else:
            cropped.save(p, optimize=True)
        print(f"{f}: {img.size} -> {cropped.size}")


if __name__ == "__main__":
    main()
