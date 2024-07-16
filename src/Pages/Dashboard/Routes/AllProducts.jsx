
import Swal from "sweetalert2";
import { useState} from "react";
import { Link } from "react-router-dom";
import useProducts from "../../../Hook/useProducts";
import useAxiosPublic from "../../../Axios/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AllProduct = () => {
  const [products, refetch] = useProducts();   
  const [activeTab, setActiveTab] = useState(""); // State to keep track of the active tab
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [itemsPerPage] = useState(30); // Number of items to display per page
  const [searchQuery, setSearchQuery] = useState(""); // State to keep track of the search query

  // Function to handle tab click and set active tab
  const handleTabClick = (category) => {
    setActiveTab(category);
    setCurrentPage(1); // Reset current page when tab changes
  };

  // Function to handle adding a product to cart
  const AxiosPublic = useAxiosPublic();

  // Filter products based on the active tab and search query
  const filteredProducts = products.filter((product) => {
    return (
      (activeTab ? product.category === activeTab : true) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Function to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete blog",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosPublic.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your blog has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  return (
  <div className="py-3 container mx-auto px-4">
  <Helmet>
    <title>বিশ্বস্ত-বাজার | AllProducts</title>
    <link rel="canonical" href="https://www.tacobell.com/" />
  </Helmet>
  <h2 className="text-3xl font-bold mb-6 text-center text-black">
                Total Products
            </h2>
  {/* Tabs for sorting */}
  <div className="mb-4 flex justify-center lg:justify-between items-center flex-wrap  gap-0 ">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-0">
        <button
          className={`mr-2 mb-2 py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("")}
        >
          All Pack
        </button>
        <button
          className={`mr-2 mb-2 py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "চুলের যত্ন" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("চুলের যত্ন")}
        >
          চুলের যত্ন
        </button>
        <button
          className={`mr-2 mb-2 py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "ত্বকের যত্ন" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("ত্বকের যত্ন")}
        >
          ত্বকের যত্ন
        </button>
        <button
          className={`mr-2 mb-2 py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "মাজুফল" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("মাজুফল")}
        >
          মাজুফল
        </button>
        <button
          className={`mr-2 mb-2 py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "মুখের যত্ন" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("মুখের যত্ন")}
        >
          মুখের যত্ন
        </button>
        <button
          className={`py-2 mb-2 px-4 rounded-full hover:bg-red-700 focus:outline-none ${activeTab === "লিপবাম" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
          onClick={() => handleTabClick("লিপবাম")}
        >
          লিপবাম
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-2 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search by product title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto mb-4 sm:mb-0 py-2 px-4 rounded-full  border bg-gray-300 border-black text-black font-bold"
        />
      </div>
    </div>
  {/* Product grid */}
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-1 ">
    {currentItems.map((product) => (
      <div
        key={product._id} // Ensure the key uses the correct identifier
        className="border rounded-lg overflow-hidden shadow-lg flex flex-col justify-between relative"
      >
 <Link className="flex flex-col h-full">
      <img
        className="w-full h-28 lg:h-48 md:h-44 transform transition-transform duration-500 hover:scale-110"
        src={product.image}
        alt=''
      />
      {product.discount > 0 && (
        <div className="rounded absolute ">
          <button className="bg-red-500 text-white text-xs font-bold px-2 py-1">
            {product.discount}%
          </button>
        </div>
      )}

      <div className="p-2 flex-grow flex flex-col">
        <h2 className=" text-base hover:text-blue-700 text-black hover:font-bold lg:text-lg">{product.title}</h2>
        <p className="text-red-300 text-base lg:text-lg flex justify-between font-medium">
          <span className="text-red-600 hover:text-blue-600 ">৳  {product.price}</span>{" "}
          {product.discount > 0 && (
            <span className="line-through text-gray-500">৳ 
              {parseFloat(product.price) + (product.price * product.discount) / 100}
            </span>
          )}
        </p>
      </div>
      </Link>
        <div className="">
          <div className=" flex justify-betweena gap-1 items-center text-center  ">
            <Link className="bg-blue-500 text-white px-2 py-2 rounded w-full"
              to={`/dashboard/admin/UpdateProducts/${product._id}`}
            >
              <button className="text-center">
                Update
              </button>
            </Link>
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-blue-500 text-white px-2 py-2 rounded w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  {/* Pagination */}
  <div className="flex justify-center mt-4">
    <nav className="">
      <ul className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
          <li key={i} className="page-item">
            <button onClick={() => paginate(i + 1)} className="page-link text-3xl btn">
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</div>

  );
};

export default AllProduct;

