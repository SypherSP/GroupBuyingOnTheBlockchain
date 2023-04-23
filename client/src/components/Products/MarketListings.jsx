import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import Listing from "./Listing";

function MarketListings() {
  const { getAllGroups } = useContext(TransactionContext);
  const [listings, setListings] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await getAllGroups();
      setListings(listings);
    }
    fetchData();
  })
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
    <div>
      {listings && listings.length > 0 && listings.map((listing) => {
        <Listing 
          key={listing.groupID}
          imageUrl={undefined}
          name={listing.pID}
          description={listing.pID}
          retailPrice={listing.pID}
          price={listing.unitValue}
          contact={undefined}
          currentSubscription={listing.currentSubscription}
          maxSubscription={listing.maxSubscription}
        />
      })}
    </div>
  );
}

export default MarketListings;
