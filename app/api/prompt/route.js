import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const posts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts ", { status: 500 });
  }
};
