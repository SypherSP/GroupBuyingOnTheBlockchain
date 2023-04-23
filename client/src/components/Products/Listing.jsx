import React, { useState } from "react";
import { getPhotoUrl } from "./pexelsAPI";

function Listing({
  name,
  description,
  retailPrice,
  price,
  contact,
  currentSubscription,
  maxSubscription,
  onSubscribe,
}) {
  const [quantity, setQuantity] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const imageUrl = getPhotoUrl(name);
  const discount = parseFloat(
    ((retailPrice - price) / retailPrice) * 100
  ).toFixed(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    setTotalSavings((retailPrice - price) * newQuantity);
    setTotalPrice(price * newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantityChange({ target: { value: newQuantity } });
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      handleQuantityChange({ target: { value: newQuantity } });
    }
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-xl md:flex-row md:max-w-xl hover:bg-gray-100">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={imageUrl}
          alt={name}
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center">
            <div className="mb-2 mr-1 text-2xl font-bold tracking-tight text-gray-900">
              {name}
            </div>
            <div className="mb-3 font-medium text-gray-800">{description}</div>
          </div>
          <div className="flex items-center">
            <div className="text-xl mr-2 text-green-600">-{discount}%</div>
            <div className="text-xl font-bold">${price}</div>
          </div>
          <div>Contact Manufacturer: {contact}</div>
          <div className="flex content-center">
            <div className="mr-1">
              {currentSubscription}/{maxSubscription}
            </div>
            <div>subscribed</div>
          </div>
          <div className="flex justify-between">
            <div className="flex content-center">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-l-md hover:bg-gray-300"
              >
                -
              </button>
              <input
                className="w-12 text-center border-t border-b border-gray-200"
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                placeholder="0"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 text-gray-700 font-semibold py-1 px-2 rounded-r-md hover:bg-gray-300"
              >
                +
              </button>
              <div className="text-xl ml-2">${totalPrice.toFixed(2)}</div>
            </div>
            <div>total savings: ${totalSavings.toFixed(2)}</div>
          </div>
          <div className="mt-2">
            <button
              type="button"
              onClick={onSubscribe}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
