export default {

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
                localStorage.categories = JSON.stringify(categories);
                resolver({
                    status: true,
                    categories: categories
                });
            }
        })
    },
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