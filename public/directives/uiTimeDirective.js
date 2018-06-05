angular.module("pedidosInsercaoApp").directive("uiTime", function(){
    return{
        require: "ngModel",
        link: function(scope, element, attrs, ctrl){
            var _formatTime = function(time){                           
                time = time.replace(/[^0-9]+/g, "");              
                if(time.length > 2){      
                    if(time.substring(0,2) > 23){
                        time = "23" + ":" + time.substring(2);
                    }    
                    else{         
                        time = time.substring(0,2) + ":" + time.substring(2);
                    }                                     
                }
                if(time.length >= 5){                  
                    if(time.substring(3,5) > 59){
                        time = time.substring(0,2) + ":" + 59; 
                    }
                    time = time.substring(0,5);                                          
                }

                return time;
            };
            element.on("keyup", function(e){                
                ctrl.$setViewValue(_formatTime(ctrl.$viewValue));
                ctrl.$render();                              
            });   
        }
    };
});