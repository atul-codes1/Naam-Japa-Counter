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
                <div style={{ background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color, fontSize: '14px' }}>
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
                    <h1 className="guru-main-title">Spiritual Insights</h1>

                    {/* Key Stats Cards - Using the updated .stat-card class from index.css */}
                    <div className="stats-container" style={{ marginBottom: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                        <div className="stat-card" style={{ width: '180px' }}>
                            <span style={{ fontSize: '24px', marginBottom: '4px' }}>🔥</span>
                            <span style={{ fontSize: '14px', color: '#666' }}>Active Days</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#880E4F' }}>
                                {advancedStats.activeDays}
                            </span>
                        </div>
                        <div className="stat-card" style={{ width: '180px' }}>
                            <span style={{ fontSize: '24px', marginBottom: '4px' }}>✨</span>
                            <span style={{ fontSize: '14px', color: '#666' }}>Total Japa</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#880E4F' }}>
                                {advancedStats.totalJapa}
                            </span>
                        </div>
                        <div className="stat-card" style={{ width: '180px' }}>
                            <span style={{ fontSize: '24px', marginBottom: '4px' }}>🏆</span>
                            <span style={{ fontSize: '14px', color: '#666' }}>Best Day</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#C2185B' }}>
                                {advancedStats.bestDay}
                            </span>
                        </div>
                        <div className="stat-card" style={{ width: '180px' }}>
                            <span style={{ fontSize: '24px', marginBottom: '4px' }}>📊</span>
                            <span style={{ fontSize: '14px', color: '#666' }}>Average/Day</span>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#C2185B' }}>
                                {advancedStats.averageDay}
                            </span>
                        </div>
                    </div>

                    {/* Weekly Progress Chart */}
                    <div className="guru-card" style={{ padding: '30px', marginBottom: '30px' }}>
                        <h2 className="guru-title" style={{ fontSize: '22px', textAlign: 'center', marginBottom: '25px' }}>Progress Chart</h2>
                        <div style={{ width: '100%', height: 350 }}>
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

                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                        {/* Distribution Pie Chart */}
                        <div className="guru-card" style={{ padding: '30px', flex: '1', minWidth: '300px' }}>
                            <h2 className="guru-title" style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}>Naam Connection</h2>
                            <div style={{ width: '100%', height: 250 }}>
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
                        <div className="guru-card" style={{ padding: '30px', flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                            <span style={{ fontSize: '40px', marginBottom: '15px' }}>📿</span>
                            <p style={{ fontStyle: 'italic', color: '#666', fontSize: '18px', lineHeight: '1.6' }}>
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
