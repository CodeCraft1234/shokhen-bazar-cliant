import { Helmet } from "react-helmet-async";
import useOrders from "../../../Hook/useOrders";

const TotalCustomers = () => {
    const [orders] = useOrders();
    const customerDetails = orders.map(order => ({
        phone: order.phone, 
        address: order.address,
        name: order.name
    }));

    // Step 2: Remove duplicates using a Map to ensure unique phone numbers
    const uniqueCustomerDetailsMap = new Map();
    customerDetails.forEach(detail => {
        if (!uniqueCustomerDetailsMap.has(detail.phone)) {
            uniqueCustomerDetailsMap.set(detail.phone, detail);
        }
    });

    // Step 3: Convert the Map back to an array
    const uniqueCustomerDetails = Array.from(uniqueCustomerDetailsMap.values());

    return (
        <div className=" py-4 mx-4 text-black  ">
            <Helmet>
        <title>Shokher Bazar | TotalCustomers</title>
        <link rel="canonical" href="https://www.example.com/" />
      </Helmet>
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Total Unique Customers: {uniqueCustomerDetails.length}
            </h2>
            <div className="overflow-x-auto  border border-gray-400">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="text-black bg-green-300">
                        <tr className="text-center ">
                            <th className="py-2 border border-gray-500 px-4 border-b">SL</th>
                            <th className="py-2 border border-gray-500 px-4 border-b">Name</th>
                            <th className="py-2 border border-gray-500 px-4 border-b">Phone</th>
                            <th className="py-2 border border-gray-500 px-4 border-b">Address</th>
                        </tr>
                    </thead>
                    <tbody className="text-center ">
                        {uniqueCustomerDetails.map((customer, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="py-2 px-4 border border-gray-500 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border border-gray-500 border-b">{customer.name}</td>
                                <td className="py-2 px-4 border border-gray-500 border-b">{customer.phone}</td>
                                <td className="py-2 px-4 border border-gray-500 border-b">{customer.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalCustomers;
