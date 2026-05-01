css = """
/* ---- CRAZY ANIMATIONS & REFINEMENTS ---- */

/* Smooth global transitions for theme toggling */
* {
    transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced Fade In with Slide Up & Blur */
@keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(30px); filter: blur(8px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.fade-in {
    opacity: 0;
    animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* Staggered delays for children */
.page-wrap > *:nth-child(1) { animation-delay: 0.1s !important; }
.page-wrap > *:nth-child(2) { animation-delay: 0.2s !important; }
.page-wrap > *:nth-child(3) { animation-delay: 0.3s !important; }
.page-wrap > *:nth-child(4) { animation-delay: 0.4s !important; }
.bottom-grid > *:nth-child(1) { animation-delay: 0.5s !important; }
.bottom-grid > *:nth-child(2) { animation-delay: 0.6s !important; }

/* Interactive Metric Cards */
.metric-card {
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease !important;
}
.metric-card:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.15) !important;
    border-color: rgba(59, 130, 246, 0.5) !important;
    z-index: 10;
}

/* Button micro-interactions */
button {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s, box-shadow 0.3s !important;
}
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
button:active {
    transform: scale(0.92) translateY(0);
}

/* Glowing Live Dot */
@keyframes intensePulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
    70% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}
.live-dot::before {
    animation: intensePulse 2s infinite !important;
}

/* Hover effects for tabs */
.tabs-container button {
    position: relative;
    overflow: visible;
}
.tabs-container button::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.tabs-container button:hover::after {
    width: 100%;
    left: 0;
}

/* Table Row Hover */
tr {
    transition: background-color 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
tbody tr:hover {
    background-color: var(--bg-card-alt);
    transform: scale(1.02) translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    z-index: 10;
    position: relative;
    border-radius: 8px;
}

/* Chart Canvas hover glow */
.chart-canvas-wrap {
    transition: filter 0.5s ease, transform 0.5s ease;
}
.chart-card:hover .chart-canvas-wrap {
    filter: drop-shadow(0 0 16px rgba(59, 130, 246, 0.15));
}
"""
with open(r'c:\Users\souvi\Downloads\OneDrive_1_4-26-2026\backend\static\styles.css', 'a', encoding='utf-8') as f:
    f.write(css)
