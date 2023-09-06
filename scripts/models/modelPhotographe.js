

let dataVal

class photographer {

    /*
    constructor(url) {
        this._name = data.name 
        this._id = data.id 
        this._city = data.city
        this._country = data.country 
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
        

        this._url = url
    }

    
    get name () {
        return this._name 
    }

    get id() {
        return this._id 
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return this._portrait
    }
    */

    

    constructor(url) {
        
 
         this._url = url
     }
    
    async get() {
        try{

            const response = await fetch( this._url )  //"./data/photographers.json"
            const photographe = await response.json()

            dataVal = photographe

            console.log(dataVal)
        // console.log(photographer.get())

            return dataVal;

        } catch(err){

            console.log('erreur dans la requête', err)
            throw err;
        }
    
        
            
    }
    




}

class photographerExecute extends photographer {

    constructor(url) {
        super(url)
    }

    async getphotographerExecute() {
        return await this.get()
    }


}

class App {
    constructor() {
        
        this.moviesApi = new photographerExecute("./data/photographers.json")
    }

    async photographerExecuteFunction()  {

        const test = await this.moviesApi.getphotographerExecute()
    }
}

const app = new App()

console.log("****** datas")

app.photographerExecuteFunction()







////////////////////////////





