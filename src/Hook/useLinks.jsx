import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useLinks= () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: links=[]}=useQuery({
        queryKey:['links'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/links`)
            return res.data
        }
    })
        console.log(links)
        return [links,refetch]

}
export default useLinks;