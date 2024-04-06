import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import "./ProductDescription.css"
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function ProductDescription() {
    const productDatails = useSelector((state: RootState) => state.sales.productDetails);

    return (
        <Box className="product-details-container">
            <img className="product-image" src={productDatails?.image} alt={productDatails?.title}/>
            <h2>{productDatails?.title}</h2>
            <a className="product-details">{productDatails?.details}</a>
            <hr />
            <Stack direction="row" spacing={2} className="tag-area">
                {productDatails?.tags.map((tag, index)=>{
                    return(
                        <div className="tag" key={index}>
                            {tag}
                        </div>
                    )
                })}
            </Stack>
            <hr />
        </Box>
        
    );
};
