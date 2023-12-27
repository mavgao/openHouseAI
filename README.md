# Display Community

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs dependencies first.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Follow Up Question

If I were given more time, I would do the following upgrade:

### UI

#### To enhance the user experience by incorporating Material UI or Ant design framework.

#### To enhance the user experience by incorporating a loading indicator when the page is rendering data.

```TypeScript
const [isLoading, setIsLoading] =  useState<boolean>(true);
```

### Redux

#### As it is a simple web application, so I used `useState` and `useEffect` for state management. However, if the web app gets more complicated, I prefer to use Redux for state management.

##### Define a slice

```TypeScript
const initialState: CommunitiesState = {
  communities: [],
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<Community[]>) => {
      state.communities = action.payload;
    },
  },
});

export const { fetchData} = communitiesSlice.actions;
export default communitiesSlice.reducer;
```

#### Create thunk actions to handle async operations

```TypeScript
export const fetchAndProcessCommunities = () => async (dispatch: Dispatch) => {
  try {
    const fetchedCommunities: Community[] = await fetchCommunities();
    const fetchedHomes: Home[] = await fetchHomes();
    // Process the data as needed
    const processedData: Community[] = processCommunityHomes(fetchedCommunities, fetchedHomes);
    dispatch(fetchData(processedData));
  }
};
```

#### Use useDispatch and useSelector in Your Component

```TypeScript
export interface CommunitiesState {
  communities: Community[];
}

const dispatch = useDispatch();
const { communities} = useSelector(
    (state: { communities: CommunitiesState }) => state.communities
  );

useEffect(() => {
    dispatch(fetchAndProcessCommunities());
  }, [dispatch]);
```
