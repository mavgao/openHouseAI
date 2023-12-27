import { useEffect, useState, useCallback } from "react";
import "./App.css";
import { fetchCommunities, fetchHomes } from "./services/api";
import CommunityList from "./components/CommunityList";
import { Community, Home } from "./interfaces/interfaces";

function App() {
  const [communities, setCommunities] = useState<Community[]>([]);

  function sortCommunitiesByName(communities: Community[]) {
    return [...communities].sort((a, b) => a.name.localeCompare(b.name));
  }

  function processCommunityHomes(communities: Community[], homes: Home[]) {
    return communities.map((community) => {
      const communityHomes = homes.filter(
        (home) => home.communityId === community.id
      );
      const averagedPrice = calculateAveragedPrice(communityHomes);
      return {
        ...community,
        averagedPrice:
          communityHomes.length > 0 ? averagedPrice.toFixed(0) : "0",
      };
    });
  }

  function calculateAveragedPrice(homes: Home[]) {
    return homes.reduce((acc, curr) => acc + curr.price, 0) / homes.length;
  }

  const fetchAndProcessCommunities = useCallback(async () => {
    try {
      const fetchedCommunities = await fetchCommunities();
      const sortedCommunities = sortCommunitiesByName(fetchedCommunities);
      const fetchedHomes = await fetchHomes();
      const sortedCommunityHomes = processCommunityHomes(
        sortedCommunities,
        fetchedHomes
      );
      return sortedCommunityHomes;
    } catch (error) {
      console.error("Error fetching communities:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchCommunityListData = async () => {
      const communities = await fetchAndProcessCommunities();
      setCommunities(communities);
    };

    fetchCommunityListData();
  }, [fetchAndProcessCommunities]);

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
