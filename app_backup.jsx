const { useState, useEffect, useRef } = React;

// Icon Components using Lucide
const Icon = ({ name, size = 24, className = "" }) => {
    return <i data-lucide={name} style={{ width: size, height: size }} className={className}></i>;
};

const OldDashboard = () => {
    const [activeTab, setActiveTab] = useState('predictor');
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [energyType, setEnergyType] = useState('electricity');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        setTimeout(() => window.lucide && window.lucide.createIcons(), 50);
    }, [darkMode]);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // API call to our Django Backend
                const response = await axios.get(`/api/predictions/?type=${energyType}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
                setTimeout(() => window.lucide && window.lucide.createIcons(), 50);
            }
        };
        fetchData();
    }, [energyType]);

    return (
        <div className="page-wrap">
            <header className="page-header fade-in">
                <div className="header-left">
                    <h1>Energy Demand Dashboard</h1>
                    <p>Forecast demand shifts · Global energy mix · Poverty analysis</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="live-dot">Model ready</span>
                    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle Theme" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        <Icon name={darkMode ? 'sun' : 'moon'} size={20} />
                    </button>
                    <button 
                        onClick={() => setIsCalculatorOpen(true)}
                        style={{
                            background: 'var(--bg-glass)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-primary)',
                            padding: '8px 16px',
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                            backdropFilter: 'blur(20px)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <Icon name="calculator" size={16} /> Calculator
                    </button>
                </div>
            </header>

            <div className="tabs-container fade-in" style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
                <button 
                    style={{ background: 'transparent', border: 'none', color: activeTab === 'predictor' ? '#3b82f6' : 'var(--text-secondary)', fontWeight: activeTab === 'predictor' ? 600 : 500, fontSize: '1rem', cursor: 'pointer', borderBottom: activeTab === 'predictor' ? '2px solid #3b82f6' : '2px solid transparent', padding: '0.5rem 0', marginBottom: '-1px' }}
                    onClick={() => { setActiveTab('predictor'); setIsCalculatorOpen(false); }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon name="trending-up" size={18} /> Price & Demand Predictor
                    </div>
                </button>
                <button 
                    style={{ background: 'transparent', border: 'none', color: activeTab === 'global' ? '#3b82f6' : 'var(--text-secondary)', fontWeight: activeTab === 'global' ? 600 : 500, fontSize: '1rem', cursor: 'pointer', borderBottom: activeTab === 'global' ? '2px solid #3b82f6' : '2px solid transparent', padding: '0.5rem 0', marginBottom: '-1px' }}
                    onClick={() => { setActiveTab('global'); setIsCalculatorOpen(false); }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon name="globe" size={18} /> Global Energy Database
                    </div>
                </button>
                <button 
                    style={{ background: 'transparent', border: 'none', color: activeTab === 'peak' ? '#3b82f6' : 'var(--text-secondary)', fontWeight: activeTab === 'peak' ? 600 : 500, fontSize: '1rem', cursor: 'pointer', borderBottom: activeTab === 'peak' ? '2px solid #3b82f6' : '2px solid transparent', padding: '0.5rem 0', marginBottom: '-1px' }}
                    onClick={() => { setActiveTab('peak'); setIsCalculatorOpen(false); }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon name="activity" size={18} /> Peak Demand Predictor
                    </div>
                </button>
            </div>

            {activeTab === 'predictor' && (
                <div className="controls-bar fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', paddingLeft: '0.5rem' }}>Energy Source:</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button 
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '8px', border: energyType === 'electricity' ? 'none' : '1px solid transparent', background: energyType === 'electricity' ? '#3b82f6' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                            onClick={() => setEnergyType('electricity')}
                        >
                            <Icon name="zap" size={16} /> Electricity
                        </button>
                        <button 
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '8px', border: energyType === 'fuel' ? 'none' : '1px solid transparent', background: energyType === 'fuel' ? '#3b82f6' : 'transparent', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                            onClick={() => setEnergyType('fuel')}
                        >
                            <Icon name="fuel" size={16} /> Fuel
                        </button>
                    </div>
                </div>

                <div className="horizon-group" style={{ marginLeft: 'auto' }}>
                    <button className="horizon-btn active">6 Years Forecast</button>
                </div>
            </div>
            )}

            {loading && activeTab === 'predictor' ? (
                <div className="skeleton" style={{ height: '200px', background: 'var(--bg-card)', borderRadius: 'var(--radius)' }}></div>
            ) : activeTab === 'predictor' ? (
                <>
                    <MetricsRow data={data?.data} insight={data?.insight} energyType={energyType} />
                    <ChartWidget data={data?.data} darkMode={darkMode} />
                    
                    <div className="bottom-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr)', gap: '2rem' }}>
                        <InsightBox insight={data?.insight} />
                    </div>
                </>
            ) : null}

            {activeTab === 'global' && (
                <div className="bottom-grid fade-in">
                    <EnergyMixChart darkMode={darkMode} />
                    <DistrictPovertyTable />
                </div>
            )}

            {activeTab === 'peak' && (
                <PeakDemandPredictor darkMode={darkMode} />
            )}

            {isCalculatorOpen && (
                <div className="blur-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, overflowY: 'auto' }}>
                    <div className="fade-in" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', position: 'relative' }}>
                        <button 
                            onClick={() => setIsCalculatorOpen(false)} 
                            style={{ 
                                position: 'absolute', 
                                top: '2rem', 
                                right: '2rem', 
                                background: 'rgba(255, 255, 255, 0.05)', 
                                border: '1px solid rgba(255, 255, 255, 0.15)', 
                                color: 'var(--text-primary)', 
                                padding: '10px 20px', 
                                borderRadius: '30px', 
                                cursor: 'pointer', 
                                zIndex: 10, 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                fontWeight: 500, 
                                fontSize: '15px', 
                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                                letterSpacing: '0.02em', 
                                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', 
                                backdropFilter: 'blur(40px) saturate(150%)', 
                                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
                            }}
                            onMouseOver={(e) => { 
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; 
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onMouseOut={(e) => { 
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; 
                                e.currentTarget.style.transform = 'scale(1)'; 
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.95)'; }}
                        >
                            <Icon name="x" size={16} /> Close
                        </button>
                        <div style={{ background: 'var(--bg-glass-card)', backdropFilter: 'blur(32px) saturate(180%)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border)', boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px inset rgba(255,255,255,0.05)', width: '100%' }}>
                            <CostCalculator energyType={energyType} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
            )}
            
            <p className="footer-note fade-in">
                Predictions use linear regression on historical generation data.<br />
                This tool is for informational purposes only — not financial advice.
            </p>
        </div>
    );
};

const MetricsRow = ({ data, insight, energyType }) => {
    if (!data || !insight) return null;

    const historical = data.filter(d => d.is_historical);
    const predicted = data.filter(d => !d.is_historical);
    
    const latestHistorical = historical[historical.length - 1]?.price || 0;
    const peakPredicted = predicted.length > 0 ? Math.max(...predicted.map(d => d.price)) : 0;
    const isUp = insight.trend === 'increase';

    return (
        <div className="metrics-row fade-in">
            <div className="metric-card">
                <div className="metric-label">Current Generation</div>
                <div className="metric-value">{latestHistorical} <span style={{fontSize:'13px'}}>GWh</span></div>
                <div className="metric-delta delta-up">Latest historical year</div>
            </div>

            <div className="metric-card">
                <div className="metric-label">Predicted Peak</div>
                <div className="metric-value">{peakPredicted} <span style={{fontSize:'13px'}}>GWh</span></div>
                <div className={`metric-delta ${isUp ? 'delta-up' : 'delta-down'}`}>6-year forecast</div>
            </div>

            <div className="metric-card">
                <div className="metric-label">Energy Source</div>
                <div className="metric-value" style={{ textTransform: 'capitalize' }}>{energyType}</div>
                <div className="metric-delta delta-up">Active Filter</div>
            </div>

            <div className="metric-card">
                <div className="metric-label">Confidence</div>
                <div className="metric-value">85%</div>
                <div className="metric-delta delta-up">Linear regression model</div>
            </div>
        </div>
    );
};

const ChartWidget = ({ data, darkMode }) => {
    const [chartType, setChartType] = useState('line');
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    if (!data) return null;

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = data.map(d => d.date);
        
        const historicalData = data.map(d => d.is_historical ? d.price : null);
        const predictedData = data.map(d => !d.is_historical ? d.price : null);

        // Connect lines if not bar chart
        const lastHistIndex = data.reduce((acc, d, idx) => d.is_historical ? idx : acc, -1);
        if (chartType === 'line' && lastHistIndex !== -1 && lastHistIndex + 1 < data.length) {
            predictedData[lastHistIndex] = historicalData[lastHistIndex];
        }

        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-secondary').trim() || '#64748b';
        const gridColor = style.getPropertyValue('--border').trim() || 'rgba(0,0,0,0.1)';
        const tooltipBg = style.getPropertyValue('--bg-card-alt').trim() || '#1a2235';
        const tooltipText = style.getPropertyValue('--text-primary').trim() || '#fff';

        const ctx = chartRef.current.getContext('2d');

        const datasets = chartType === 'line' ? [
            {
                type: 'line',
                label: 'Historical Generation (GWh)',
                data: historicalData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59,130,246,0.08)',
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35,
                fill: true,
            },
            {
                type: 'line',
                label: 'Predicted Generation (GWh)',
                data: predictedData,
                borderColor: '#f59e0b',
                backgroundColor: 'transparent',
                borderWidth: 3,
                borderDash: [6, 4],
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35,
                fill: false,
            }
        ] : [
            {
                type: 'bar',
                label: 'Historical Generation (GWh)',
                data: historicalData,
                backgroundColor: '#3b82f6',
                borderWidth: 0,
                borderRadius: 4,
            },
            {
                type: 'bar',
                label: 'Predicted Generation (GWh)',
                data: predictedData,
                backgroundColor: '#f59e0b',
                borderWidth: 0,
                borderRadius: 4,
            }
        ];

        chartInstance.current = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                color: textColor,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: {
                        stacked: chartType === 'bar',
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: "'DM Mono', monospace", size: 11 } }
                    },
                    y: {
                        stacked: chartType === 'bar',
                        grid: { color: gridColor },
                        ticks: { 
                            color: textColor,
                            font: { family: "'DM Mono', monospace", size: 11 },
                            callback: v => v + ' GWh'
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: tooltipBg,
                        titleColor: tooltipText,
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 10
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, darkMode, chartType]);

    return (
        <div className="chart-card fade-in">
            <div className="chart-header">
                <span className="chart-title" style={{ fontSize: '1.2rem' }}>Price Trend Analysis</span>
                
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="chart-legend">
                    <div className="legend-item">
                        {chartType === 'line' ? 
                            <div style={{width:'24px', height:'3px', background:'#3b82f6'}}></div> : 
                            <div className="legend-swatch swatch-solid" style={{ background: '#3b82f6' }}></div>
                        }
                        <span>Historical</span>
                    </div>
                    <div className="legend-item">
                        {chartType === 'line' ? 
                            <div style={{width:'24px', height:'3px', background:'repeating-linear-gradient(90deg, #f59e0b 0 5px, transparent 5px 9px)'}}></div> : 
                            <div className="legend-swatch swatch-solid" style={{ background: '#f59e0b' }}></div>
                        }
                        <span>Prediction</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-card-alt)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border)', marginLeft: 'auto' }}>
                    <button 
                        style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: 'none', background: chartType === 'line' ? '#3b82f6' : 'transparent', color: chartType === 'line' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                        onClick={() => setChartType('line')}
                    >
                        Line
                    </button>
                    <button 
                        style={{ padding: '0.25rem 0.75rem', borderRadius: '6px', border: 'none', background: chartType === 'bar' ? '#3b82f6' : 'transparent', color: chartType === 'bar' ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
                        onClick={() => setChartType('bar')}
                    >
                        Bar
                    </button>
                </div>
            </div>

            <div className="chart-canvas-wrap" style={{ height: '450px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

const InsightBox = ({ insight }) => {
    if (!insight) return null;

    const isIncrease = insight.trend === 'increase';

    return (
        <div className="reason-card fade-in">
            <h2>Why is the generation trending this way?</h2>
            
            <div className="reason-section-label">Trend Overview</div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {insight.summary}
            </p>

            <div className="reason-section-label">Key Driving Factors</div>
            <div id="reasonsDomestic">
                {insight.reasons.map((reason, idx) => (
                    <div className="reason-item" key={idx}>
                        <div className={`reason-dot ${isIncrease ? 'dot-geopolitical' : 'dot-domestic'}`}></div>
                        <span>{reason}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CostCalculator = ({ energyType, darkMode }) => {
    const [district, setDistrict] = useState('');
    const [inputCost, setInputCost] = useState('');
    const [districts, setDistricts] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState('');
    
    // New Feature States
    const [usageSlider, setUsageSlider] = useState(100);
    const [timeHorizon, setTimeHorizon] = useState(5);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        axios.get('/api/energy-poverty/')
            .then(res => setDistricts(res.data.map(d => d.district)))
            .catch(console.error);
    }, []);

    const handleCalculate = async (e) => {
        if(e) e.preventDefault();
        
        setValidationError('');
        if (!district && !inputCost) {
            setValidationError('Please select a district and enter your current monthly bill.');
            return;
        } else if (!district) {
            setValidationError('Please select a district to view impact.');
            return;
        } else if (!inputCost) {
            setValidationError('Please enter your current monthly bill amount.');
            return;
        }

        setLoading(true);
        try {
            const adjustedCost = inputCost ? (parseFloat(inputCost) * (usageSlider / 100)) : null;
            const response = await axios.post('/api/calculate/', {
                district: district,
                input_cost: adjustedCost
            });
            setResult(response.data);
        } catch (error) {
            console.error("Calculation error", error);
            alert("Error calculating cost.");
        } finally {
            setLoading(false);
        }
    };

    // Dynamic calculation of stats outside useEffect so it updates on first render naturally without dataset hacking
    let displayHorizonBurden = 0;
    let displayCumulativeSavings = 0;
    
    if (result) {
        const current = result.current_exp;
        const baseIncome = result.income || (result.current_exp > 0 && result.future_burden_pct > 0 
            ? (result.current_exp / (result.future_burden_pct / Math.pow(1.05, 5)) * 100) 
            : 1); 
        displayHorizonBurden = baseIncome > 0 ? ((current * Math.pow(1.05, timeHorizon)) / (baseIncome * Math.pow(1.03, timeHorizon))) * 100 : 0;
        
        let totalOriginal = 0;
        let totalNew = 0;
        if (usageSlider < 100) {
            for (let i = 1; i <= timeHorizon; i++) {
                totalOriginal += (parseFloat(inputCost) * Math.pow(1.05, i)) * 12;
                totalNew += (parseFloat(current) * Math.pow(1.05, i)) * 12;
            }
        }
        displayCumulativeSavings = Math.max(0, totalOriginal - totalNew);
    }

    useEffect(() => {
        if(!chartRef.current || !result) return;
        if(chartInstance.current) chartInstance.current.destroy();

        const current = result.current_exp;
        const years = Array.from({length: timeHorizon + 1}, (_, i) => i);
        const dataPts = years.map(y => ({ x: `Year ${y}`, y: (parseFloat(current) * Math.pow(1.05, y)).toFixed(2) }));
        const savingsData = usageSlider < 100 ? years.map(y => ({ x: `Year ${y}`, y: ((parseFloat(inputCost) * Math.pow(1.05, y))).toFixed(2) })) : [];

        // Estimate future burden dynamically based on the selected horizon
        // Assuming income increases slightly by 3% a year
        const baseIncome = result.income || (result.current_exp > 0 && result.future_burden_pct > 0 
            ? (result.current_exp / (result.future_burden_pct / Math.pow(1.05, 5)) * 100) 
            : 1); 
        const horizonBurden = baseIncome > 0 ? ((current * Math.pow(1.05, timeHorizon)) / (baseIncome * Math.pow(1.03, timeHorizon))) * 100 : 0;
        
        // Calculate cumulative savings
        let totalOriginal = 0;
        let totalNew = 0;
        if(usageSlider < 100) {
            for(let i=1; i<=timeHorizon; i++) {
                totalOriginal += (parseFloat(inputCost) * Math.pow(1.05, i)) * 12;
                totalNew += (parseFloat(current) * Math.pow(1.05, i)) * 12;
            }
        }
        const cumulativeSavings = Math.max(0, totalOriginal - totalNew);

        // Custom properties for chart styling
        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-secondary').trim() || '#64748b';
        const gridColor = style.getPropertyValue('--border').trim() || 'rgba(0,0,0,0.1)';

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years.map(y => (y === 0 ? 'Today' : `Y\u200B${y}`)),
                datasets: [
                    {
                        label: 'Projected Monthly Bill (₹)',
                        data: dataPts.map(d => d.y),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        borderWidth: 2,
                        tension: 0.4
                    },
                    ...(usageSlider < 100 ? [{
                        label: 'Bill Without Savings',
                        data: savingsData.map(d => d.y),
                        borderColor: '#7a8fa8',
                        borderDash: [5, 5],
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4
                    }] : [])
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                color: textColor,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    x: { grid: { color: gridColor, drawBorder: false }, ticks: { color: textColor, font: { family: "'Inter', sans-serif" } } },
                    y: { grid: { color: gridColor, drawBorder: false }, ticks: { color: textColor, font: { family: "'DM Mono', monospace" }, callback: v => '₹' + v } }
                },
                plugins: {
                    legend: { display: true, position: 'top', align: 'end', labels: { color: textColor, usePointStyle: true, boxWidth: 8 } },
                    tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 12, cornerRadius: 8, titleColor: '#fff', bodyColor: '#fff' }
                }
            }
        });

        // Use custom property directly on the chart object container for display passing
        if (chartRef.current && chartRef.current.parentNode) {
            chartRef.current.parentNode.dataset.cumulativeSavings = cumulativeSavings.toFixed(0);
            chartRef.current.parentNode.dataset.horizonBurden = horizonBurden.toFixed(1);
        }

        return () => { if(chartInstance.current) chartInstance.current.destroy(); }
    }, [result, darkMode, usageSlider, timeHorizon]);

    return (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '2rem', alignItems: 'start', position: 'relative' }}>
            
            {validationError && (
                <div className="validation-toast" style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 99999,
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 500,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15)'
                }}>
                    <Icon name="alert-circle" size={18} />
                    {validationError}
                </div>
            )}

            <div className="price-card">
                <h2>Impact Simulator</h2>
                <p style={{fontSize:'13px', color:'var(--text-secondary)', marginBottom:'1.5rem', lineHeight: '1.5'}}>
                    Estimate your future budget based on regional inflation patterns.
                </p>

                <form onSubmit={handleCalculate}>
                    <div className="calc-label">Select District (Maharashtra)</div>
                    <select 
                        className="calc-input"
                        value={district} 
                        onChange={(e) => { setDistrict(e.target.value); setValidationError(''); }} 
                    >
                        <option value="" disabled>Choose a district...</option>
                        {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
                    </select>

                    <div className="calc-label">Current Monthly Bill (₹)</div>
                    <input 
                        className="calc-input"
                        type="number" 
                        value={inputCost} 
                        onChange={(e) => { setInputCost(e.target.value); setValidationError(''); }} 
                        placeholder="e.g. 2500"
                        min="0" step="0.1"
                    />

                    <div className="calc-label" style={{ marginTop: '1.25rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Projection Horizon</span>
                        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card-alt)', padding: '2px', borderRadius: '6px' }}>
                            {[3, 5, 10].map(y => (
                                <button
                                    key={y} type="button"
                                    onClick={() => setTimeHorizon(y)}
                                    style={{
                                        background: timeHorizon === y ? 'var(--bg-card)' : 'transparent',
                                        color: timeHorizon === y ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        border: timeHorizon === y ? '1px solid var(--border)' : '1px solid transparent',
                                        borderRadius: '4px', fontSize: '11px', padding: '4px 8px', cursor: 'pointer', fontWeight: 600, boxShadow: timeHorizon === y ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    {y} Yrs
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="calc-label" style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Simulate Lower Usage</span>
                        <span style={{ color: usageSlider < 100 ? '#10b981' : 'var(--text-secondary)', fontWeight: 500 }}>
                            {usageSlider}% of original
                        </span>
                    </div>
                    <input 
                        type="range" 
                        min="50" max="150" step="5"
                        value={usageSlider}
                        onChange={(e) => setUsageSlider(e.target.value)}
                        style={{ width: '100%', marginBottom: '1.5rem', accentColor: '#10b981' }}
                    />
                    
                    <button type="submit" className="predict-btn" disabled={loading} style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'}}>
                        {loading ? 'Computing...' : 'Calculate Impact'}
                        {!loading && <Icon name="arrow-right" size={16} />}
                    </button>
                </form>
            </div>

            <div className="chart-card" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                <span className="chart-title" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="bar-chart" size={18} />
                    {timeHorizon}-Year Trajectory
                </span>
                
                {!result ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Icon name="bar-chart-2" size={48} style={{ opacity: 0.15, marginBottom: '1rem', color: 'var(--text-primary)' }} />
                            <p style={{fontSize: '14px', letterSpacing: '-0.2px'}}>Awaiting configuration to generate report.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
                            <div className="metric-card" style={{ padding: '1rem', background: 'var(--bg-metric)', border: '1px solid var(--border)' }}>
                                <div className="metric-label" style={{fontSize: '11px', letterSpacing: '0.5px'}}>Year {timeHorizon} Est.</div>
                                <div className="metric-value blur-accent-red" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                                    ₹{Math.round(result.current_exp * Math.pow(1.05, timeHorizon))}
                                </div>
                            </div>
                            <div className="metric-card" style={{ padding: '1rem', background: 'var(--bg-metric)', border: '1px solid var(--border)' }}>
                                <div className="metric-label" style={{fontSize: '11px', letterSpacing: '0.5px'}}>Energy Burden</div>
                                <div className="metric-value" style={{ 
                                    fontSize: '1.5rem', 
                                    color: displayHorizonBurden > 10 ? '#ef4444' : '#10b981' 
                                }}>
                                    {displayHorizonBurden > 0 ? displayHorizonBurden.toFixed(1) : '-'}%
                                </div>
                                <div className="metric-delta" style={{opacity: 0.7}}>of avg local income</div>
                            </div>
                            <div className="metric-card" style={{ padding: '1rem', background: 'var(--bg-metric)', border: '1px solid var(--border)' }}>
                                <div className="metric-label" style={{fontSize: '11px', letterSpacing: '0.5px'}}>Total Savings ({timeHorizon}y)</div>
                                <div className="metric-value blur-accent-green" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                                    {usageSlider < 100 ? `₹${displayCumulativeSavings.toFixed(0)}` : '₹0'}
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{position: 'absolute', inset: 0, paddingRight: '4px'}}>
                                <canvas ref={chartRef}></canvas>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const EnergyMixChart = ({ darkMode }) => {
    const [country, setCountry] = useState('India');
    const [data, setData] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        axios.get(`/api/energy-mix/?country=${country}`)
            .then(res => setData(res.data))
            .catch(console.error);
    }, [country]);

    useEffect(() => {
        if (!data || !chartRef.current) return;

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = data.map(d => d.year);
        // Common sources from CSV
        const datasets = [
            { label: 'Coal', data: data.map(d => d.Coal || 0), backgroundColor: '#1e2d45' },
            { label: 'Gas', data: data.map(d => d.Gas || 0), backgroundColor: '#7a8fa8' },
            { label: 'Nuclear', data: data.map(d => d.Nuclear || 0), backgroundColor: '#a8c4e0' },
            { label: 'Hydro', data: data.map(d => d.Hydro || 0), backgroundColor: '#06b6d4' },
            { label: 'Wind', data: data.map(d => d.Wind || 0), backgroundColor: '#10b981' },
            { label: 'Solar', data: data.map(d => d.Solar || 0), backgroundColor: '#f59e0b' },
        ];

        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-secondary').trim() || '#64748b';
        const gridColor = style.getPropertyValue('--border').trim() || 'rgba(0,0,0,0.1)';
        const tooltipBg = style.getPropertyValue('--bg-card-alt').trim() || '#1a2235';
        const tooltipText = style.getPropertyValue('--text-primary').trim() || '#fff';

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                color: textColor,
                scales: {
                    x: { stacked: true, grid: { color: gridColor }, ticks: { color: textColor, font: { family: "'DM Mono', monospace" } } },
                    y: { stacked: true, grid: { color: gridColor }, ticks: { color: textColor, font: { family: "'DM Mono', monospace" } } }
                },
                plugins: {
                    legend: { labels: { color: textColor } },
                    tooltip: {
                        backgroundColor: tooltipBg,
                        titleColor: tooltipText,
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1
                    }
                }
            }
        });

        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, [data, darkMode]);

    return (
        <div className="reason-card fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{margin: 0}}>Global Energy Mix</h2>
                <select 
                    className="region-select"
                    value={country} 
                    onChange={e => setCountry(e.target.value)}
                >
                    <option value="India">India</option>
                    <option value="Germany">Germany</option>
                    <option value="Brazil">Brazil</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                </select>
            </div>
            <div style={{ position: 'relative', height: '320px', width: '100%' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

const DistrictPovertyTable = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/energy-poverty/')
            .then(res => setData(res.data))
            .catch(console.error);
    }, []);

    if (!data) return null;

    return (
        <div className="price-card fade-in" style={{ padding: '1.25rem 1.5rem' }}>
            <h2>Poverty Analysis Database</h2>
            <p style={{ marginBottom: '1rem', fontSize: '13px', color: 'var(--text-secondary)' }}>
                District-wise breakdown of Energy Burden (% of income spent on energy).
            </p>
            <div style={{ maxHeight: '320px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead style={{ background: 'var(--bg-card-alt)', position: 'sticky', top: 0 }}>
                        <tr>
                            <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>District</th>
                            <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Burden %</th>
                            <th style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>Elect. %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.75rem' }}>{d.district}</td>
                                <td style={{ padding: '0.75rem', color: d.energy_burden_pct > 10 ? 'var(--accent-red)' : 'var(--text-primary)', fontWeight: d.energy_burden_pct > 10 ? '600' : 'normal', fontFamily: 'var(--font-mono)' }}>
                                    {d.energy_burden_pct}%
                                </td>
                                <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-mono)' }}>{d.electrification_rate_pct}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PeakDemandPredictor = ({ darkMode }) => {
    // 09 Peak Demand Predictor
    // Data with linear relationship for linear regression demo
    const [data] = useState([
        { temp: 32.5, demand: 953.3 },
        { temp: 29.2, demand: 937.2 },
        { temp: 30.0, demand: 917.8 },
        { temp: 39.1, demand: 1086.9 },
        { temp: 41.6, demand: 1159.2 },
        { temp: 33.4, demand: 972.8 },
        { temp: 29.8, demand: 910.3 },
        { temp: 32.8, demand: 1028.6 },
        { temp: 23.2, demand: 802.2 },
        { temp: 34.9, demand: 1035.0 },
        { temp: 36.5, demand: 1049.2 },
        { temp: 25.3, demand: 854.6 },
        { temp: 28.1, demand: 886.6 },
        { temp: 33.4, demand: 964.0 },
        { temp: 37.1, demand: 1055.5 },
        { temp: 37.1, demand: 1091.8 },
        { temp: 38.3, demand: 1103.1 },
        { temp: 37.0, demand: 1073.4 },
        { temp: 33.8, demand: 977.4 },
        { temp: 33.6, demand: 986.2 },
        { temp: 38.0, demand: 1073.2 },
        { temp: 23.0, demand: 797.7 },
        { temp: 23.8, demand: 828.2 },
        { temp: 24.8, demand: 836.9 },
        { temp: 30.2, demand: 922.8 },
        { temp: 39.4, demand: 1106.4 },
        { temp: 31.0, demand: 984.5 },
        { temp: 33.6, demand: 1000.4 },
        { temp: 28.7, demand: 919.3 },
        { temp: 27.4, demand: 880.2 },
        { temp: 37.3, demand: 1056.5 },
        { temp: 35.0, demand: 1044.1 },
        { temp: 22.8, demand: 842.5 },
        { temp: 24.1, demand: 830.9 },
        { temp: 26.8, demand: 853.2 },
        { temp: 26.4, demand: 846.8 },
        { temp: 27.7, demand: 925.9 },
        { temp: 31.1, demand: 942.3 },
        { temp: 26.1, demand: 847.5 },
        { temp: 36.9, demand: 1080.0 },
        { temp: 26.6, demand: 871.7 },
        { temp: 36.1, demand: 1046.3 },
        { temp: 30.3, demand: 917.8 },
        { temp: 36.7, demand: 1075.0 },
        { temp: 24.0, demand: 853.1 },
        { temp: 28.6, demand: 929.0 },
        { temp: 32.7, demand: 1000.7 },
        { temp: 38.3, demand: 1084.4 },
        { temp: 27.2, demand: 904.0 },
        { temp: 41.1, demand: 1142.8 },
        { temp: 22.2, demand: 820.2 },
        { temp: 35.2, demand: 1060.4 },
        { temp: 35.0, demand: 1023.0 },
        { temp: 40.0, demand: 1083.4 },
        { temp: 41.7, demand: 1176.0 },
        { temp: 27.1, demand: 890.3 },
        { temp: 22.3, demand: 826.5 },
        { temp: 38.7, demand: 1058.2 },
        { temp: 27.8, demand: 918.5 },
        { temp: 30.3, demand: 980.5 }
    ]);
    
    const [stats, setStats] = useState({ slope: 0, intercept: 0, r2: 0 });
    const [inputTemp, setInputTemp] = useState(40);
    const [prediction, setPrediction] = useState(null);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const THRESHOLD = 1100; // Threshold logic for alerts refined for real dataset
    
    // Statistical calculation without libraries
    useEffect(() => {
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
        
        for (let i = 0; i < n; i++) {
            const d = data[i];
            sumX += d.temp;
            sumY += d.demand;
            sumXY += (d.temp * d.demand);
            sumX2 += (d.temp * d.temp);
            sumY2 += (d.demand * d.demand);
        }
        
        const meanX = sumX / n;
        const meanY = sumY / n;
        
        // Slope (m) = (N*sum(xy) - sum(x)*sum(y)) / (N*sum(x^2) - sum(x)^2)
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = meanY - slope * meanX; // Intercept (b) = meanY - m * meanX
        
        // R Squared (R2)
        let ssTot = 0, ssRes = 0;
        for (let i = 0; i < n; i++) {
            const d = data[i];
            const predictedY = slope * d.temp + intercept;
            ssTot += Math.pow(d.demand - meanY, 2);
            ssRes += Math.pow(d.demand - predictedY, 2);
        }
        const r2 = 1 - (ssRes / ssTot);
        
        setStats({ slope, intercept, r2 });
    }, [data]);
    
    // Input-driven prediction
    const handlePredict = (tempVal = inputTemp, m = stats.slope, b = stats.intercept) => {
        const t = parseFloat(tempVal);
        if (!isNaN(t)) {
            setPrediction(m * t + b);
        } else {
            setPrediction(null);
        }
    };
    
    useEffect(() => {
        if (stats.slope !== 0) {
            handlePredict(inputTemp, stats.slope, stats.intercept);
        }
    }, [inputTemp, stats]);
    
    // Chart.js scatter + line overlay
    useEffect(() => {
        if (!chartRef.current || stats.slope === 0) return;
        if (chartInstance.current) chartInstance.current.destroy();
        
        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-secondary').trim() || '#64748b';
        const gridColor = style.getPropertyValue('--border').trim() || 'rgba(0,0,0,0.1)';
        const tooltipText = style.getPropertyValue('--text-primary').trim() || '#fff';
        const bgCardAlt = style.getPropertyValue('--bg-card-alt').trim() || '#1a2235';
        
        const scatterData = data.map(d => ({ x: d.temp, y: d.demand }));
        
        const minTemp = 20;
        const maxTemp = Math.max(40, inputTemp ? parseFloat(inputTemp) + 2 : 40);
        const lineData = [
            { x: minTemp, y: stats.slope * minTemp + stats.intercept },
            { x: maxTemp, y: stats.slope * maxTemp + stats.intercept }
        ];
        
        const datasets = [
            {
                type: 'line',
                label: 'Regression Line',
                data: lineData,
                borderColor: '#ef4444',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0,
                fill: false,
            },
            {
                type: 'scatter',
                label: 'Historical Demand',
                data: scatterData,
                backgroundColor: '#3b82f6',
                pointRadius: 6,
                pointHoverRadius: 8,
            }
        ];
        
        if (prediction !== null && !isNaN(inputTemp)) {
            datasets.push({
                type: 'scatter',
                label: 'Predicted Peak',
                data: [{ x: parseFloat(inputTemp), y: prediction }],
                backgroundColor: '#10b981',
                pointRadius: 8,
                pointHoverRadius: 10,
                pointStyle: 'triangle'
            });
        }
        
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                color: textColor,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: { display: true, text: 'Temperature (°C)', color: textColor, font: { size: 12, family: "'Inter', sans-serif", weight: 'bold' } },
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: "'DM Mono', monospace" } }
                    },
                    y: {
                        title: { display: true, text: 'Demand (MW)', color: textColor, font: { size: 12, family: "'Inter', sans-serif", weight: 'bold' } },
                        grid: { color: gridColor },
                        ticks: { color: textColor, font: { family: "'DM Mono', monospace" } }
                    }
                },
                plugins: {
                    legend: { labels: { color: textColor, font: { family: "'Inter', sans-serif" } } },
                    tooltip: {
                        backgroundColor: bgCardAlt,
                        titleColor: tooltipText,
                        bodyColor: textColor,
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 10
                    }
                }
            }
        });
        
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, [data, stats, prediction, inputTemp, darkMode]);

    return (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
            <div className="price-card">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <Icon name="cpu" size={22} /> Forecast Input
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    Input the forecasted peak temperature to predict the grid demand utilizing our manual linear regression formula mode.
                </p>
                
                <div style={{ background: 'var(--bg-card-alt)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                        Statistical Breakdown
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontFamily: "'DM Mono', monospace" }}>
                        <span style={{ color: 'var(--text-secondary)' }}>R² Score:</span> 
                        <span style={{ color: 'var(--text-primary)' }}>{stats.r2.toFixed(4)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontFamily: "'DM Mono', monospace" }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Slope (m):</span> 
                        <span style={{ color: 'var(--text-primary)' }}>{stats.slope.toFixed(3)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: "'DM Mono', monospace" }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Intercept (b):</span> 
                        <span style={{ color: 'var(--text-primary)' }}>{stats.intercept.toFixed(3)}</span>
                    </div>
                </div>
                
                <div className="calc-label" style={{ marginBottom: '0.5rem' }}>Expected Temperature (°C)</div>
                <input 
                    type="number" 
                    className="calc-input" 
                    value={inputTemp} 
                    onChange={(e) => setInputTemp(e.target.value)} 
                    step="0.5" 
                    style={{ marginBottom: '1.5rem', width: '100%' }}
                />
                
                {prediction !== null && (
                    <div style={{
                        padding: '1.25rem', 
                        borderRadius: '12px',
                        background: prediction > THRESHOLD ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                        border: `1px solid ${prediction > THRESHOLD ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '6px', fontWeight: 600, color: prediction > THRESHOLD ? '#ef4444' : '#10b981' }}>
                            Predicted Peak Demand
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 'bold', fontFamily: "'DM Mono', monospace", color: 'var(--text-primary)', marginBottom: '8px' }}>
                            {prediction.toFixed(1)} <span style={{fontSize:'14px', fontWeight:'normal', color:'var(--text-secondary)'}}>MW</span>
                        </div>
                        {prediction > THRESHOLD ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '13px', fontWeight: 500 }}>
                                <Icon name="alert-triangle" size={16} /> Overload Warning (>{THRESHOLD} MW)
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '13px', fontWeight: 500 }}>
                                <Icon name="check-circle" size={16} /> Grid Capacity Optimal
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="chart-card" style={{ minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
                 <span className="chart-title" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name="scatter-chart" size={18} />
                    Regression Logic Visualization
                </span>
                <div style={{ flex: 1, position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, paddingRight: '4px' }}>
                        <canvas ref={chartRef}></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LandingPage = ({ onEnter }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'radial-gradient(ellipse at bottom, #0f2027 0%, #020617 100%)',
            color: '#fff',
            fontFamily: "'Syne', sans-serif",
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* High-Tech Animated Grid Background */}
            <div style={{
                position: 'absolute',
                inset: -200,
                backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                transform: 'perspective(600px) rotateX(60deg) translateY(-50px) translateZ(-200px)',
                animation: 'gridMove 15s linear infinite',
                zIndex: 0,
            }}></div>

            {/* Glowing Overlays */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '15%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0,
            }}></div>

            <style>
                {`
                @keyframes gridMove {
                    0% { transform: perspective(600px) rotateX(60deg) translateY(0) translateZ(-200px); }
                    100% { transform: perspective(600px) rotateX(60deg) translateY(50px) translateZ(-200px); }
                }
                @keyframes floatIdle {
                    0% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-10px) scale(1.02); }
                    100% { transform: translateY(0px) scale(1); }
                }
                @keyframes glowPulse {
                    0%, 100% { text-shadow: 0 0 15px rgba(56, 189, 248, 0.4), 0 0 30px rgba(56, 189, 248, 0.2); }
                    50% { text-shadow: 0 0 25px rgba(56, 189, 248, 0.7), 0 0 50px rgba(56, 189, 248, 0.4); }
                }
                .futuristic-btn {
                    position: relative;
                    padding: 16px 48px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    background: rgba(15, 23, 42, 0.6);
                    color: #e0f2fe;
                    border: 1px solid rgba(56, 189, 248, 0.4);
                    border-radius: 4px;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    font-family: "'DM Mono', monospace";
                    backdrop-filter: blur(10px);
                    box-shadow: 0 0 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(56, 189, 248, 0.1);
                }
                .futuristic-btn:hover {
                    background: rgba(56, 189, 248, 0.15);
                    border-color: rgba(56, 189, 248, 0.8);
                    color: #fff;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.3), inset 0 0 20px rgba(56, 189, 248, 0.2);
                }
                .futuristic-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transform: skewX(-20deg);
                    transition: none;
                }
                .futuristic-btn:hover::before {
                    left: 200%;
                    transition: left 0.7s ease-in-out;
                }
                .title-text {
                    font-size: 5.5rem;
                }
                .desc-text {
                    font-size: 1.15rem;
                }
                @media (max-width: 768px) {
                    .title-text { font-size: 3rem; }
                    .desc-text { font-size: 1rem; padding: 0 1rem; }
                    .futuristic-btn { padding: 12px 30px; font-size: 1rem; }
                }
                `}
            </style>

            <div style={{ zIndex: 10, textAlign: 'center', maxWidth: '850px', padding: '3rem', animation: 'floatIdle 6s ease-in-out infinite' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '8px 20px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.05), rgba(16, 185, 129, 0.05))',
                    borderLeft: '2px solid #38bdf8',
                    borderRight: '2px solid #10b981',
                    color: '#93c5fd',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    marginBottom: '2rem',
                    textTransform: 'uppercase',
                    width: 'fit-content',
                    margin: '0 auto 2rem auto',
                    fontFamily: "'DM Mono', monospace"
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8', animation: 'glowPulse 2s infinite' }}></div>
                    Core Engine Online
                </div>
                
                <h1 className="title-text" style={{
                    fontWeight: 800,
                    margin: '0 0 1.5rem 0',
                    lineHeight: '1.1',
                    background: 'linear-gradient(180deg, #ffffff 0%, #7dd3fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'glowPulse 4s infinite alternate'
                }}>
                    Energy Nexus
                </h1>
                
                <p className="desc-text" style={{
                    color: '#94a3b8',
                    lineHeight: '1.8',
                    marginBottom: '4rem',
                    fontFamily: "'Inter', sans-serif",
                    maxWidth: '650px',
                    margin: '0 auto 4rem auto'
                }}>
                    Deploying predictive models for global energy demand. Monitor grid loads, calculate economic thresholds, and anticipate future energy crises with pinpoint analytic accuracy.
                </p>

                <button 
                    className="futuristic-btn"
                    onClick={onEnter}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        Initialize System <Icon name="chevron-right" size={20} />
                    </span>
                </button>
            </div>
            
            {/* Hexagon tech decorations */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', opacity: 0.3 }}>
                <Icon name="cpu" size={48} className="spin-slow" style={{ color: '#38bdf8' }} />
            </div>
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', opacity: 0.3 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#38bdf8', textAlign: 'right' }}>
                    v2.4.0 <br />
                    PROTOCOL: ACTIVE <br />
                    SYS.TEMP: OPTIMAL
                </div>
            </div>
        </div>
    );
};

