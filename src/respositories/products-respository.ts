
const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]

export const productsRespository = {
    findProduct(title: string | undefined){
        if(title){
            return products.filter(item => item.title.indexOf(title)> -1)
        }else {
            return products
        }
    }
}