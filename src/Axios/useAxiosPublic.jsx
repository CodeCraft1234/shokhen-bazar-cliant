import axios from "axios";

const AxiosPublic=axios.create({
    baseURL:'https://hirikbazar.vercel.app'
})
const useAxiosPublic = () => {
    return AxiosPublic
};

export default useAxiosPublic;