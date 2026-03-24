from playwright.sync_api import sync_playwright
import time

URL = "https://8080-iwuwni9vxjt132r1f1w73-e3799c24.us2.manus.computer"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    page.goto(URL)
    
    # Wait for loading screen to disappear
    time.sleep(2.5)
    
    # Full page screenshot
    page.screenshot(path="/home/ubuntu/screenshots/baba_full_page.png", full_page=True)
    print("Full page screenshot taken")
    
    # Hero section
    page.screenshot(path="/home/ubuntu/screenshots/baba_01_hero.png")
    print("Hero screenshot taken")
    
    # Scroll to each section
    sections = [
        ("chi-siamo", "baba_02_chi_siamo.png"),
        ("servizi", "baba_03_servizi.png"),
        ("perche-noi", "baba_04_perche_noi.png"),
        ("zone", "baba_05_zone.png"),
        ("galleria", "baba_06_galleria.png"),
        ("recensioni", "baba_07_recensioni.png"),
        ("contatti", "baba_08_contatti.png"),
    ]
    
    for section_id, filename in sections:
        page.evaluate(f"document.getElementById('{section_id}').scrollIntoView()")
        time.sleep(0.8)
        page.screenshot(path=f"/home/ubuntu/screenshots/{filename}")
        print(f"Screenshot: {filename}")
    
    browser.close()
    print("All screenshots taken!")
