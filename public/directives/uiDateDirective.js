angular.module("pedidosInsercaoApp").directive("uiDate", function(){
    return{
        require: "ngModel",
        link: function(scope, element, attrs, ctrl){
            var _formatDate = function(date){
                date = date.replace(/[^0-9]+/g, "");
                if(date.length > 2){
                    date = date.substring(0,2) + "/" + date.substring(2);
                }               
                if(date.length > 5){
                    date = date.substring(0,5) + "/" + date.substring(5);
                }
                if(date.length > 10){
                    date = date.substring(0,10);
                }
                return date;
            };
            element.bind("keyup", function(){
                ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
                ctrl.$render();
                console.log(ctrl.$viewValue);
            });            
        }
    };
});