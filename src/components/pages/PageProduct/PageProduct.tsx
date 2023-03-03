import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSingleProduct } from "~/queries/products";
import { formatAsPrice } from "~/utils/utils";

export default function PageProduct() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useSingleProduct(id);

  return (
    <>
      {!isLoading && product && (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            sx={{ pt: "56.25%" }}
            image={`https://source.unsplash.com/random?sig=${id}`}
            title="Image title"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Description: {product.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Count: {product.count}
            </Typography>
            <Typography>{formatAsPrice(product.price)}</Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
