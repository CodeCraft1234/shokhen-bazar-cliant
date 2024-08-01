import axios from "axios";

const AxiosPublic=axios.create({
 
    baseURL:'https://shokher-bazar.vercel.app'
})
const useAxiosPublic = () => {
    return AxiosPublic
};

export default useAxiosPublic;