const db = require("../models/index");
async function countComment(id) {
  try {
    const count = await db.Comment.count({
      where: {
        postId: id,
      },
    });
    return { count };
  } catch (error) {
    return res.status(500).json({ error: "Failed to getCountComment post" });
  }
}
async function getComment(id) {
  try {
    const getAll = await db.Comment.findAll({
      order: [["createdAt", "DESC"]],
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
    return { getAll };
  } catch (error) {
    return res.status(500).json({ error: "Failed to getComment post" });
  }
}
async function comment({ content, user_id, postId }, files) {
  try {
    const comment = await db.Comment.create({
      content,
      media: files,
      user_id,
      postId,
    });
    return { comment };
  } catch (error) {
    return res.status(500).json({ error: "Failed to comment post" });
  }
}

module.exports = {
  countComment,
  getComment,
  comment,
};
