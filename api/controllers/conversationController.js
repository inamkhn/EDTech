import ErrorHandler from "../utils/errorHandler.js"; 
import Conversation from "../models/conversationModel.js";


export const createConverstion = async(req,res)=>{
    try{
      const conversation = await Conversation.create({
        members:[req.body.senderId,req.body.receiverId]
      })
      res.status(200).json({
        success:true,
        data:conversation
      })
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
}

export const userConverstion = async(req,res)=>{
    try{
      const userConversation = await Conversation.find({
        members:{$in:[req.params.id]}
      })
      res.status(200).json({
        success:true,
        data:userConversation
      })
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
}


export const usersConverstion = async(req,res)=>{
    // const firstUser = req.params.id
    // const secondUser = req.params.id
    try{
      const usersConversation = await Conversation.find({
        members:{$in:[req.params.firstuser,req.params.secondUser]}
      })
      res.status(200).json({
        success:true,
        data:usersConversation
      })
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
}

