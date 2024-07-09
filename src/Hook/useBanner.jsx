import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useBanner = () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: banner=[]}=useQuery({
        queryKey:['banners'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/banners`)
            return res.data
        }
    })
        console.log(banner)
        return [banner,refetch]

};

export default useBanner;