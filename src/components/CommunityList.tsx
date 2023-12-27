import { Community } from "../interfaces/interfaces";

interface CommunityListProps {
  communities: Community[];
}
const CommunityList: React.FC<CommunityListProps> = ({ communities }) => {
  return (
    <section className="places-category">
      <h2>Communities</h2>
      <ul className="places">
        {communities.map((community: Community) => (
          <li key={community.id} className="place-item">
            <img src={community.imgUrl} alt={community.name} />
            <h3>{community.name}</h3>
            <p>Average Price: ${community.averagedPrice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommunityList;
