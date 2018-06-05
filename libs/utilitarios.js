module.exports = {   
    calcularFuso: function(data) { 
        var milisegundos_com_utc = data.getTime() + (data.getTimezoneOffset() * 60000);
        return new Date(milisegundos_com_utc + (3600000 * (data.getTimezoneOffset()/60 -6))); 
    }    
};