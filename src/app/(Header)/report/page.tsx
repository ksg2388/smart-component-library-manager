"use client";

import { Chart, ChartData, ChartOptions } from "chart.js/auto";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChartType = "bar" | "line" | "radar" | "polarArea" | "pie";

interface ChartConfig {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

function ChartCard({
  title,
  children,
  onClose,
  onMaximize,
  isMaximized,
}: ChartCardProps) {
  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg overflow-hidden ${
        isMaximized
          ? "bg-gray-900 rounded-lg shadow-lg overflow-hidden fixed top-0 left-0 w-full h-full z-50"
          : ""
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <h2 className="text-white text-lg font-medium">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-gray-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-gray-400" />
            )}
          </button>
          {/* 최대화 상태일 때 X 버튼 숨기기 */}
          {!isMaximized && onClose && (
            <button className="p-1 hover:bg-gray-700 rounded" onClick={onClose}>
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
      <div className={`p-4 ${isMaximized ? "h-[calc(100%-50px)]" : ""}`}>
        {children}
      </div>
    </div>
  );
}

type ChartRef = HTMLCanvasElement & { chartInstance?: Chart };

const Page = () => {
  const [chartVisibility, setChartVisibility] = useState<{
    chart1: boolean;
    chart2: boolean;
    chart3: boolean;
    chart4: boolean;
    chart5: boolean;
  }>({
    chart1: true,
    chart2: true,
    chart3: true,
    chart4: true,
    chart5: true,
  });

  const [maximizedChart, setMaximizedChart] = useState<string | null>(null);

  const chartRefs = {
    chart1: useRef<ChartRef>(null),
    chart2: useRef<ChartRef>(null),
    chart3: useRef<ChartRef>(null),
    chart4: useRef<ChartRef>(null),
    chart5: useRef<ChartRef>(null),
  };

  function generateRandomData() {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push(Math.floor(Math.random() * 100)); // 0 ~ 100 사이의 랜덤 값
    }
    return data;
  }

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
        scales: {
          x: {
            grid: {
              color: "#45454573",
            },
          },
          y: {
            grid: {
              color: "#45454573",
            },
          },
        },
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
              color: "rgba(142, 142, 142, 0.1)",
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
        scales: {
          r: {
            grid: {
              color: "#454545",
            },
          },
        },
      },
    },
    chart4: {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Dataset 1 (2022)",
            data: generateRandomData(), // 랜덤 데이터 생성
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y1", // 첫 번째 y축
          },
          {
            label: "Dataset 2 (2023)",
            data: generateRandomData(), // 랜덤 데이터 생성
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y2", // 두 번째 y축
          },
          {
            label: "Dataset 3 (2024)",
            data: generateRandomData(), // 랜덤 데이터 생성
            backgroundColor: "rgba(255, 205, 86, 0.2)",
            borderColor: "rgba(255, 205, 86, 1)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y1", // 첫 번째 y축
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y1: {
            type: "linear",
            position: "left",
            grid: {
              color: "#454545",
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
          y2: {
            type: "linear",
            position: "right",
            grid: {
              color: "#454545",
            },
          },
        },
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
            data: [144, 213, 128, 222, 226],
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
                const value = context.raw as number;
                const label: string = context.label as string;
                const percentage = (value / 1133) * 100;
                return `${label}: ${value} (${percentage.toFixed(2)}%)`;
              },
            },
          },
          legend: {
            position: "right",
          },
        },
      },
    },
  });

  function handleClose(chartId: string) {
    setChartVisibility((prevState) => ({
      ...prevState,
      [chartId]: false,
    }));
  }

  function handleMaximize(chartId: string | null) {
    setMaximizedChart((prev) => (prev === chartId ? null : chartId));
  }

  useEffect(() => {
    if (maximizedChart) {
      const chartRef = chartRefs[maximizedChart as keyof typeof chartRefs];
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        const configs = getChartConfigs();
        const chartConfig = configs[maximizedChart as keyof typeof chartRefs];

        const chartInstance = new Chart(ctx!, {
          type: chartConfig.type,
          data: chartConfig.data,
          options: chartConfig.options,
        });

        return () => chartInstance.destroy();
      }
    }
  }, [maximizedChart]);

  useEffect(() => {
    Object.keys(chartRefs).forEach((chartId) => {
      const chartRef = chartRefs[chartId as keyof typeof chartRefs];
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        const configs = getChartConfigs();
        const chartConfig = configs[chartId as keyof typeof chartRefs];

        if (ctx) {
          // 이전 차트가 존재하면 파괴
          if (chartRef.current.chartInstance) {
            chartRef.current.chartInstance.destroy();
          }

          // 새 차트 생성
          const chartInstance = new Chart(ctx, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: chartConfig.options,
          });

          // 차트 인스턴스를 reference에 저장
          chartRef.current.chartInstance = chartInstance;
        }
      }
    });
  }, [chartVisibility]); // chartVisibility 변경 시마다 차트를 재생성

  return (
    <div className="flex-1 mt-[12px] relative overflow-hidden">
      {/* 상단 3개 차트 */}
      <div
        className={`grid gap-4 mb-2 ${
          maximizedChart ? "hidden" : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {chartVisibility.chart1 && (
          <ChartCard
            title="컴포넌트 사용 빈도"
            onClose={() => handleClose("chart1")}
            onMaximize={() => handleMaximize("chart1")}
            isMaximized={maximizedChart === "chart1"}
          >
            <div
              style={{
                height:
                  maximizedChart === "chart1" ? "calc(100% - 50px)" : "270px",
                overflow: "hidden",
              }}
            >
              <canvas ref={chartRefs.chart1} />
            </div>
          </ChartCard>
        )}
        {chartVisibility.chart2 && (
          <ChartCard
            title="카테고리별 다운로드"
            onClose={() => handleClose("chart2")}
            onMaximize={() => handleMaximize("chart2")}
            isMaximized={maximizedChart === "chart2"}
          >
            <div
              style={{
                height:
                  maximizedChart === "chart2" ? "calc(100% - 50px)" : "270px",
                overflow: "hidden",
              }}
            >
              <canvas ref={chartRefs.chart2} />
            </div>
          </ChartCard>
        )}
        {chartVisibility.chart3 && (
          <ChartCard
            title="검색 패턴"
            onClose={() => handleClose("chart3")}
            onMaximize={() => handleMaximize("chart3")}
            isMaximized={maximizedChart === "chart3"}
          >
            <div
              style={{
                height:
                  maximizedChart === "chart3" ? "calc(100% - 50px)" : "270px",
                overflow: "hidden",
              }}
            >
              <canvas ref={chartRefs.chart3} />
            </div>
          </ChartCard>
        )}
      </div>

      {/* 하단 2개 차트 */}
      <div
        className={`grid gap-4 ${
          maximizedChart ? "hidden" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {chartVisibility.chart4 && (
          <ChartCard
            title="업데이트 기록"
            onClose={() => handleClose("chart4")}
            onMaximize={() => handleMaximize("chart4")}
            isMaximized={maximizedChart === "chart4"}
          >
            <div
              style={{
                height:
                  maximizedChart === "chart4" ? "calc(100% - 50px)" : "270px",
                overflow: "hidden",
              }}
            >
              <canvas ref={chartRefs.chart4} />
            </div>
          </ChartCard>
        )}
        {chartVisibility.chart5 && (
          <ChartCard
            title="다운로드 내역"
            onClose={() => handleClose("chart5")}
            onMaximize={() => handleMaximize("chart5")}
            isMaximized={maximizedChart === "chart5"}
          >
            <div
              style={{
                height:
                  maximizedChart === "chart5" ? "calc(100% - 50px)" : "270px",
                overflow: "hidden",
              }}
            >
              <canvas ref={chartRefs.chart5} />
            </div>
          </ChartCard>
        )}
      </div>

      {/* 최대화 상태일 때 */}
      {maximizedChart && (
        <div className="absolute inset-0 bg-white z-10 p-4 overflow-auto">
          <ChartCard
            title={
              maximizedChart === "chart1"
                ? "컴포넌트 사용 빈도"
                : maximizedChart === "chart2"
                ? "카테고리별 다운로드"
                : maximizedChart === "chart3"
                ? "검색 패턴"
                : maximizedChart === "chart4"
                ? "업데이트 기록"
                : "다운로드 내역"
            }
            onClose={() => handleClose(maximizedChart)}
            onMaximize={() => handleMaximize(null)}
            isMaximized={true}
          >
            <div className="h-full">
              <canvas
                ref={chartRefs[maximizedChart as keyof typeof chartRefs]}
              />
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};

export default Page;
