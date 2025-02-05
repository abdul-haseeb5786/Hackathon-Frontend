import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart, Tooltip, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

const AdminPiechart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIndustryData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/industries/top5");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log("Industry Data:", result);

                if (!Array.isArray(result) || result.length === 0) {
                    throw new Error("No data available for industries.");
                }

                // Transform API data to match chart format
                const formattedData = result.map((item, index) => ({
                    industry: item._id || "Unknown",
                    count: item.count || 0,
                    fill: COLORS[index % COLORS.length],
                }));

                setData(formattedData);
            } catch (err) {
                console.error("Error fetching industry data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIndustryData();
    }, []);

    if (loading) return <p>Loading chart...</p>;
    if (error) return <p>Error: {error}</p>;
    if (data.length === 0) return <p>No industry data available.</p>;

    // ✅ Fix: Adding a proper config object for ChartContainer
    const chartConfig = {
        count: {
            label: "Count",
        },
    };

    const totalVisitors = data.reduce((acc, curr) => acc + curr.count, 0);

    return (
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
                <Tooltip cursor={false} />
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="industry"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalVisitors.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Visitors
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
};

export default AdminPiechart;
