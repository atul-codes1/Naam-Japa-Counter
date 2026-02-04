import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { getHindiName } from '../utils/helpers';

const StatisticsPage = ({ japaStats }) => {
    // 1. Process data for the Weekly Stacked Bar Chart
    const chartData = useMemo(() => {
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            last7Days.push(d.toISOString().split('T')[0]);
        }

        return last7Days.map(date => {
            const dayEntry = { name: date.split('-').slice(1).join('/') }; // Format MM/DD
            let hasData = false;

            Object.entries(japaStats).forEach(([naam, data]) => {
                const dayCount = data.history?.[date]?.counts || 0;
                dayEntry[naam] = dayCount;
                if (dayCount > 0) hasData = true;
            });

            return hasData ? dayEntry : { ...dayEntry, empty: 0 };
        });
    }, [japaStats]);

    // 2. Process data for the Pie Chart (Deity Distribution)
    const pieData = useMemo(() => {
        return Object.entries(japaStats)
            .map(([naam, data]) => ({
                name: naam,
                value: data.lifetime?.totalCounts || 0
            }))
            .filter(item => item.value > 0);
    }, [japaStats]);

    // 3. Process Advanced Stats (Best Day, Average Day)
    const advancedStats = useMemo(() => {
        const dailyTotals = {};
        Object.values(japaStats).forEach(deity => {
            Object.entries(deity.history || {}).forEach(([date, hist]) => {
                dailyTotals[date] = (dailyTotals[date] || 0) + (hist.counts || 0);
            });
        });

        const totalsArray = Object.values(dailyTotals);
        const totalJapa = totalsArray.reduce((acc, val) => acc + val, 0);
        const activeDays = totalsArray.length;

        return {
            bestDay: totalsArray.length > 0 ? Math.max(...totalsArray) : 0,
            averageDay: activeDays > 0 ? Math.round(totalJapa / activeDays) : 0,
            activeDays,
            totalJapa
        };
    }, [japaStats]);

    const COLORS = ['#FF4081', '#880E4F', '#FF80AB', '#C2185B', '#F8BBD0'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="tooltip-item" style={{ color: entry.color }}>
                            {entry.name}: {entry.value} Japa
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-inner">
                    <h1
                        className="guru-main-title animate-fade-in-down"
                    >
                        Spiritual Insights
                    </h1>

                    {/* Key Stats Cards */}
                    <div className="stats-container stats-page-grid">
                        <div
                            className="stat-card stats-page-card animate-fade-in-up delay-200"
                        >
                            <span className="stat-card-icon">🔥</span>
                            <span className="stat-card-label">Active Days</span>
                            <span className="stat-card-value">
                                {advancedStats.activeDays}
                            </span>
                        </div>
                        <div
                            className="stat-card stats-page-card animate-fade-in-up delay-300"
                        >
                            <span className="stat-card-icon">✨</span>
                            <span className="stat-card-label">Total Japa</span>
                            <span className="stat-card-value">
                                {advancedStats.totalJapa}
                            </span>
                        </div>
                        <div
                            className="stat-card stats-page-card animate-fade-in-up delay-400"
                        >
                            <span className="stat-card-icon">🏆</span>
                            <span className="stat-card-label">Best Day</span>
                            <span className="stat-card-value highlight">
                                {advancedStats.bestDay}
                            </span>
                        </div>
                        <div
                            className="stat-card stats-page-card animate-fade-in-up delay-500"
                        >
                            <span className="stat-card-icon">📊</span>
                            <span className="stat-card-label">Average/Day</span>
                            <span className="stat-card-value highlight">
                                {advancedStats.averageDay}
                            </span>
                        </div>
                    </div>

                    {/* Weekly Progress Chart */}
                    <div
                        className="guru-card chart-card animate-slide-up delay-500"
                    >
                        <h2 className="guru-title chart-title">Progress Chart</h2>
                        <div className="chart-container-large">
                            <ResponsiveContainer>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: 20 }} />
                                    {Object.keys(japaStats).map((naam, index) => (
                                        <Bar
                                            key={naam}
                                            dataKey={naam}
                                            name={getHindiName(naam)}
                                            stackId="a"
                                            fill={COLORS[index % COLORS.length]}
                                            radius={[4, 4, 0, 0]}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="stats-row">
                        {/* Distribution Pie Chart */}
                        {/* Distribution Pie Chart */}
                        <div
                            className="guru-card pie-chart-card animate-slide-up delay-600"
                        >
                            <h2 className="guru-title chart-title pie-chart-title">Naam Connection</h2>
                            <div className="chart-container-medium">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Quote / Message */}
                        <div className="guru-card quote-card">
                            <span className="quote-icon">📿</span>
                            <p className="quote-text">
                                "Constant chanting is the only way to reach the ultimate peace. Every single name you utter is stored in the reservoir of your heart."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
