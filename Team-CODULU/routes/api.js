var blogmodel=require('../models/blogmodel');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var secret='girlcoder';
module.exports=function(router)
{
    router.post('/signup',function(req,res)
    {
                console.log(req.body);
                var newUser= new blogmodel();
                newUser.email=req.body.email;
                newUser.password=req.body.password;
                newUser.userDetail.firstname=req.body.firstname;
                newUser.userDetail.lastname=req.body.lastname;
                 newUser.userDetail.gender=req.body.gender;
               if(req.body.firstname==""||req.body.lastname==""||req.body.email==""||req.body.password==""||req.body.gender=="")
               {
                 res.json({success:false,message:'ensure firstname,lastname,email,password and gender were provided'});
               }
               else
               { newUser.save(function(err)
                             { if(err)
                                res.json({success:false,message:'email or password already exist'});
                               else
                                res.json({success:true,message:'user created'});
                              });
               }
             });
    router.post('/login',function(req,res)
   { 
        blogmodel.findOne({email:req.body.email}).select('email password').exec(function(err,user)
        {
           var validPassword;
            if(err) throw err;
             console.log(user);
            if(!user)
            {
                res.json({success:false,message:'invalid email'});
            }
            else if(user)
                 {
                     if(req.body.password)
                     {     console.log(req.body.password);
                           console.log(user.password);
                       /* bcrypt.compare(req.body.password,user.password,function(err,res) {
                         validPassword=res;
                        });*/
                        /*var validPassword=bcrypt.compareSync(req.body.password,user.password);
                    */
                       /* var validPassword=user.confirmPassword(req.body.password);
                         console.log(validPassword);*/
                        bcrypt.compare(req.body.password,user.password,function(err,result){
                            console.log(err);
                            console.log("first"+result);
                         validPassword=result;
                         console.log(validPassword);
                    
                       console.log(validPassword);
                     if(!validPassword)
                     {
                         res.json({success:false,message:'invalid password'});
                     }
                     else
                     {
                       var token=jwt.sign({email:user.email},secret,{expiresIn:'24h'});
                       res.json({success:true,message:'successful login',token:token});  
                     }
                      }); 
                     }
                     else
                     {
                         res.json({success:false,message:'password not provided'});
                     }

                    
                 }
        });
    });
    router.use(function(req,res,next)
    {
        var token=req.body.token||req.body.query||req.headers['x-access-token'];
        if(token)
        {
          jwt.verify(token,secret,function(err,decoded)
                    {
                      if(err)
                      {
                          res.json({success:false,message:'Token Invalid'});
                      }
                      else
                      {
                         req.decoded=decoded;
                         next();
                      }
                    });    
        }
        else
        {
             res.json({success:false,message:'Token not provided'});
        }
    });
    router.post('/home',function(req,res)
    {
       res.send(req.decoded); 
    });
    
   
      router.post('/donateequip',function(req,res)
    {  blogmodel.update({email:req.body.email},
                {$push: {donateItem:{itemName:req.body.itemName,month:req.body.month,year:req.body.year,Description:req.body.description,equipfee:req.body.equipfee,
                                       isAvailable:false}}}
              ).then(function(succ,err)
                  {if(err)
                     {  console.log(err);
                        res.json({success:false,message:'failed to create new blog'});
                     }
                   else
                     {
                        res.json({success:true,message:'New blog created'});
                     }
                  });  
          
      }
    );
    router.get('/allequip',function(req,res)
    {   
    blogmodel.find({ "donateItem": { $elemMatch: { isAvailable:false} } } ,function(err,docs)
      {if(err) res.json(err);
        else{console.log(docs);              
           res.json(docs);}
       });
    });
 
    return router;
}

