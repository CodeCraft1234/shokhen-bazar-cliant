import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  return (
    <div className="bg-white flex justify-center items-center px-6 min-h-screen rounded-lg  text-center">
      <div className=" flex flex-col  items-center">
      <h1 className="text-3xl font-bold text-green-600">Order Place Successfully</h1>
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center">
        <p className="text-green-700 mb-4">
          আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। আমাদের কল সেন্টার থেকে ফোন করে আপনার অর্ডারটি কনফার্ম করা হবে।
        </p>
        <p className="text-lg font-semibold mb-2">অর্ডার নম্বর: <span className="text-red-500">{orderId}</span></p>
        <p className="text-lg font-semibold mb-4">অর্ডারের মোট মূল্য: {totalAmount} টাকা</p>
        <p className="text-red-600 mb-6">
          ফেইক অর্ডার শনাক্ত করতে আপনারদের IP অ্যাড্রেস আমরা রেখে দিচ্ছি। ফেইক অর্ডার করলে আমরা তার বিরুদ্ধে আইনগত পদক্ষেপ নিব।
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
            অন্যান্য পণ্য দেখতে ক্লিক করুন
          </button>
        </Link>
      </div>
    </div>
    </div>
    
  );
};

export default OrderSuccess;