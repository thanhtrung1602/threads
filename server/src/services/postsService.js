const { where } = require("sequelize");
const db = require("../models/index");

async function getMediaPost(id) {
  try {
    const getMedia = await db.Media.findAll({
      where: {
        post_id: id,
      },
    });
    return { getMedia };
  } catch (error) {
    throw error;
  }
}

async function unLiked({ status, user_id, postId }) {
  try {
    const unLike = await db.Like.destroy({
      where: {
        user_id,
        postId,
      },
    });
    return { unLike };
  } catch (error) {}
}

async function getStatusLike(id) {
  try {
    const status = await db.Like.findAll({
      where: {
        postId: id,
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { status };
  } catch (error) {}
}

async function getCountLike(id) {
  try {
    const count = await db.Like.count({
      where: {
        postId: id,
      },
    });
    return { count };
  } catch (error) {}
}

async function liked({ status, user_id, postId }) {
  try {
    const liked = await db.Like.findOrCreate({
      where: {
        user_id,
        postId,
      },
      defaults: {
        status,
        user_id,
        postId,
      },
    });
    return { liked };
  } catch (error) {}
}

async function getOnePost(id) {
  try {
    const getPostId = await db.Post.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getPostId };
  } catch (error) {
    return res.status(500).json({ error: "Failed to findOne post" });
  }
}

async function getAllPostUser(id) {
  try {
    const getAll = await db.Post.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        user_id: id,
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getAll };
  } catch (error) {
    return res.status(500).json({ error: "Failed to findOne post" });
  }
}

async function getAllPost() {
  try {
    const getAll = await db.Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "userData",
        },
      ],
    });
    return { getAll };
  } catch (error) {
    return res.status(500).json({ error: "Failed to findAll post" });
  }
}

// async function mediaPost({ post_id }, files) {
//   try {
//     const imgPromise = await db.Media.create({
//       image: files,
//       post_id: post_id,
//     });
//     return { imgPromise };
//   } catch (error) {
//     res.status(500).json({ error: "Failed to upload post" });
//   }
// }

async function post({ content, user_id }, files) {
  try {
    const newPost = await db.Post.create({
      content,
      user_id,
    });

    if (files && files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          await db.Media.create({
            media: file.path,
            post_id: newPost.id,
          });
        })
      );
    }

    return { newPost };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to upload post");
  }
}

async function delPost(id) {
  try {
    const delPost = await db.Post.destroy({
      where: {
        id,
      },
    });
    return { delPost };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  unLiked,
  getCountLike,
  liked,
  getOnePost,
  getAllPostUser,
  getAllPost,
  post,
  getStatusLike,
  delPost,
  getMediaPost,
  // mediaPost,
};
