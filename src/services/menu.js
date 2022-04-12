export default {

    getMenu(){
        return new Promise((resolver) => {
            if(localStorage.categories == undefined || localStorage.categories == null){
                resolver([]);
            }

            let categories = JSON.parse(localStorage.categories), menu = [];

            for (let i = 0; i < categories.length; i++) {
                menu.push({
                    category: categories[i],
                    products: []
                });      
            }

            if(localStorage.products == undefined || localStorage.products == null){
                resolver(menu);
            }

            let products = JSON.parse(localStorage.products);

            for (let i = 0; i < products.length; i++) {
                if(products[i].categories === null || products[i].categories.length == 0){

                    if (menu.indexOf('Otros') === -1) {
                        menu.push({
                            category: 'Otros',
                            products: []
                        });
                    }
                    for (let l = 0; l < menu.length; l++) {
                        if(menu[l].category == 'Otros'){
                            menu[l].products.push(products[i]);
                            break;
                        }else{
                            continue;
                        }
                    }
                }else{
                    for (let l = 0; l < products[i].categories.length; l++) {
                        for (let j = 0; j < menu.length; j++) {
                            if(products[i].categories[l] == menu[j].category){
                                menu[j].products.push(products[i]);
                                break;
                            }else{
                                continue;
                            }            
                        }
                    }
                } 
            }

            resolver(menu);
        })
    }
  
}