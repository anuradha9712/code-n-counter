const mongoose= require('mongoose');
const Schema=mongoose.Schema;
var bcrypt=require('bcrypt');
const saltRounds = 10;
const blogSchema= new Schema({
                               email:{type:String,required:true,unique:true,lowercase:true},
                               password:{type:String,required:true,unique:true},
                               donateItem:[
                                     { 
                                       itemName:String,
                                                     month:Number,
                                                     year:Number,
                                
                                       Description:String,
                                       buyer_email:String,
                                       equipfee:Number,
                                       isAvailable:Boolean
                                     }
                                     ],
                                donateMoney:[{
                                               amount:Number,
                                               receiver_email:String
                                            }],
                                needMoney:[
                                          {
                                             requested_amt:Number,
                                             received_amt:Number,
                                             donar_email:String
                                           }
                                          ],
                               buyItem:[
                                         {buyitemName:String
                                         }
                                        ],
                              userDetail:{firstname:{type:String,required:true},
                                            lastname:{type:String,required:true},
                                            gender:{type:String,required:true}
                                           }
                               
                            });
blogSchema.pre('save',function(next)
              {
                var user=this;
                bcrypt.hash(user.password,saltRounds,function(err,hash){
                   if(err) return next(err);
                    user.password=hash;
                    next();
                 });
             });
/*blogSchema.methods.confirmPassword=function(password)
{   var result;*/
    /*console.log(bcrypt.compareSync(password,this.password));
    return bcrypt.compareSync(password,this.password);*/
/*    bcrypt.compare(password,this.password,function(err,res){
       console.log("first"+res);
      result=res;
      
});
  console.log("second"+result);
 return result;
};*/
module.exports=mongoose.model('blogmodel',blogSchema,'blogcollection');