
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";


const useLogo= () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: logo=[]}=useQuery({
        queryKey:['logos'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/logos`)
            return res.data
        }
    })
        console.log(logo)
        return [logo,refetch]

}
export default useLogo; 
