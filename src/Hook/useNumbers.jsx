import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useNumbers = () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: numbers=[]}=useQuery({
        queryKey:['numbers'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/numbers`)
            return res.data
        }
    })
        console.log(numbers)
        return [numbers,refetch]

};

export default useNumbers;