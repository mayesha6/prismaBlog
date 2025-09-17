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

const getBlogStats = async () => {
  return await prisma.$transaction(async (tx) => {
    const aggregates = await tx.post.aggregate({
      _count: true,
      _sum: {views:true},
      _avg: {views:true},
      _min: {views:true},
      _max: {views:true}
    })
    const feturedCount = await tx.post.count({
      where:{
        isFeatured : true
      }
    })
    const topFetured = await tx.post.findFirst({
      where:{
        isFeatured : true
      },
      orderBy:{
        views: "desc"
      }     
    })

    const today = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(today.getDate()-7)
    const lastWeekPostCount = await tx.post.count({
      where:{
        createdAt : {
          gte : lastWeek
        }
      }     
    })

    return {
      stats: {
        totalPosts : aggregates._count ?? 0,
        totalViews : aggregates._sum.views ?? 0,
        averageView : aggregates._avg.views ?? 0,
        minimumView : aggregates._min.views ?? 0,
        maximumView : aggregates._max.views ?? 0,
      },
      featured:{        
        count : feturedCount,
        topFetured: topFetured
      },
      lastWeekPostCount
    }
  })
};
const getAllPost = async ({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
  sortedBy = "",
  sortedOrder,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortedBy?: string;
  sortedOrder?: string;
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
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };
  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      [sortedBy]: sortedOrder,
    },
  });
  const total = await prisma.post.count({ where });
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

const getPostById = async (id: number) => {
  const findPost = await prisma.$transaction(async (tx) => {
    const updateViews = await prisma.post.update({
    where: {id},
    data: {
      views: {
        increment : 1
      }
    }
  }) 
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select:{
            id:true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            posts: true
        },
      }      
    },
  });
  return result
  })
  return findPost;
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
  getBlogStats
};
