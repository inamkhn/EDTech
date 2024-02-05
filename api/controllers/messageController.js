import Message from "../models/messageModel.js";
import ErrorHandler from "../utils/errorHandler.js"; 

export const createChat = async(req,res)=>{
  const {conversationId,sender,text} = req.body
    try{
      const chat = await Message.create({
        conversationId,sender,text
      })
      res.status(200).json({
        success:true,
        data:chat
      })
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
}


export const chatId = async(req,res)=>{
    try{
      const Chat = await Message.find({
        members:{$in:[req.params.id]}
      })
      res.status(200).json({
        success:true,
        data:Chat
      })
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
}


