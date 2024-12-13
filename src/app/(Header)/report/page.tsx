"use client";

import { type Chart as ChartJS, ChartData, ChartOptions } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

type ChartType = "bar" | "line" | "radar" | "polarArea" | "pie";

interface ChartConfig {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
}

const Page = () => {
  const chartRefs = {
    chart1: useRef<HTMLCanvasElement>(null),
    chart2: useRef<HTMLCanvasElement>(null),
    chart3: useRef<HTMLCanvasElement>(null),
    chart4: useRef<HTMLCanvasElement>(null),
    chart5: useRef<HTMLCanvasElement>(null),
  };

  const getChartConfigs = (): Record<keyof typeof chartRefs, ChartConfig> => ({
    chart1: {
      type: "bar",
      data: {
        labels: [
          "컴포넌트1",
          "컴포넌트2",
          "컴포넌트3",
          "컴포넌트4",
          "컴포넌트5",
          "컴포넌트6",
        ],
        datasets: [
          {
            label: "2022",
            data: [25, 46, 57, 60, 51, 18],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "2023",
            data: [38, 46, 57, 68, 58, 51],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "2024",
            data: [65, 79, 82, 68, 96, 68],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y", // Horizontal bar chart
      },
    },

    chart2: {
      type: "bar",
      data: {
        labels: [
          "카테고리1",
          "카테고리2",
          "카테고리3",
          "카테고리4",
          "카테고리5",
          "카테고리6",
        ],
        datasets: [
          {
            label: "2022",
            data: [79, 25, 89, 57, 58, 96],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "2023",
            data: [46, 38, 57, 50, 70, 80],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "2024",
            data: [68, 79, 88, 68, 75, 18],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      },
    },

    chart3: {
      type: "radar",
      data: {
        labels: ["패턴1", "패턴2", "패턴3", "패턴4", "패턴5", "패턴6"],
        datasets: [
          {
            label: "2022",
            data: [80, 60, 40, 50, 60, 70],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "2023",
            data: [70, 50, 55, 60, 80, 60],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "2024",
            data: [90, 80, 65, 60, 90, 75],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    },

    chart4: {
      type: "polarArea",
      data: {
        labels: ["2022", "2023", "2024"],
        datasets: [
          {
            data: [40, 50, 60],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 205, 86, 0.6)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    },

    chart5: {
      type: "pie",
      data: {
        labels: [
          "컴포넌트1",
          "컴포넌트2",
          "컴포넌트3",
          "컴포넌트4",
          "컴포넌트5",
          "컴포넌트6",
        ],
        datasets: [
          {
            data: [144, 213, 128, 222, 226], // 각 컴포넌트의 다운로드 수치
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: "rgba(0, 0, 0, 0)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number; // 타입 단언을 사용하여 unknown을 number로 변환
                const label: string = context.label as string;
                const percentage = (value / 1133) * 100; // 퍼센트 계산
                return `${label}: ${value} (${percentage.toFixed(2)}%)`; // 퍼센트를 소수점 2자리로 표시
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    const chartInstances: ChartJS[] = [];
    const configs = getChartConfigs();

    Object.entries(chartRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        if (ctx) {
          const config = configs[key as keyof typeof chartRefs];
          const chart = new Chart(ctx, {
            type: config.type,
            data: config.data,
            options: config.options,
          });
          chartInstances.push(chart);
        }
      }
    });

    return () => {
      chartInstances.forEach((chart) => chart.destroy());
    };
  }, []);

  return (
    <div className="flex-1 mt-[12px]">
      {/* 상단 3개 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-white text-lg mb-2">컴포넌트 사용 빈도</h2>
          <div className="h-[234px]">
            <canvas ref={chartRefs.chart1} />
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-white text-lg mb-2">카테고리별 데이터</h2>
          <div className="h-[234px]">
            <canvas ref={chartRefs.chart2} />
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-white text-lg mb-2">검색 패턴</h2>
          <div className="h-[234px]">
            <canvas ref={chartRefs.chart3} />
          </div>
        </div>
      </div>

      {/* 하단 2개 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-white text-lg mb-2">업데이트 기록</h2>
          <div className="h-[234px]">
            <canvas ref={chartRefs.chart4} />
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
          <h2 className="text-white text-lg mb-2">다운로드 내역</h2>
          <div className="h-[234px]">
            <canvas ref={chartRefs.chart5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
