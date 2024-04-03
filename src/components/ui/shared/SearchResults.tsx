import { Models } from 'appwrite'
import Loader from './Loader'
import GridPostList from './GridPostList'

type searchResultsProps = {
  isSearchFetching : boolean,
  searchedPosts : Models.Document[]
}

const SearchResults = ({isSearchFetching, searchedPosts} : searchResultsProps) => {

  if(isSearchFetching) return <Loader />

  if(searchedPosts && searchedPosts.documents.length > 0) {
    
      return (
        <GridPostList posts={searchedPosts.documents} />
      )
  }



  return (
    <p className='text-center text-light-4 w-full mt-10'>No Results Found!</p>
  )
}

export default SearchResults
