import User from "../models/user.model.js";
import FriendRequest from "../models/request.model.js";

export const sendFriendRequest = async (req, res) => {
  const senderId = req.user.userId; 

  const { receiverId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    const newFriendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId
    });

    await newFriendRequest.save();
    res.status(200).json({ message: "Request created successfully" });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getAllFriendRequests = async (req, res) => {
  const userId = req.user.userId; 

  try {
    const sentRequests = await FriendRequest.find({ sender: userId })
      .populate('receiver', 'name'); 

    const receivedRequests = await FriendRequest.find({ receiver: userId })
      .populate('sender', 'name'); 

    const formattedSentRequests = sentRequests.map(request => ({
      requestId: request._id,
      receiverName: request.receiver.name,
      status: request.status
    }));

    const formattedReceivedRequests = receivedRequests.map(request => ({
      requestId: request._id,
      senderName: request.sender.name,
      status: request.status
    }));

    res.status(200).json({
      sentRequests: formattedSentRequests,
      receivedRequests: formattedReceivedRequests
    });
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const userId = req.user.userId;
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.receiver.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendRequest.sender } });
    await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: userId } });

    const updatedUser = await User.findById(userId)
      .populate('friends', '_id name')
      .lean()  
      .exec();
      console.log(updatedUser.friends)
    res.status(200).json({
      message: "Friend request accepted successfully",
      friends: updatedUser.friends,  
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

