var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider, $locationProvider)
{
	// lemme check the syntaxsure
   $routeProvider
      .when("/list",{
      	templateUrl:"templates/list.html", //after every attribute..?
         controller:"ListController"
      })
      
      .when("/create",{
      	templateUrl:"templates/create.html",
         controller:"CreateController"
      })
      .otherwise({
      	redirectTo: '/list'
      });

    $locationProvider.html5Mode(true);	// this tells angular to not to use #!
});

// dara..server config ta thik korte hobeookk


app.run(function($rootScope){
	$rootScope.list= [];
});


//ycre
//dekh...first tym...there will be no localstorage e
//// but in list controller ur initializing 
// it from LocalStorage which returbs undefined
// then obvsly..undefined ka unshift hoga niooookkkkni
// get it?yo nice
//thank you.......taale tor hoye geche
// aami toh lappy off kore diyechi
// kal online kare?yeah amio aaj ghumate jacchi kaal subah uthna hai
// thanks a lot aacha one more doubt aaalloger allo


app.controller("ListController",function($scope,$rootScope)
{
	if(localStorage.list != undefined )
	     $rootScope.list = JSON.parse(localStorage.getItem("list"));
           
	$scope.removeItem=function($scopeindex)
           {    
              $rootScope.list.splice($scopeindex,1);
	          $scope.index--;  

	          
	          localStorage.setItem("list", JSON.stringify($rootScope.list));
           }
    $scope.createItem=function()
            {
            	document.location.href="/create";
            }
   
});

 			


app.controller("CreateController",function($scope,$rootScope)
{
	console.log('foo');
    
	$scope.item={
   		title:'',
   		description:''
   };
       

 	$scope.addItem = function() 
    { 
    	

      	$scope.errortext = "";
        if (!$scope.item) {return;}
        if ($rootScope.list.indexOf($scope.item) == -1) {
        	var newobj = new Object();  // here u shud understand...this item ur using it here only...so javascript item...so no scope requiredookk
      	    //object attributes copy kr de
      	    newobj.title=$scope.item.title;
      	    newobj.description=$scope.item.description;
           

            $rootScope.list.unshift(newobj);
            localStorage.setItem("list", JSON.stringify($rootScope.list)); 
         
        } 
       else {
            $scope.errortext = "The item is already in your shopping list.";
        }
     	

    }
     
   $scope.viewItem=function()
    {
        window.location="/list";
    }




});

