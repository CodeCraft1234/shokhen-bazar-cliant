import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { title, price } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [deliveryCharge, setDeliveryCharge] = useState(100);

  if (!product) {
    return (
      <div className="bg-white p-6 mt-6 rounded-lg shadow-lg text-center">
        কোন প্রোডাক্ট নেই
        <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800">
            অন্যান্য পণ্য দেখতে ক্লিক করুন
          </button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleDeliveryChange = (charge) => {
    setDeliveryCharge(charge);
  };

  const productPrice = parseInt(
    product?.price.replace("৳", "").replace(",", "")
  );
  const subTotal = productPrice * quantity;
  const totalAmount = subTotal + deliveryCharge;

  const handleOrderConfirm = () => {
    const orderId = `DN${Math.floor(Math.random() * 1000) + 500}`; // Generate a random order ID
    // Display SweetAlert success message
    Swal.fire({
      icon: "success",
      title: "Order Confirmed!",
      text: `Your order with ID ${orderId} has been successfully placed.`,
      confirmButtonText: "OK",
    });
    navigate("/order-success", {
      state: { orderId, totalAmount },
    });
  };

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 mt-96">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-medium mb-4">
          অর্ডারটি কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার, দিয়ে{" "}
          <span className="text-red-600">অর্ডার কনফার্ম করুন </span>বাটনে ক্লিক
          করুন
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">আপনার নাম</label>
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              আপনার মোবাইল নাম্বার
            </label>
            <input
              type="text"
              placeholder="আপনার মোবাইল নাম্বার"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              আপনার সম্পূর্ণ ঠিকানা
            </label>
            <input
              type="text"
              placeholder="আপনার সম্পূর্ণ ঠিকানা"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">কুরিয়ার চার্জ</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryCharge === 100}
                  onChange={() => handleDeliveryChange(100)}
                  className="mr-2"
                />
                ঢাকার বাইরে 100 টাকা
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryCharge === 60}
                  onChange={() => handleDeliveryChange(60)}
                  className="mr-2"
                />
                ঢাকার ভিতরে 60 টাকা
              </label>
            </div>
          </div>
          <button
            onClick={handleOrderConfirm}
            type="button"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-900"
          >
            অর্ডার কনফার্ম করুন
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full mb-4 border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Product</th>
              <th className="border p-2 text-left">Price</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">{title}</td>
              <td className="border p-2">{price}</td>
              <td className="border p-2 flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-300 p-1 rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-300 p-1 rounded"
                >
                  +
                </button>
              </td>
              <td className="border p-2">{subTotal} টাকা</td>
            </tr>
          </tbody>
        </table>
        <div className="text-lg">
          <p>Sub-Total: {subTotal} টাকা</p>
          <p>Delivery Charges: {deliveryCharge} টাকা</p>
          <p>
            Total Amount:{" "}
            <span className="text-red-500 font-semibold">
              {totalAmount} টাকা
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;