import axios from "axios";
import { Community, Home } from "../interfaces/interfaces";

const communitiesURL = "/api/openhouse-ai-fe-coding-test/communities.json";
const homesURL = "/api/openhouse-ai-fe-coding-test/homes.json";

export const fetchCommunities = (): Promise<Community[]> =>
  axios
    .get(communitiesURL)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching communities:", error);
      throw error;
    });

export const fetchHomes = (): Promise<Home[]> =>
  axios
    .get(homesURL)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      throw error;
    });
