
const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]

export const productsRespository = {
    async findProduct(title: string | undefined){
        if(title){
            return products.filter(item => item.title.indexOf(title)> -1)
        }else {
            return products
        }
    },
    async getProductById(id: number){
        let product = products.find((prod)=> prod.id === id)
        return product
    },
    async createProduct(title: string){
        const newProduct = {
            id: +(new Date), 
            title: title}
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string){
        let product = products.find((prod)=> prod.id === id)
        if(product) {
            product.title = title
            return product
        }else {
            return null
        }
    },
    async deleteProduct(id: number){
        for(let i = 0; i < products.length; i++){           //#1
            if(products[i].id === id){
                products.splice(i, 1);
                return true;
            }
        }
        return false

        // const newPropucts = products.filter((prod)=> prod.id !== +req.params.id) //#2 придумать как вернуть с кодом
        // return newPropucts.length < products.length ? res.send(201) : res.send(404)
    }
}