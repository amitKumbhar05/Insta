import PostForm from '@/components/forms/PostForm'

const CreatePost = () => {
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

        <PostForm action='create'/>

      </div>
    </div>
  )
}

export default CreatePost
