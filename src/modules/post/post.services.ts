import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
  console.log({ payload });

  const createPost = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          picture: true
        },
      },
    },
  });
  return createPost;
};
const getAllPost = async () => {
  const result = await prisma.post.findMany();
  return result;
};
const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where:{
        id
    }
  });
  return result;
};

export const PostServices = {
  createPost,
  getAllPost,
  getPostById
};
