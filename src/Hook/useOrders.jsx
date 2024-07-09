import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useOrders= () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: orders=[]}=useQuery({
        queryKey:['orders'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/orders`)
            return res.data
        }
    })
        console.log(orders)
        return [orders,refetch]
}

export default useOrders;