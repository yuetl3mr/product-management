const RoomChat = require("../../models/rooms-chat-model");
const User = require("../../models/user-model");

module.exports = (req, res) => {
  const userIdA = res.locals.user.id;

  _io.once("connection", (socket) => {
    
    socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
      const existUserAInB = await User.findOne({
        _id: userIdB,
        acceptFriends: userIdA
      });

      if(!existUserAInB) {
        await User.updateOne({
          _id: userIdB
        }, {
          $push: {
            acceptFriends: userIdA
          }
        });
      }

      const existUserBInA = await User.findOne({
        _id: userIdA,
        requestFriends: userIdB
      });

      if(!existUserBInA) {
        await User.updateOne({
          _id: userIdA
        }, {
          $push: {
            requestFriends: userIdB
          }
        });
      }

      const infoB = await User.findOne({
        _id: userIdB
      });
      
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        length: infoB.acceptFriends.length,
        userId: userIdB
      });

      const infoA = await User.findOne({
        _id: userIdA
      }).select("id fullName avatar");

      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userIdB: userIdB,
        infoA: infoA
      });

      socket.broadcast.emit("SERVER_RETURN_ID_ACCEPT_FRIEND", {
        userIdA: userIdA,
        userIdB: userIdB
      })
    })

    socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
      const existUserAInB = await User.findOne({
        _id: userIdB,
        acceptFriends: userIdA
      });

      if(existUserAInB) {
        await User.updateOne({
          _id: userIdB
        }, {
          $pull: {
            acceptFriends: userIdA
          }
        });
      }

      const existUserBInA = await User.findOne({
        _id: userIdA,
        requestFriends: userIdB
      });

      if(existUserBInA) {
        await User.updateOne({
          _id: userIdA
        }, {
          $pull: {
            requestFriends: userIdB
          }
        });
      }

      const infoB = await User.findOne({
        _id: userIdB
      });
      
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        length: infoB.acceptFriends.length,
        userId: userIdB
      });

      socket.broadcast.emit("SERVER_RETURN_ID_CANCEL_FRIEND", {
        userIdA: userIdA,
        userIdB: userIdB
      });
    })

    socket.on("CLIENT_REFUSE_FRIEND", async (userIdB) => {
      const existUserBInA = await User.findOne({
        _id: userIdA,
        acceptFriends: userIdB
      });

      if(existUserBInA) {
        await User.updateOne({
          _id: userIdA
        }, {
          $pull: {
            acceptFriends: userIdB
          }
        });
      }

      // Xóa id của A trong requestFriends của B
      const existUserAInB = await User.findOne({
        _id: userIdB,
        requestFriends: userIdA
      });

      if(existUserAInB) {
        await User.updateOne({
          _id: userIdB
        }, {
          $pull: {
            requestFriends: userIdA
          }
        });
      }

    })
    // Hết Chức năng từ chối kết bạn

    // Chức năng chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userIdB) => {
      try {
        // Tạo phòng chat chung
        const roomChat = new RoomChat({
          typeRoom: "friend",
          users: [
            {
              userId: userIdA,
              role: "superAdmin"
            },
            {
              userId: userIdB,
              role: "superAdmin"
            }
          ],
        });

        await roomChat.save();

        const existUserBInA = await User.findOne({
          _id: userIdA,
          acceptFriends: userIdB
        });

        if(existUserBInA) {
          await User.updateOne({
            _id: userIdA
          }, {
            $push: {
              friendsList: {
                userId: userIdB,
                roomChatId: roomChat.id
              }
            },
            $pull: {
              acceptFriends: userIdB
            }
          });
        }

        const existUserAInB = await User.findOne({
          _id: userIdB,
          requestFriends: userIdA
        });

        if(existUserAInB) {
          await User.updateOne({
            _id: userIdB
          }, {
            $push: {
              friendsList: {
                userId: userIdA,
                roomChatId: roomChat.id
              }
            },
            $pull: {
              requestFriends: userIdA
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    })

  });
}