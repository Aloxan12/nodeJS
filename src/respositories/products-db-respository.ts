import { getProducts } from "./db"
import { client } from "./dbMongo"

interface ProductType{
    id: number
    title: string
}

const productsCollection = client.db('shop').collection<ProductType>('products')


export const productsRespository = {
    async findProduct(title: string | undefined){
        if(title){
            return productsCollection.find({title: {$regex: title}}).toArray()
        }else {
            return productsCollection.find().toArray()
        }
    },
    async getProductById(id: number){
        let product: ProductType | null = await productsCollection.findOne({id: id})
        return product
    },
    async createProduct(title: string){
        const newProduct = {
            id: +(new Date), 
            title: title}
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string){
        const result = await productsCollection.updateOne({id:id},{$set:{title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number){
       const result =  await productsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    }
}