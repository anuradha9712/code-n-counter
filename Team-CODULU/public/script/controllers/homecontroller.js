blgapp.controller('homecontroller',function($scope,$state,logoutToServer,loginToServer,getAllPosts)
           { 
              
             $scope.successMsg=false;
             $scope.errorMsg=false;
                 var refresh=function()
                 {if(loginToServer.isLoggedIn())
                    {
                    console.log("user logged in");
                    getAllPosts.getUser().then(function(data)
                                              {
                                                console.log(data.data.email);
                                                $scope.email=data.data.email;
                                              });
                        getAllPosts.getEquip().then(function(data)
                                              {
                                                console.log(data.data);
                                                $scope.users=data.data;
                                              });
                     
                    }
                    else
                    {
                        console.log("user not logged in"); 
                    }
                 }
                 refresh();
             $scope.logout=function()
             {
                  logoutToServer.logoutUser();
                  $state.go('login');
             }
             $scope.donate={
                 itemName:"",
                 month:0,
                 year:0,
                 description:"",
                 equipfee:0,
                 email:""
             }
             $scope.donateEquip=function()
             {
                 $scope.donate.email=$scope.email;
                 console.log($scope.donate);
                    getAllPosts.postdonateequipObject($scope.donate).then(function(data)
                            {
                              if(data.data.success)
                              {
                                  $scope.successMsg=data.data.message;
                                  $state.go('about');
                              }
                              else
                              {
                                  $scope.errorMsg=data.data.message;
                              }
                            });
             }
          
           });
      