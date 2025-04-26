import { VictoryPie } from "victory-pie";
import "./chart.scss";
interface ChartJSProps {
  data: { x: string; y: number }[];
  colorPallete: {
    name: string;
    color: string;
  }[];
}
const ChartJS = ({ data, colorPallete }: ChartJSProps) => {
  const calculatePercentage = (data: { x: string; y: number }[]) => {
    const total = data.reduce((acc, cur) => acc + cur.y, 0);
    return data.map((d) => ({
      ...d,
      percent: Math.round((d.y / total) * 100),
    }));
  };

  return (
    <div className="chartjs">
      <VictoryPie
        data={data}
        labels={calculatePercentage(data).map((d) => `${d.x} (${d.percent}%)`)}
        colorScale={colorPallete.map((c) => c.color)}
        radius={100}
        animate={{
          duration: 2000,
        }}
      />
      <div className="chart-color-identify">
        {colorPallete.map((c) => (
          <div className="chartjs__item" key={c.name}>
            <div
              className="chartjs__item__color"
              style={{
                backgroundColor: c.color,
                width: "14px",
                height: "14px",
                borderRadius: "4px",
              }}
            />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartJS;
