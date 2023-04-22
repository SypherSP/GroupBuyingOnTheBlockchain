import React from "react";

function Listing() {
  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row md:max-w-xl hover:bg-gray-100">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://casiofanmag.com/wp-content/uploads/2022/04/ga-2100-utility-black-collection-7-1200x1198.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center">
            <div className="mb-2 mr-1 text-2xl font-bold tracking-tight text-gray-900">
              Name
            </div>
            <div className="mb-3 font-medium text-gray-800">Description</div>
          </div>
          <div className="flex items-center">
            <div className="text-xl mr-2 text-green-600">-x%</div>
            <div className="text-xl font-bold">$5</div>
          </div>
          <div>Contact Manufacturer: +91 91384929109</div>
          <div className="flex content-center">
            <div className="mr-1">90/200</div>
            <div>subscribed</div>
          </div>
          <div className="flex justify-between">
            <div className="flex content-center">
              <input
                className="w-12"
                type="number"
                id="quantity"
                name="quantity"
                min="0"
              />
              <div className="text-xl ml-2">$0</div>
            </div>
            <div>total savings</div>
          </div>
          <div className="mt-2">
            <button
              type="button"
              class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
