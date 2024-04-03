import PostForm from '@/components/forms/PostForm'
import Loader from '@/components/ui/shared/Loader'
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { useParams } from 'react-router-dom'


const EditPost = () => {

  const {id} = useParams()

  const {data : post, isPending} = useGetPostById(id || "")

  if(isPending) return <Loader/>

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start justify-start w-full gap-3'>
          <img src="/assets/icons/add-post.svg"
          height={36}
          width={36}
          alt="add" />

        <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>

        </div>

        <PostForm action="update" post={post}/>

      </div>
    </div>
  )
}

export default EditPost
