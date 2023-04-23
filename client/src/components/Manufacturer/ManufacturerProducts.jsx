import { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../../context/TransactionContext";

function ManufacturerProducts() {
  const { getProductsByManufacturer } = useContext(TransactionContext);
  const [products, setProducts] = useState();
  useEffect(() => {
    async function fetchData() {
      let data = await getProductsByManufacturer();
      setProducts(data);
    }
    fetchData();
  });
  return (
    <div className="flex justify-center">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-2xl font-semibold text-left text-gray-900 bg-white">
            Products
            <p className="mt-1 text-sm font-normal text-gray-500 ">
              All of your products registered on our platform.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Retail Value
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length !== 0 &&
              products.map((product) => {
                return (
                  <tr key={product.productID} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">
                      {product.retailPrice.toString()}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManufacturerProducts;
