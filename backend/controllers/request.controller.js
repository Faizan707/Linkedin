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

// export const getReceivedFriendRequests = async (req, res) => {
//   const receiverId = req.user.userId;

//   try {
//     const requests = await FriendRequest.find({ receiver: receiverId }).populate('sender', 'name');
//     const formattedRequests = requests.map(request => ({
//       requestId: request._id,
//       senderName: request.sender.name,
//       status: request.status 
//     }));

//     res.status(200).json(formattedRequests);
//   } catch (error) {
//     console.error("Error fetching received friend requests:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// export const getSentFriendRequests = async (req, res) => {
//   const senderId = req.user.userId; 

//   try {
//     const requests = await FriendRequest.find({ sender: senderId })
//       .populate('receiver', 'name'); 

//     const formattedRequests = requests.map(request => ({
//       requestId: request._id,
//       receiverName: request.receiver.name,
//       status: request.status 
//     }));

//     res.status(200).json(formattedRequests);
//   } catch (error) {
//     console.error("Error fetching sent friend requests:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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
