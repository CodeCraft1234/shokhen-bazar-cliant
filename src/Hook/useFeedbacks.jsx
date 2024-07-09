import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";
const useFeedbacks = () => {
    const AxiosPublic=useAxiosPublic()
    const { refetch, data: feedbacks=[]}=useQuery({
        queryKey:['/feedbacks'],
        queryFn: async () => {
            const res=await AxiosPublic.get(`/feedbacks`)
            return res.data
        }
    })
        console.log(feedbacks)
        return [feedbacks,refetch]
      
};
export default useFeedbacks;