import{ notFound} from "next/navigation";
export default function ReviewDetail({
params,
}: {
params: { productid: string; reviewid: string};
}) {
if(parseInt(params.reviewid) > 1000) {
return notFound();
}
return(
<h1>
Review {params.reviewid}of product {params.productid}
</h1>
);
}