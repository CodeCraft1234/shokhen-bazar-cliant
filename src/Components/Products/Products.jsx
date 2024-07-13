import useProducts from "../../Hook/useProducts";
import { useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";

const Product = () => {
  const [products] = useProducts(); // Assuming useProducts hook fetches all products
  const [activeTab, setActiveTab] = useState(""); // State to keep track of the active tab
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of the current page
  const [itemsPerPage] = useState(30); // Number of items to display per page
  const [searchQuery, setSearchQuery] = useState(""); // State to keep track of the search query
console.log(products);
  const handleTabClick = (category) => {
    setActiveTab(category);
    setCurrentPage(1); 
  };

 
  const filteredProducts = products
    .filter((product) => (activeTab ? product.category === activeTab : true))
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.currentTime) - new Date(a.currentTime)); // Sort by currentTime, latest first

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-5 ">
      
      {/* Tabs for sorting */}
      <div className="mb-4 flex flex-wrap justify-between mx-auto items-center ">
  <div className="grid  sm:ml-4 grid-cols-4  md:grid-cols-8 justify-center items-center  lg:grid-cols-8 gap-1">
    <button
      className={` mb-2 py-2 px-4 rounded-full  hover:bg-[#FF7701] focus:outline-none ${activeTab === "" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
      onClick={() => handleTabClick("")}
    >
      All
    </button>
    <button
      className={` mb-2 py-2 px-4 rounded-full hover:bg-[#FF7701] focus:outline-none ${activeTab === "skincare" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
      onClick={() => handleTabClick("চুলের যত্ন")}
    >
    চুলের যত্ন
    </button>
    <button
      className={` mb-2 py-2 px-4 rounded-full hover:bg-[#FF7701]0 focus:outline-none ${activeTab === "makeup" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
      onClick={() => handleTabClick("ত্বকের যত্ন")}
    >
     ত্বকের যত্ন
    </button>
    <button
      className={` mb-2 py-2 px-4 rounded-full hover:bg-[#FF7701] focus:outline-none ${activeTab === "fragrance" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
      onClick={() => handleTabClick("মাজুফল")}
    >
     মাজুফল
    </button>
    <button
      className={` mb-2 py-2 px-4 rounded-full hover:bg-[#FF7701] focus:outline-none ${activeTab === "haircare" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
      onClick={() => handleTabClick("মুখের যত্ন")}
    >
     মুখের যত্ন
          
    </button>
    <button
      className={`py-2 mb-2 px-4 rounded-full hover:bg-[#FF7701] focus:outline-none ${activeTab === "nailcare" ? 'bg-blue-500 text-white' : 'bg-green-600 text-white'}`}
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
      className="lg:w-full w-full sm:w-auto mb-4 sm:mb-0 py-2 px-4 rounded-full border bg-gray-300 border-black text-black font-bold"
    />
  </div>
</div>

      {/* Product grid */}


      {filteredProducts.length === 0 ? (
                <div className="flex justify-center items-center mt-12">
                    <div>
                        <h1 className="text-lg font-bold text-red-600">No product available</h1>
                    </div>
                </div>
            ) : (

      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  mt-1">

     

        {currentItems.map((item) => (
          <ProductCard key={item._id} item={item}></ProductCard>
        ))}
      </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center my-10">
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => (
            <li key={i} className={`inline-block mx-1`}>
              <button 
                onClick={() => paginate(i + 1)} 
                className={`text-lg px-4 py-2 rounded-lg 
                ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'} 
                transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
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

export default Product;