const MainWrapper = () => {
    const [entered, setEntered] = useState(false);
    return entered ? <OldDashboard /> : <LandingPage onEnter={() => setEntered(true)} />;
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainWrapper />);


const { BrowserRouter, Route, Link, Switch } = window.ReactRouterDOM || window.ReactRouterDOM || {};

const Navbar = () => (
    <nav style={{ position: 'sticky', top: 0, background: '#020617', padding: '1rem', display: 'flex', gap: '1rem', zIndex: 1000, borderBottom: '1px solid #f97316' }}>
        <Link to="/" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/predictor" style={{ color: '#f97316', textDecoration: 'none', fontWeight: 'bold' }}>Predictor</Link>
    </nav>
);

const HomePage = () => {
    const [stats, setStats] = useState({ r2: 0, slope: 0, days: 0 });

    useEffect(() => {
        axios.get('/api/regression/')
            .then(res => {
                setStats({
                    r2: res.data.r2,
                    slope: res.data.slope,
                    days: res.data.data.length
                });
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ background: '#020617', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace' }}>
            <h1 style={{ color: '#f97316' }}>Peak Demand Predictor</h1>
            <p>Analyze and forecast energy peak demand based on temperature.</p>
            
            <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                    <h3>R� Score</h3>
                    <p>{stats.r2.toFixed(4)}</p>
                </div>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                    <h3>Slope</h3>
                    <p>{stats.slope.toFixed(4)}</p>
                </div>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
                    <h3>Training Days</h3>
                    <p>{stats.days}</p>
                </div>
            </div>
            
            <Link to="/predictor" style={{ background: '#f97316', color: '#fff', padding: '0.5rem 1rem', textDecoration: 'none', borderRadius: '4px' }}>
                Go to Predictor
            </Link>
        </div>
    );
};

const PredictorPage = () => {
    const [data, setData] = useState([]);
    const [regression, setRegression] = useState({ slope: 0, intercept: 0, r2: 0 });
    const [tempInput, setTempInput] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get('/api/regression/')
            .then(res => {
                setData(res.data.data);
                setRegression({ slope: res.data.slope, intercept: res.data.intercept, r2: res.data.r2 });
            })
            .catch(err => console.error(err));
    }, []);

    const handlePredict = async () => {
        try {
            const res = await axios.post('/api/predict/', { temperature: parseFloat(tempInput) });
            setPrediction({ temp: parseFloat(tempInput), demand: res.data.predicted_demand, formula: res.data.formula });
        } catch (err) {
            console.error(err);
        }
    };

    // Calculate dynamic SVG coordinates
    const PADDING = 40;
    const WIDTH = 600;
    const HEIGHT = 400;

    const minX = data.length > 0 ? Math.min(...data.map(d => d.temp), prediction ? prediction.temp : Infinity) - 5 : 0;
    const maxX = data.length > 0 ? Math.max(...data.map(d => d.temp), prediction ? prediction.temp : -Infinity) + 5 : 100;
    const minY = data.length > 0 ? Math.min(...data.map(d => d.demand), prediction ? prediction.demand : Infinity) - 10 : 0;
    const maxY = data.length > 0 ? Math.max(...data.map(d => d.demand), prediction ? prediction.demand : -Infinity) + 10 : 100;

    const scaleX = (val) => PADDING + ((val - minX) / (maxX - minX)) * (WIDTH - 2 * PADDING);
    const scaleY = (val) => HEIGHT - PADDING - ((val - minY) / (maxY - minY)) * (HEIGHT - 2 * PADDING);

    const x1 = minX;
    const y1 = regression.slope * minX + regression.intercept;
    const x2 = maxX;
    const y2 = regression.slope * maxX + regression.intercept;

    return (
        <div style={{ background: '#020617', color: '#fff', minHeight: '100vh', padding: '2rem', fontFamily: 'monospace' }}>
            <h1 style={{ color: '#f97316' }}>Predictor Page</h1>
            
            <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', display: 'inline-block' }}>
                <p><strong>Formula:</strong> y = {regression.slope.toFixed(4)}x + {regression.intercept.toFixed(4)}</p>
                <p><strong>R�:</strong> {regression.r2.toFixed(4)}</p>
            </div>

            <div style={{ margin: '1rem 0' }}>
                <input 
                    type="number" 
                    value={tempInput} 
                    onChange={e => setTempInput(e.target.value)} 
                    placeholder="Enter temperature (C)"
                    style={{ padding: '0.5rem', marginRight: '1rem', background: '#020617', color: '#fff', border: '1px solid #f97316' }}
                />
                <button onClick={handlePredict} style={{ background: '#f97316', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>
                    Predict
                </button>
            </div>
            
            {prediction && (
                <p style={{ color: '#f97316', fontWeight: 'bold' }}>
                    Predicted Demand: {prediction.demand.toFixed(2)} MW at {prediction.temp} �C
                </p>
            )}

            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                <svg width={WIDTH} height={HEIGHT} style={{ background: '#0f172a', border: '1px solid #333' }}>
                    {/* Axes */}
                    <line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke="#fff" />
                    <line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke="#fff" />

                    {/* Regression Line */}
                    <line 
                        x1={scaleX(x1)} y1={scaleY(y1)} 
                        x2={scaleX(x2)} y2={scaleY(y2)} 
                        stroke="#f97316" strokeWidth="2" 
                    />

                    {/* Scatter Points */}
                    {data.map((d, i) => (
                        <circle key={i} cx={scaleX(d.temp)} cy={scaleY(d.demand)} r="4" fill="#fff" opacity="0.7" />
                    ))}

                    {/* Prediction Crosshair */}
                    {prediction && (
                        <g>
                            <line x1={scaleX(prediction.temp)} y1={HEIGHT - PADDING} x2={scaleX(prediction.temp)} y2={scaleY(prediction.demand)} stroke="#f97316" strokeDasharray="5,5" />
                            <line x1={PADDING} y1={scaleY(prediction.demand)} x2={scaleX(prediction.temp)} y2={scaleY(prediction.demand)} stroke="#f97316" strokeDasharray="5,5" />
                            <circle cx={scaleX(prediction.temp)} cy={scaleY(prediction.demand)} r="6" fill="#f97316" />
                        </g>
                    )}
                </svg>
            </div>

            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#0f172a', color: '#f97316' }}>
                        <th style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>Day</th>
                        <th style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>Temp (�C)</th>
                        <th style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>Actual Demand (MW)</th>
                        <th style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>Predicted Demand (MW)</th>
                        <th style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>Residual</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => {
                        const pred = regression.slope * d.temp + regression.intercept;
                        const res = d.demand - pred;
                        return (
                            <tr key={i}>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>{d.day}</td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>{d.temp}</td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>{d.demand}</td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>{pred.toFixed(2)}</td>
                                <td style={{ padding: '0.5rem', borderBottom: '1px solid #333' }}>{res.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    return window.ReactRouterDOM ? (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/predictor" component={PredictorPage} />
            </Switch>
        </BrowserRouter>
    ) : (
        <div style={{ color: 'white', padding: '2rem' }}>Loading React Router...</div>
    );
};

if (document.getElementById('root')) {
    // legacy
}

