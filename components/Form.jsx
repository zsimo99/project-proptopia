import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
      </p>
      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea 
            value={post.prompt} 
            onChange={(e) => setPost({ ...post, prompt: e.target.value })} 
            required 
            placeholder="Write your prompt here..." 
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal text-gray-500">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input 
            value={post.tag} 
            onChange={(e) => setPost({ ...post, tag: e.target.value })} 
            required 
            placeholder="#tag" 
            className="form_input"
          />
        </label>
        <div className="flex-end gap-4 mx-3 mb-5">
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200">
            Cancel
          </Link>
          <button 
            className="px-6 py-2.5 text-sm bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-medium hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form