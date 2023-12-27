import { useEffect, useState } from "react";
import "./App.css";
import { fetchCommunities, fetchHomes } from "./services/api";
import CommunityList from "./components/CommunityList";
import { Community, Home } from "./interfaces/interfaces";

function App() {
  const [communities, setCommunities] = useState<Community[]>([]);
  useEffect(() => {
    const fetchCommunityListData = async () => {
      try {
        const fetchedCommunities: Community[] = await fetchCommunities();
        const sortedCommunities: Community[] = [...fetchedCommunities].sort(
          (a, b) => a.name.localeCompare(b.name)
        );
        const fetchedHomes: Home[] = await fetchHomes();
        const sortedCommunityHomes = sortedCommunities.map((community) => {
          const communityHomes = fetchedHomes.filter((home) => {
            return home.communityId === community.id;
          });
          const averagedPrice =
            communityHomes.reduce((acc, curr) => acc + curr.price, 0) /
            communityHomes.length;
          return {
            ...community,
            averagedPrice:
              communityHomes.length > 0 ? averagedPrice.toFixed(0) : "0",
          };
        });
        setCommunities(sortedCommunityHomes);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunityListData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Community Panel</h1>
      </header>
      <main>
        <CommunityList communities={communities} />
      </main>
    </div>
  );
}

export default App;
