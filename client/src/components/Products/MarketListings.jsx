import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import Listing from "./Listing";

function MarketListings() {
  const { getAllGroups, getAllProductFromProductID, joinGroupAndPay } = useContext(TransactionContext);
  const [listings, setListings] = useState([]);
  const [product, setProduct] = useState();
  useEffect(() => {
    async function fetchData() {
      let data = await getAllGroups();
      data.map(async(list) => {
        let prod = await getAllProductFromProductID(list.pID);
        setProduct((prevData) => ({
          ...prevData,
          [list.pID]: prod
        })
      )})
      setListings(data);
    }
    fetchData();
  }, [product])
   
  const handleSubscribe = async (groupID, units, totalPrice) => {
    console.log('handling subscribe')
    await joinGroupAndPay(groupID, units, totalPrice);
  }
  return (
    // <Listing
    //   imageUrl="https://casiofanmag.com/wp-content/uploads/2022/04/ga-2100-utility-black-collection-7-1200x1198.jpg"
    //   name="Sample Product"
    //   description="This is a sample product description."
    //   retailPrice={100}
    //   price={75}
    //   contact="+91 91384929109"
    //   currentSubscription={90}
    //   maxSubscription={200}
    //   onSubscribe={() => console.log("Subscribed!")}
    // />
    <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-6">
      {(listings && product) && listings.map((listing) => (
        <div className="mt-4">
        <Listing
          key={listing.groupID}
          imageUrl="https://casiofanmag.com/wp-content/uploads/2022/04/ga-2100-utility-black-collection-7-1200x1198.jpg"
          name={product[listing.pID].name}
          description={product[listing.pID].description}
          retailPrice={Number(product[listing.pID].retailPrice.toString())}
          price={Number(listing.unitValue)}
          contact={undefined}
          groupID={listing.groupID}
          currentSubscription={listing.currentSubscription}
          maxSubscription={listing.maxSubscription}
          onSubscribe={(units, totalPrice) => handleSubscribe(listing.groupID,units,totalPrice)}
        />
        </div>
      ))}
    </div>
  );
}

export default MarketListings;
