export default {

    /**
     * Crea una nueva categoría en el local storage
     * 
     * @param {category} value 
     * @returns {Promise<Categories.CategoriesResponse>}
     */
    create (value){
        return new Promise((resolver, rechazar) => {
            let categories = [], categoryExist = false;
            
            if(localStorage.categories == undefined || localStorage.categories == null || localStorage.categories.length == 0){
                categories.push(value);
                localStorage.categories = JSON.stringify(categories);
                resolver({
                    status: true,
                    categories: value,
                });
            }else{
                categories = JSON.parse(localStorage.categories);
                for (let i = 0; i < categories.length; i++) {
                if(categories[i] == value){
                    categoryExist = true;
                    break;
                }else{
                    continue;
                }          
                }
    
                if(categoryExist){
                    rechazar({
                        status: false,
                        errors: 'El nombre ya se encuentra en uso'
                    });
                }else{
                    categories = JSON.parse(localStorage.categories);
                    categories.push(value);
                    localStorage.categories = JSON.stringify(categories);
                    resolver({
                        status: true,
                        categories: value,
                    });
                }
            }
        })
    },

    /**
     * Elimina una nueva categoría del local storage
     * 
     * @param {category} value 
     * @returns {Promise<Categories.CategoriesResponse>}
     */
    delete (category){
        return new Promise((resolver, rechazar) => {
            let categories = JSON.parse(localStorage.categories), deleted = false;
            for (let i = 0; i < categories.length; i++) {
                if(categories[i] == category){
                    deleted = true;
                    categories.splice(i, 1);
                    break;
                }else{
                    continue;
                } 
            }
            for (let i = 0; i < categories.length; i++) {
                if(categories[i] == category){
                    deleted = true;
                    categories.splice(i, 1);
                    break;
                }else{
                    continue;
                }        
            }

            if(!deleted){
                rechazar({
                    status: false,
                    errors: 'No se pudo eliminar la categoría.'
                });
            }else{
                let products = JSON.parse(localStorage.products);

                for (let i = 0; i < products.length; i++) {
                    if(products[i].categories == null){
                        continue;
                    }else{
                        for (let j = 0; j < products[i].categories.length; j++) {
                            if(category == products[i].categories[j]){
                                products[i].categories.splice(j, 1);
                                break;
                            }else{
                                continue;
                            }              
                        } 
                    }            
                }
        
                localStorage.products = JSON.stringify(products);
                localStorage.categories = JSON.stringify(categories);

                console.log(JSON.parse(localStorage.products));
                
                resolver({
                    status: true,
                    categories: categories
                });
            }
        })
    },

    /**
     * Edita una nueva categoría del local storage
     * 
     * @param {category} value 
     * @returns {Promise<Categories.CategoriesResponse>}
     */
    edit (newCategory, oldCategory){
        return new Promise((resolver, rechazar) => {
            let categories = JSON.parse(localStorage.categories), editSuccess = false;

            if(newCategory == oldCategory){
                rechazar({
                    status: false,
                    errors: 'La categoría ya se encuentra en uso.'
                });
            }

            for (let i = 0; i < categories.length; i++) {
                if(categories[i] == oldCategory){
                    categories.splice(i, 1, newCategory);    
                    editSuccess = true;
                    break;
                }else{
                    continue;
                }
            }

            if(!editSuccess){
                rechazar({
                    status: false,
                    errors: 'No se pudo editar la categoría.'
                });
            }else{
                let products = JSON.parse(localStorage.products);

                for (let i = 0; i < products.length; i++) {
                    if(products[i].categories == null){
                        continue;
                    }else{
                        for (let j = 0; j < products[i].categories.length; j++) {
                            if(oldCategory == products[i].categories[j]){
                                products[i].categories.splice(j, 1, newCategory);
                                break;
                            }else{
                                continue;
                            }              
                        } 
                    }            
                }
        
                localStorage.products = JSON.stringify(products);
                localStorage.categories = JSON.stringify(categories);
                resolver({
                    status: true,
                    oldCategory: oldCategory,
                    newCategory: newCategory
                });
            }
        })
    }
  
}