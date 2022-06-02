export default {
    create(table, paymentMethod, totalPrice){
        return new Promise((resolver, rechazar)=>{
            if(paymentMethod !== 'cash' && paymentMethod !== 'card'){
                rechazar({
                    status: false,
                    errors: 'El metodo de pago es invalido.'
                });
            }else{
                let order = {}, date = new Date(), orders;
                console.log(table);
                order.dayCreated = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
                order.timeCreated = date.getHours()+':'+date.getMinutes();
                order.tableNumber = table.number;
                order.diners = table.diners;
                order.order = table.order;
                order.total = totalPrice;
                order.paymentMethod = paymentMethod;

                if(localStorage.orders == undefined || localStorage.orders == null || localStorage.orders.length == 0){
                    orders = [];
                    orders.push(order);
                    localStorage.orders = JSON.stringify(orders);
                    resolver({
                        status: true,
                        order: order,
                    });
                }else{
                    orders = JSON.parse(localStorage.orders);
                    orders.push(order);
                    localStorage.orders = JSON.stringify(orders);
                    resolver({
                        status: true,
                        order: order,
                    });
                }
            }
        }) 
    }
}