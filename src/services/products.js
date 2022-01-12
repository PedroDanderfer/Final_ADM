export default {

    create (product){
        console.log('wada');
        return new Promise((resolver, rechazar) => {
            let products = [], productExist = false;
            
            if(localStorage.products == undefined || localStorage.products == null || localStorage.products.length == 0){
                products.push(product);
                localStorage.products = JSON.stringify(products);
                resolver({
                    status: true,
                    products: product,
                });
            }else{
                products = JSON.parse(localStorage.products);
                for (let i = 0; i < products.length; i++) {
                if(products[i]["title"] == product["title"]){
                    productExist = true;
                    break;
                }else{
                    continue;
                }          
                }
    
                if(productExist){
                    rechazar({
                        status: false,
                        errors: 'El producto ya se encuentra creado.'
                    });
                }else{
                    products = JSON.parse(localStorage.products);
                    products.push(product);
                    localStorage.products = JSON.stringify(products);
                    resolver({
                        status: true,
                        products: product,
                    });
                }
            }
        })
    },
  
}