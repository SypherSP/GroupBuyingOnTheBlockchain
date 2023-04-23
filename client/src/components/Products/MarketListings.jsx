import Listing from "./Listing";

function MarketListings() {
  return (
    <Listing
      imageUrl="https://casiofanmag.com/wp-content/uploads/2022/04/ga-2100-utility-black-collection-7-1200x1198.jpg"
      name="Sample Product"
      description="This is a sample product description."
      retailPrice={100}
      price={75}
      contact="+91 91384929109"
      currentSubscription={90}
      maxSubscription={200}
      onSubscribe={() => console.log("Subscribed!")}
    />
  );
}

export default MarketListings;
