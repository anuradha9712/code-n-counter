
blgapp.factory("registerToServer",function($http)
              { var registerFactory={};
               registerFactory.postSignupObject=function(user)
               {
                   return $http.post('/api/signup',user);
               };
               return registerFactory;
             });
blgapp.factory("loginToServer",function($http,loginToken)
              {
                var loginFactory={};
                loginFactory.postLoginObject=function(user)
                {
                   return $http.post('/api/login',user).then(function(data)
                                                              {
                                                                loginToken.setToken(data.data.token);
                                                                return data;
                                                              });
                };
                loginFactory.isLoggedIn=function()
                {
                  if( loginToken.getToken())
                  {
                      return true;
                  }
                  else
                  {
                      return false;
                  }
                };
                
                return loginFactory;
              });
blgapp.factory("logoutToServer",function($http,loginToken)
             {
               var logoutFactory={};
               logoutFactory.logoutUser=function()
                 {
                      loginToken.setToken();
                 };
                return logoutFactory;
             
             });
blgapp.factory("getAllPosts",function($http,loginToken)
             {
               var getAllPostsFactory={};
                 getAllPostsFactory.getUser=function()
                 {
                     if(loginToken.getToken())
                     {
                          return $http.post('/api/home');
                     }
                     else
                     {
                         $q.reject({message:'user has no token'});
                     }
                 };
                  getAllPostsFactory.getEquip=function()
                 {
                       return $http.get('/api/allequip');
                 };
                
                getAllPostsFactory.postdonateequipObject=function(donate)
                {
                    return $http.post('/api/donateequip',donate);
                }
                return getAllPostsFactory;
             
             });

blgapp.factory("loginToken",function($window)
              {
                var tokenFactory={};
                tokenFactory.setToken=function(token)
                {
                    if(token)
                    {
                        $window.localStorage.setItem('token',token);
                    }
                    else
                    {
                         $window.localStorage.removeItem('token');
                    }
                };
                tokenFactory.getToken=function()
                {
                   return $window.localStorage.getItem('token'); 
                };
                return tokenFactory;
              });

blgapp.factory("authInterceptors",function(loginToken)
             {
                var authInterceptorsFactory={};
                authInterceptorsFactory.request=function(config)
                {
                  var token=loginToken.getToken();
                  if(token)
                  {
                      config.headers['x-access-token']=token;
                  }
                    return config;
                };
                return authInterceptorsFactory;
             });
