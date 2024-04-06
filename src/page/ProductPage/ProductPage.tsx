import SalesLineChart from "../../components/SalesLineChart/SalesLineChart";
import SalesTable from "../../components/SalesTable/SalesTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import "./ProductPage.css"
import { fetchProductData } from "../../state/sales/salesSlice";
import { AppDispatch} from "../../state/store";


export default function ProductPage() {
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
      dispatch(fetchProductData());
    }, [dispatch]);

    return (
        <div className="product-page-container">
            <div className="product-page-left">
                <ProductDescription />
            </div>
            <div className="product-page-right">
                <SalesLineChart />
                <SalesTable />
            </div>
        </div>
    );
}
