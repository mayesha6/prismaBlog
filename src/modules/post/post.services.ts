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
          picture: true,
        },
      },
    },
  });
  return createPost;
};
const getAllPost = async ({ page, limit }: { page: number; limit: number }) => {
  console.log(page, limit);
  const skip = (page - 1) * limit;
  const result = await prisma.post.findMany({
    skip,
    take: limit,
  });
  return result;
};
const getPostById = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return result;
};
const updatePostById = async (
  id: number,
  payload: Partial<Prisma.PostUpdateInput>
) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deletePostById = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PostServices = {
  createPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
};
