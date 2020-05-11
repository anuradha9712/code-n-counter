 blgapp.config(function($stateProvider)
                          { 
                            $stateProvider.caseInsensitiveMatch=true;
                            
                             $stateProvider
                              .state('login',{
                                url:'',
                              templateUrl:'/views/login.html',
                              controller:'logincont'
                               
                          })
                             $stateProvider
                              .state('signup',{
                                url:'/signup',
                              templateUrl:'/views/signup.html',
                              controller:'signupcont'
                          })
                             $stateProvider
                              .state('frgtpswd',{
                                url:'/frgtpswd',
                              templateUrl:'/views/frgtpswd.html',
                               controller:'frgtpswdcont'
                            
                          })
                          $stateProvider
                              .state('home',{
                                redirectTo:'home.about',
                              templateUrl:'/views/home.html',
                             controller:'homecontroller'
                              
                          })
                            $stateProvider
                              .state('home.about',{
                                     url:'/about',
                              templateUrl:'/views/about.html',
                              controller:'homecontroller'
                              
                          })
                             $stateProvider
                              .state('home.donateequip',{
                                     url:'/donateequip',
                              templateUrl:'/views/donateequip.html',
                             controller:'homecontroller'
            
                          })
                              $stateProvider
                              .state('home.donatemoney',{
                                     url:'/donatemoney',
                              templateUrl:'/views/donatemoney.html',
                             controller:'homecontroller'
            
                          })
                           $stateProvider
                              .state('home.needequipment',{
                                     url:'/needequipment',
                              templateUrl:'/views/needequipment.html',
                             controller:'homecontroller'
            
                          })
                            $stateProvider
                              .state('home.needmoney',{
                                     url:'/needmoney',
                              templateUrl:'/views/needmoney.html',
                             controller:'homecontroller'
            
                          })
                           $stateProvider
                              .state('home.homeremedies',{
                                     url:'/homeremedies',
                              templateUrl:'/views/homeremedies.html',
                             controller:'homecontroller'
            
                          });
                           
                          
        });
 