css = """
[data-theme="light"] {
  --bg-page:        #f8fafc;
  --bg-card:        #ffffff;
  --bg-card-alt:    #f1f5f9;
  --border:         #e2e8f0;
  --text-primary:   #0f172a;
  --text-secondary: #64748b;
  --text-mono:      #334155;
}

[data-theme="light"] .chart-canvas-wrap canvas {
  filter: invert(1) hue-rotate(180deg);
}
"""
with open(r'c:\Users\souvi\Downloads\OneDrive_1_4-26-2026\backend\static\styles.css', 'a', encoding='utf-8') as f:
    f.write(css)
