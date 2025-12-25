import PromptCard from '@components/PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      
      {data.length === 0 ? (
        <div className="mt-10 text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-500 text-lg">No prompts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map(post => (
            <PromptCard 
              key={post._id} 
              post={post} 
              handleDelete={() => handleDelete && handleDelete(post)} 
              handleEdit={() => handleEdit && handleEdit(post)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Profile