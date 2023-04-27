import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import Listing from "./Listing";

function MarketListings() {
  const { getAllGroups, getAllProductFromProductID, joinGroupAndPay } = useContext(TransactionContext);
  const [listings, setListings] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      let data = await getAllGroups();
      data.map(async(list) => {
        let prod = await getAllProductFromProductID(list.pID);
        setProduct((prevData) => ({
          ...prevData,
          [list.pID]: prod
        }));
      });
      setListings(data);
    }
    fetchData();
  }, []);

  const handleSubscribe = async (totalPrice, units, groupID) => {
    console.log('handling subscribe');
    await joinGroupAndPay(groupID, units, totalPrice);
  };

  return (
    <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-6">
      {listings.map((listing) => (
        <div className="mt-4" key={listing.groupID}>
          {product[listing.pID] ? (
            <Listing
              // imageUrl="https://casiofanmag.com/wp-content/uploads/2022/04/ga-2100-utility-black-collection-7-1200x1198.jpg"
              name={product[listing.pID].name}
              description={product[listing.pID].description}
              retailPrice={Number(product[listing.pID].retailPrice.toString())}
              price={Number(listing.unitValue)}
              contact={undefined}
              groupID={listing.groupID}
              currentSubscription={listing.currentSubscription}
              maxSubscription={listing.maxSubscription}
              onSubscribe={(totalPrice, units) => handleSubscribe(totalPrice, units, listing.groupID)}
            />
          ) : (
            <div>Loading...</div> // Render a loading component or a message
          )}
        </div>
      ))}
    </div>
  );
}

export default MarketListings;
