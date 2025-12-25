import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// get

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = await params;
    const post = await Prompt.findById(id).populate("creator");
    if (!post) return new Response("prompt not found", { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch this prompt ", { status: 500 });
  }
};

// patch
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const { id } = await params;
    const post = await Prompt.findById(id);
    if (!post) return new Response("prompt not found", { status: 404 });
    post.prompt = prompt;
    post.tag = tag;
    await post.save();
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    return new Response("failed to update this prompt ", { status: 500 });
  }
};

// delete
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = await params;
    await Prompt.findByIdAndDelete(id);
    return new Response("prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("failed to delete this prompt ", { status: 500 });
  }
};
