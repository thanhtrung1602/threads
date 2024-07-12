const { where } = require("sequelize");
const db = require("../models/index");
const { Op } = require("sequelize");
async function getFollow(id) {
  try {
    const allFollow = await db.Follow.findAll({
      where: {
        followingId: id,
      },
    });
    return { allFollow };
  } catch (error) {}
}
async function countFollowing(id) {
  try {
    const countFollowing = await db.Follow.count({
      where: {
        followerId: id,
      },
    });
    return { countFollowing };
  } catch (error) {}
}
async function countFollower(id) {
  try {
    const countFollower = await db.Follow.count({
      where: {
        followingId: id,
      },
    });
    return { countFollower };
  } catch (error) {
    throw error;
  }
}
async function unFollow({ followerId, followingId }) {
  try {
    const unFollow = await db.Follow.destroy({
      where: {
        followerId,
        followingId,
      },
    });
    return { unFollow };
  } catch (error) {
    throw error;
  }
}
async function follow({ followerId, followingId }) {
  try {
    const followUser = await db.Follow.findOrCreate({
      where: {
        followerId,
        followingId,
      },
      defaults: {
        followerId,
        followingId,
      },
    });
    return { followUser };
  } catch (error) {
    throw error;
  }
}
async function updateUser(
  id,
  { idUser, username, story, link },
  file,
  updatingIdUser
) {
  const transaction = await db.sequelize.transaction();

  try {
    // Update user with transaction
    const [affectedRows, updatedUsers] = await db.User.update(
      {
        idUser,
        image: file,
        username,
        story,
        link,
      },
      {
        where: {
          idUser: id,
        },
        returning: true,
        plain: true,
        transaction,
      }
    );

    if (affectedRows === 0) {
      throw new Error("No rows updated");
    }

    // Fetch the updated user data
    const updatedUser = await db.User.findOne({
      where: { idUser },
      transaction,
    });

    // If idUser is being updated, update user_id in related posts with transaction
    if (updatingIdUser) {
      await db.Post.update(
        { user_id: updatingIdUser },
        {
          where: {
            user_id: id,
          },
          transaction,
        }
      );

      await db.Comment.update(
        { user_id: updatingIdUser },
        { where: { user_id: id }, transaction }
      );
    }

    // Commit the transaction
    await transaction.commit();
    return updatedUser;
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    throw error;
  }
}
async function getMe(id) {
  try {
    const detailUser = await db.User.findOne({
      where: {
        idUser: id,
      },
    });
    return { detailUser };
  } catch (error) {}
}
async function allUser() {
  try {
    const user = await db.User.findAll();
    return { user };
  } catch (error) {}
}

async function search(q) {
  try {
    const search = await db.User.findAll({
      where: {
        idUser: {
          [Op.like]: `%${q}%`,
        },
        username: {
          [Op.like]: `%${q}%`,
        },
      },
    });
    return { search };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getFollow,
  countFollowing,
  countFollower,
  unFollow,
  follow,
  updateUser,
  getMe,
  allUser,
  search,
};
