//factory fonction 
/*
function Image(mediaListe) {

	
	return{

		//gestion de l'affichage des images
		imageRender(){

			const articleItem = `

                                <div class="articlePortfolioitem articlePopularite"  > 
                                
                                    <div class="articlePortfolio__item">
                            
                                        <button class="articlePortfolio__item--img imgVideo${ mediaListe.id}" > 
                                        
                                            

                                            
                                            <img class="child" src="./assets/photographersMedia/${mediaListe.image}" alt= ${mediaListe.title} />
                                        
                                        </button>
                                        
                                    
                                        <div class="articlePortfolio__item--description description">
                                        
                                            <p class="description__titre" > ${mediaListe.title}  </p>
                                
                                            <div class="description__numLike"> 

                                                    
                                            <div class= "numberLikes ${mediaListe.title.replace(/\s+/g, "")}  ${mediaListe.id}"  id= ${mediaListe.title.replace(/\s+/g, "")}  data-idMediaCurrent =${mediaListe.id} > ${mediaListe.likes}  </div> 
                                                    
                                            <button class="heartLikeMedia" data-idMediaCurrent =${mediaListe.id} id= "${mediaListe.title.replace(/\s+/g, "")}">  <i class="fa-solid fa-heart" ></i> </button>

                                            
                                            
                                            </div>
                                            
                                        </div>

                                    </div>
                            
                                </div> 
                            
                                `;

			return articleItem;
	    }
	};
    
}

Image();

*/




///////////////////////////////////////

/*
export class Image {

	constructor( mediaListe ){

		this._id = mediaListe.id;
		this._image = mediaListe.image;
		this._video = mediaListe.video;
		this._title = mediaListe.title;
		this._likes = mediaListe.likes;
   
	}


    
	//gestion de l'affichage des images
	imageRender( ){

		
		console.log("******** mediaListe");
		

		const articleItem = `

                        <div class="articlePortfolioitem articlePopularite"  > 
                        
                            <div class="articlePortfolio__item">
                    
                                <button class="articlePortfolio__item--img imgVideo${ this._id}" > 
                                
                                    

                                    
                                    <img class="child" src="./assets/photographersMedia/${this._image}" alt= ${this._title} />
                                
                                </button>
                                
                            
                                <div class="articlePortfolio__item--description description">
                                
                                    <p class="description__titre" > ${this._title}  </p>
                        
                                    <div class="description__numLike"> 

                                            
                                    <div class= "numberLikes ${this._title.replace(/\s+/g, "")}  ${this._id}"  id= ${this._title.replace(/\s+/g, "")}  data-idMediaCurrent =${this._id} > ${this._likes}  </div> 
                                            
                                    <button class="heartLikeMedia" data-idMediaCurrent =${this._id} id= "${this._title.replace(/\s+/g, "")}">  <i class="fa-solid fa-heart" ></i> </button>

                                    
                                    
                                    </div>
                                    
                                </div>

                            </div>
                    
                        </div> 
                    
                        `;
		return articleItem;
		

		
		
	}




}

const img = new Image();
img.imageRender();

//export default Image;

*/


