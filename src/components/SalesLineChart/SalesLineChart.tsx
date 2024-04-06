import { LinePlot,  ResponsiveChartContainer } from "@mui/x-charts";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "./SalesLineChart.css"

const Month = [
    "JAN","FEB","MAR","APR","MAY","JUNE","JUL","AUG","SEP","OCT","NOV","DEC"
]

export default function SalesLineChart() {
    const productSalesData = useSelector((state: RootState) => state.sales.productDetails.sales);
    const retailproductSalesData = productSalesData.map(data => data.retailSales);
    const wholesaleproductSalesData = productSalesData.map(data => data.wholesaleSales);
    const xAxesData = productSalesData.map(data => new Date(data.weekEnding).toISOString());

    return (
        <Box className="sales-chart-container">
            <h3 className="chart-title">
                Retail Sales
            </h3>
            <ResponsiveChartContainer
                series={[
                    {
                        type: "line",
                        data: retailproductSalesData, 
                        color: "#03a9f4"
                    },
                    {
                        type: "line",
                        data: wholesaleproductSalesData, 
                        color: "lightgrey"
                    },
                ]}
                xAxis={[
                    {
                        data: xAxesData, 
                        scaleType: "band",
                        id: "x-axis-id",
                    },
                ]}
                height={400}
            >
                <LinePlot />
            </ResponsiveChartContainer>
            <hr />
            <Box className="month-container">
                {
                    Month.map((id)=>{
                        return (
                            <div>
                                {id}
                            </div>
                        )
                    })
                } 
            </Box>
        </Box>
    );
};
