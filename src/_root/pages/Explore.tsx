import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import SearchResults from "@/components/ui/shared/SearchResults";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { Models } from 'appwrite'

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, hasNextPage, fetchNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debounceValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  const shouldShowSearchResults = searchValue !== "";

  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex flex-1 w-full px-4 rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full mt-16 mb-7 max-w-5xl">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div className="flex flex-wrap w-full gap-9 max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents ?? []}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) =>
            item && item.documents ? (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ) : (
              <p
                key={`page-${index}`}
                className="text-light-4 mt-10 text-center w-full"
              >
                No documents available
              </p>
            )
          )
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
