import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";
const useProducts= () => {

    const AxiosPublic=useAxiosPublic()
    const { refetch, data: products=[]}=useQuery({
        queryKey:['products'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/products`)
            return res.data
        }
    })
        console.log(products)
        return [products,refetch]

}
export default useProducts;