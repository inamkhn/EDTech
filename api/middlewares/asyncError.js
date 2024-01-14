export const asyncError = (passfunction) => (req,res,next)=>{
     Promise.resolve(passfunction(req,res,next)).catch(next())
}