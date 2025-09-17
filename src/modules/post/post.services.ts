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
const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
  sortedBy = "",
  sortedOrder
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortedBy?: string;
  sortedOrder?:string
}) => {
  console.log(page, limit);
  const skip = (page - 1) * limit;
  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      (tags && tags.length > 0) && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy:{
      [sortedBy]: sortedOrder
    }
  });
  const total = await prisma.post.count({where})
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total/limit )
    }
  };
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
