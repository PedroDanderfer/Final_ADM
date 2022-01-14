export default {

    create (newProduct){
        return new Promise((resolver, rechazar) => {
            let products = [], productExist = false, product = newProduct;
            
            product['stock'] = true;

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
  
    delete (product){
        return new Promise((resolver, rechazar) => {
            let products = JSON.parse(localStorage.products), deleted = false;

            for (let i = 0; i < products.length; i++) {
                if(products[i].title == product.title){
                    deleted = true;
                    products.splice(i,1);
                    break;
                }else{
                    continue;
                }
            }

            if(deleted){
                localStorage.products = JSON.stringify(products);
                resolver({
                    status: true,
                    product: product
                });
            }else{
                rechazar({
                    status: false,
                    errors: 'No se pudo eliminar el producto.'
                });
            }
        })
    },

    edit (newProduct, oldProduct){
        return new Promise((resolver, rechazar) => {
            let products = JSON.parse(localStorage.products), edited = false, product = {};
            for (let i = 0; i < products.length; i++) {
                if(products[i].title == oldProduct.title){
                    for (const key in newProduct) {
                        if (Object.hasOwnProperty.call(newProduct, key)) {
                            const element = newProduct[key];
                            products[i][key] = element;
                            edited = true;
                            product = products[i];
                            continue;
                        }else{
                            continue;
                        }
                    }
                }
            }
            
            if(edited){
                localStorage.products = JSON.stringify(products);
                resolver({
                    status: true,
                    product: product
                });
            }else{
                rechazar({
                    status: false,
                });
            }
        })
    }
}