import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useAddress = () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: address=[]}=useQuery({
        queryKey:['address'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/address`)
            return res.data
        }
    })
        console.log(address)
        return [address,refetch]

};

export default useAddress;