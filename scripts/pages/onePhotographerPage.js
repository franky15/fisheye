


//gestion de onePhotographerTemplate.js

async function onePhotographerData(){

    let photographers
    let photographerMedia
    let dataliste = []

    try {

        let response = await fetch('./data/photographers.json') 
        
        let dataVal = await response.json();

        photographerMedia = dataVal.media
        
       // console.log(  photographerMedia );

       photographers = dataVal.photographers

       dataliste = [photographers, photographerMedia]
      
       //console.log( dataliste);
       //console.log( photographers);

    }catch(err) {

        console.err('Erreur lors de la requête :', err); 

    }

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
       
       
        photographers: [...photographers],
        photographersMedia: [ ...photographerMedia]
     
      })


    

}

//fonction de récupération de photographers, photographersMedia
async function onePhotographerDataTemplate(photographers, photographersMedia){

    console.log("***** bienvenue dans onePhotographerDataTemplate() *****")

    ///////////////////////////////////////

    // récupération de l'URL complète de la page
    let url = window.location.href;

    // Utilisation de la méthode split pour obtenir l'ID après le dernier ?
    let parts = url.split("?");

    // Récupération de l'ID extrait (peut contenir des espaces avant ou après)
    let extractedId = parts[parts.length - 1];

    // Suppression des espaces inutiles avant et après l'ID
    let idPhotographer = extractedId.trim();

    console.log(idPhotographer); // Affiche l'ID extrait et sans espaces

    console.log(  photographersMedia );
    console.log( photographers);

    ///////////////////////////////////////
   //récupération du photographe encours
   let photographCurrent = photographers.find( item => item.id === parseInt(idPhotographer) )

   console.log("***** photographCurrent")
   console.log(photographCurrent)

   const { id, name, portrait, city, country, tagline, price } = photographCurrent;

    console.log(  "city : "+ city  +  "  * country : " + country  +  " * tagline : "+ tagline  + "  * price : "+ price  )

    //récupération des objets du portfolio du photographe en cours
    let ProjetPhotographCurrent = photographersMedia.filter( item => item.photographerId === parseInt(idPhotographer) )

    //récupération

    console.log(  "******* ProjetPhotographCurrent" );
    console.log( ProjetPhotographCurrent);
   

    


    /*****************partie du pays et tu titre********************** */
  
     const descriptionTitle = document.createElement("div")
     descriptionTitle.setAttribute( "class", "countryTitle")

     //creation de l'élément nom du photographe///////////////
     const nameElement = document.createElement("h1")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.innerText = name

     //creation du block country et description
     const countryBlock = document.createElement("div")
     countryBlock.setAttribute( "class", "countryBlock")
    
     //creation des enfants  du block country et description///////////////
     const countryElement = document.createElement("p")
     countryElement.setAttribute( "class", "countryElement")
     countryElement.innerText = country;

     const descripElement = document.createElement("p")
     descripElement.setAttribute( "class", "descripElement")
     descripElement.innerText = tagline;

     //insertion des enfants dans les parents///////////////
     countryBlock.appendChild(countryElement)
     countryBlock.appendChild(descripElement )
     descriptionTitle.appendChild(nameElement )
     descriptionTitle.appendChild(countryBlock )

     //creation de l'élément img du photographe///////////////
     const picture = `./assets/photographers/${portrait}`;

     const imgBlock = document.createElement("p")
     
     imgBlock.setAttribute( "class", "imgBlock")
     /*
     const imgElement = document.createElement("img")
     nameElement.setAttribute( "class", "nameElement")
     nameElement.setAttribute( "alt", " ")
     imgBlock.appendChild(imgElement)
     imgElement.setAttribute("src", picture)
    */
     ////////////////////
     const imgBlock2 = `
     
        <div class= "imgBlock2" alt="photographe" style="background-image: url('./assets/photographers/${portrait}');
         background-repeat: no-repeat;  background-position:  center center;
          background-size: cover; width: 200px; height: 200px;  border-radius: 50%; "  > 
        
        
        </div>
     
     
     `


     ////////////////////

      //insertion du parent partiel sur le grand parent///////////////
      const photographHeaderClass = document.querySelector(".photograph-header")
      photographHeaderClass.appendChild(descriptionTitle)
      photographHeaderClass.appendChild(imgBlock)

      ///////////////////
      const imgPhotographe  = document.querySelector(".imgBlock")
      imgPhotographe.innerHTML = imgBlock2;

      //////////////////

    /***************** gestion  et création du formulaire  du trie ********************** */
    
    // récupération du formulaire ///////////////
    let formElement = document.querySelector(".form");

    // Création du label ///////////////
    let labelElement = document.createElement("label");
    labelElement.textContent = "Trier par";

    // Association du label à l'élément select ///////////////
    labelElement.setAttribute("for", "mySelect");

    // Création d'un élément select ///////////////
    let selectElement = document.createElement("select");

    // Ajout d'une classe et d'un id ///////////////
    selectElement.classList.add("inputSelect");
    selectElement.id = "mySelect"; 

    // Création de trois options et ajout dans l'élément select ///////////////
    
    let option1 = document.createElement("option");
    option1.setAttribute("selected", "selected");
    option1.textContent = "Popularité";
    selectElement.appendChild(option1);

    let option2 = document.createElement("option");
    option2.textContent = "Date";
    selectElement.appendChild(option2);

    let option3 = document.createElement("option");
    option3.textContent = "Titre";
    selectElement.appendChild(option3);

    // Styles CSS pour personnaliser la flèche du sélecteur


    // Ajout de l'élément select et du label au formulaire ///////////////
    formElement.appendChild(labelElement);
    formElement.appendChild(selectElement);

  
  


    /***************** gestion  du portfolio ********************** */

   

   // const articleElement  = document.querySelector(".articlePortfolio")
    const articleElement  = document.querySelector(".articleContainer")



    console.log(ProjetPhotographCurrent.length)

    // console.log("***ProjetPhotographCurrent")
    // console.log(ProjetPhotographCurrent)

    let articleItem 
    
    //creation des medias

    let ShowNormalOrderPopularite 

    ////////////////////////////////////////////
    //création et gestion du context parttern pour gérer les states du filtre

    //le context
    class ContextClass {

        constructor() {

            this._states = [

                new stateClass()

            ]

            this._currentClass = this._states[0]

        }

        //fonction d'éxécution des données et de la logique de cette class DynamiqueFilterValue
        handleDynamiqueFilterValue() {

            //mise à jour du state ou dans le context
            this._currentClass = this._states[0]  

            console.log("***** this._currentClass"  )
            console.log( this._currentClass )
            

        }

    }

    /*
    //le state
    class stateClass {

        constructor() {
            
            this._valueNow = "go"
            
        }
            
    }
    

    const context = new ContextClass() 
    context.handleDynamiqueFilterValue()

    console.log("***** Context"  )
    console.log( context )

    let valInputContext = context._currentClass._valueNow
    console.log("valInputContext : " +   valInputContext )

*/



    ///////////////////////////////////////:

   

    let selectValueLocalStorage

    //fonction de mise à jour des résultats du filtre
    const updatefilterPage = (selectValue) => {

        console.log("bienvenue dans la fonction updatefilterPage")

        console.log("**** selectValue dans updatefilterPage")
        console.log(selectValue)

        /*
        // let selectValueLocalStorage
        // Récupération des données  du filtre (selectValue) du localStorage
        selectValueLocalStorage = localStorage.getItem("selectValue");
        console.log("**** selectValueLocalStorage");
        console.log(selectValueLocalStorage);

        console.log("typeof selectValueLocalStorage : " + typeof selectValueLocalStorage )
       // console.log(selectValueLocalStorage.selectValue)
        */

        if(!selectValue){

            console.log("***** bienvenue dans le if de ShowNormalOrderPopularite ")
            //console.log(selectValueLocalStorage.selectValue)

            for(let i = 0; i < ProjetPhotographCurrent.length; i++){

                articleItem = `

                <article class="articlePortfolioitem" > 
                
                    <div class="articlePortfolio__item">
            
                        <div class="articlePortfolio__item--img imgVideo${ProjetPhotographCurrent[i].id}"
                        
                            style=" background-image: url('./assets/photographersMedia/${ProjetPhotographCurrent[i].image}');
                            background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                        
                        </div>
                        
                        <!--

                        <div class="articlePortfolio__item--img imgVideo${ProjetPhotographCurrent[i].id}">
                            
                            <img src="./assets/photographersMedia/${ProjetPhotographCurrent[i].image}" alt=" " class="photographerImg" >
                        
                        </div>

                        -->

                        <div class="articlePortfolio__item--description description">
                            <p class="description__titre" > ${ProjetPhotographCurrent[i].title}  </p>
                
                            <div class="description__numLike"> 

                                    <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                            <div class= "numberLikes ${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}" id= "${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}" > ${ProjetPhotographCurrent[i].likes}  </div> 
                                    
                                <i class="fa-solid fa-heart   heartLikeMedia" data-idMediaCurrent =${ProjetPhotographCurrent[i].id} id= "${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}"></i>

                            
                            
                            </div>
                            
                        </div>

                    </div>
            
                </article> 
            
                `
            
            

                articleElement.innerHTML += articleItem;


            
            }

        } 
        
        /************************************************************* */

        const listeFilterUpdateFunction = () => {

            //mise à jour du tableau des media avec le local storage
            console.log("**** bienvenue dans la fonction isteFilterUpdateFunction ")
            // ProjetPhotographCurrent

                let listeMediaUpdate = []

                for(let k=0; k<ProjetPhotographCurrent.length; k++){

                    let itemArticle = ProjetPhotographCurrent[k]

                    console.log("*** itemArticle" )
                    console.log( itemArticle)
                    console.log(itemArticle.id + " "  + typeof itemArticle.id)
                    console.log( itemArticle.id + " "  + typeof `${itemArticle.id}` )
                    console.log( itemArticle.id + " "  + typeof [itemArticle.id] )
                    
                    // Récupération de  l'objet sérialisé depuis le localStorage
                    // let articleString = localStorage.getItem(`${itemArticle.id}`); //623534343

                    let articleString = localStorage.getItem([itemArticle.id]); //[] car je récupère un objet du local storage

                    console.log("*** articleString" )
                    console.log( articleString )
                   

                    // Désérialisation l'objet articleString en un objet Jason
                    let articleJson = JSON.parse(articleString);

                    console.log("*** articleJson" )
                    console.log( articleJson)


                   if(!articleString){

                    console.log("***** bienvenue dans le if articleString existe")

                        if( itemArticle.id === articleJson.id){

                            console.log("**** bienvenue dans le if ProjetPhotographCurrent[k].id === articleJson.id")
                            
                            //récupération de la liste des media sans l'ancien objet
                            let listeMediaFilterCurrent = ProjetPhotographCurrent.filter( item => item.id !== articleJson.id)
                        
                            console.log("**** listeMediaFilterCurrent")
                            console.log(listeMediaFilterCurrent)

                            //ajout de l'objet récupéré dans le local storage dans la liste filtrée pour remplacer l'objet filtré précédamment
                           // let listemMdiaFilterUpdate =[] 
                             listeMediaFilterCurrent.push(articleJson)

                            console.log("**** listeMediaFilterCurrent2 ")
                            console.log(listeMediaFilterCurrent )

                            //mise à jour de la nouvelle liste 
                            listeMediaUpdate.push(listeMediaFilterCurrent)

                            console.log("**** listeMediaUpdate")
                            console.log(listeMediaUpdate)

                        }


                   }



                }

                console.log("**** listeMediaUpdate")
                console.log(listeMediaUpdate)

                ///////

               let  lisNumberLikeOrderCroissant1 = [] 
               
               lisNumberLikeOrderCroissant1  = listeMediaUpdate
                //ordonnement de la liste du nombre de likes par ordre croissant

                lisNumberLikeOrderCroissant1[0].sort( (a, b) => {

                    
                    return a.likes - b.likes;
                })
                

                console.log("***** lisNumberLikeOrderCroissant1 ")
                console.log(lisNumberLikeOrderCroissant1)


                //converion en string avant le stockage dans le local storage
                const lisNumberLikeOrderCroissant1JSON = JSON.stringify(lisNumberLikeOrderCroissant1);

                //stockage dans le local storage
                localStorage.setItem('listeArticlesCroissanteLikes', lisNumberLikeOrderCroissant1JSON);

                //showNewArticleFunction(lisNumberLikeOrderCroissant1)


                //////////


        }

          //éxécution de la fonction listeFilterUpdateFunction
       // listeFilterUpdateFunction()
        
        

        //fonction d'affichage des articles mis à jour
        const showNewArticleFunction = (selectValue) => {

                console.log("***** bienvenue dans la showNewArticleFunction ")


                //récupération de la lisNumberLikeOrderCroissant1JSON   dans le local storage
                const lisNumberLikeOrderCroissant1JSON  = localStorage.getItem('lisNumberLikeOrderCroissant1JSON ');

                //convertion en tableau normal
                const lisNumberLikeOrderCroissant1 = JSON.parse(lisNumberLikeOrderCroissant1JSON);

                console.log("****lisNumberLikeOrderCroissant1 dans la fonction showNewArticleFunction")
                
                console.log(lisNumberLikeOrderCroissant1)

                if( selectValue ) {   //lisNumberLikeOrderCroissant1


        

                    console.log("***** bienvenue dans le if de SlisNumberLikeOrderCroissant1")
                    //console.log(selectValueLocalStorage.selectValue)

                    for(let i = 0; i < lisNumberLikeOrderCroissant1.length; i++){

                        articleItem = `

                        <article class="articlePortfolioitem" > 
                        
                            <div class="articlePortfolio__item">
                    
                                <div class="articlePortfolio__item--img imgVideo${lisNumberLikeOrderCroissant1[i].id}"
                                
                                    style=" background-image: url('./assets/photographersMedia/${lisNumberLikeOrderCroissant1[i].image}');
                                    background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                
                                </div>
                                
                                <!--

                                <div class="articlePortfolio__item--img imgVideo${lisNumberLikeOrderCroissant1[i].id}">
                                    
                                    <img src="./assets/photographersMedia/${lisNumberLikeOrderCroissant1[i].image}" alt=" " class="photographerImg" >
                                
                                </div>

                                -->

                                <div class="articlePortfolio__item--description description">
                                    <p class="description__titre" > ${lisNumberLikeOrderCroissant1[i].title}  </p>
                        
                                    <div class="description__numLike"> 

                                            <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                    <div class= "numberLikes ${lisNumberLikeOrderCroissant1[i].title.replace(/\s+/g, '')}" id= "${lisNumberLikeOrderCroissant1[i].title.replace(/\s+/g, '')}" > ${lisNumberLikeOrderCroissant1[i].likes}  </div> 
                                            
                                        <i class="fa-solid fa-heart   heartLikeMedia" data-idMediaCurrent =${lisNumberLikeOrderCroissant1[i].id} id= "${lisNumberLikeOrderCroissant1[i].title.replace(/\s+/g, '')}"></i>

                                    
                                    
                                    </div>
                                    
                                </div>

                            </div>
                    
                        </article> 
                    
                        `
                    
                    

                        articleElement.innerHTML += articleItem;


                    
                    

                    }




                } 

       

          

        }

        //éxécution de la fonction showNewArticleFunction
        //showNewArticleFunction()





    }

    updatefilterPage() 

    /*************** gestion des likes et du total des likes   *********************/

    ///////////////////////////////////////////////

    
    //récupération de tous les coeurs
     const listeMedia = document.getElementsByClassName("heartLikeMedia")

     

     //console.log(listeMedia)

     //attribution des évènnements à chaque coeur et récupération de la dataset

    
     for( let j=0; j< listeMedia.length; j++){

       let  currentElementHeart = listeMedia[j]

      // Obtation la valeur de l'attribut data-custom-data
      let customDataValue = currentElementHeart.getAttribute("data-idMediaCurrent");

         // Gestionnaire d'événement pour "click" avec accès au dataset
         currentElementHeart.addEventListener("click", function() {

            console.log("Clic sur un élément avec la classe heartLikeMedia ");
           
            let listeMediaValue = ProjetPhotographCurrent
            //conversion de en entier
            let idMediaCurrent= parseInt(customDataValue)

            // console.log("idMediaCurrent : " + idMediaCurrent );

            //récupération de l'objet du média encours
            const mediaCurrent = listeMediaValue.find( item => item.id === idMediaCurrent )
            
            console.log("*** mediaCurrent")
            console.log(mediaCurrent)

            
            
            
            //mediaCurrent.likes += 1 

             console.log("*** mediaCurrent.likes : " + mediaCurrent.title + ": "+ mediaCurrent.likes  );

        
            /////////////////////////////////////////////////
            //récupération d'un like spécifique
            
            //supression des espaces dans toutes la chaine avec cette expression régulière .replace(/\s+/g, '')
            let titleMedia = mediaCurrent.title.replace(/\s+/g, '')

            // console.log("**** titleMedia")
            // console.log(titleMedia)

            //récupération du  nombre de likes en question
            let numberLikeCurrent = document.querySelector(`.${titleMedia}`)
            
            // console.log("*** numberLikeCurrent ")
            // console.log(numberLikeCurrent.innerText )

            // Récupération des données dans le localstorage
            let titleLocastorage = localStorage.getItem(`${titleMedia}`);

            // console.log("***** titleLocastorage")
            // console.log(titleLocastorage)

            //vérification si  ce title est déjà dans le localstorage
            if(titleLocastorage){

                console.log("************* le localstorage contient cette donnée")
                 //mise à jour de ce title dans le localstorage

                let likeValue = parseInt(numberLikeCurrent.innerText)
                let likeIncrement = likeValue +=1

                  ///////////////////////////

                //mise à jour de l'objet encours

                mediaCurrent.likes = likeValue  //mise à jour de likes dans l'objet mediaCurrent

                 console.log("************* mediaCurrent.likes = likeValue")
                console.log(mediaCurrent.likes = likeValue)
                console.log(mediaCurrent)

                
                //conversion de l'objet en string avant de le stocker dans le local storage car ne prend que des string
                localStorage.setItem(`${mediaCurrent.id }`, JSON.stringify(mediaCurrent));

                //récuppération de l'objet précédant dans le loca storage
                let objetlocaleStorage = localStorage.getItem(`${mediaCurrent.id}`)
            
                console.log(  "***** likeIncrement objetlocaleStorage" )
                console.log(  objetlocaleStorage )
                
                ///////////////////////////


                // console.log(  "***** likeIncrement" + " "+likeIncrement )

                localStorage.setItem(`${titleMedia}`, `${likeIncrement}`);

                //mise à jour du like coté dom
                let likeValueDom = localStorage.getItem(`${titleMedia}`)

                
                // console.log("****** nouvelle valeur du like" + likeValueDom )

               

                //numberLikeCurrent.innerText =  likeIncrement


                console.log("************* valeur dans le local en fin sachant que donnée existait déjà" + " " +localStorage.getItem(`${titleMedia}`) )

                //éxécution de la fonction de mise a jour du like du dom
                // updateNumberlikesFunction(likeValueDom )
                updateNumberlikesFunction(customDataValue, titleMedia, likeValueDom,numberLikeCurrent )

                //éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
                totalLikePriceFunction()

                //éxécution de la fonction filterMedia()
                filterMedia()

                 //éxécution de la fonction listeFilterUpdateFunction()
                listeFilterUpdateFunction(likeValueDom)

            }else{

                console.log("************* le localstorage est vide pour cette donnée")
                //si ce title n'est pas dans localstorage
                 //sauvegarde de ce title dans le localstorage

                // let likeValue = numberLikeCurrent.innerText
                 
                let likeValue = parseInt(numberLikeCurrent.innerText)
                 let likeIncrement = likeValue +=1

                ///////////////////////////
                  
                //mise à jour de l'objet encours
                mediaCurrent.likes = likeValue //mise à jour de likes dans l'objet mediaCurrent

                console.log("************* mediaCurrent.likes = likeValue")
                console.log(mediaCurrent.likes = likeValue)
                console.log(mediaCurrent)

               
                //conversion de l'objet en string avant de le stocker dans le local storage car ne prend que des string
                localStorage.setItem(`${mediaCurrent.id}`, JSON.stringify(mediaCurrent));

                 //récuppération de l'objet précédant dans le loca storage
                let objetlocaleStorage = localStorage.getItem(`${mediaCurrent.id}`)
           
                console.log(  "***** likeIncrement objetlocaleStorage" )
                console.log(  objetlocaleStorage )
               
               ///////////////////////////

                 console.log(  "***** likeIncrement" + " "+likeIncrement )
            
                 //mise à jour du localstorage
                localStorage.setItem(`${titleMedia}`, `${likeIncrement}`);

                //mise à jour du like coté dom
                let likeValueDom = localStorage.getItem(`${titleMedia}`)

                
                console.log("****** nouvelle valeur du like" + likeValueDom )

                //mise à jour du like coté dom
                //numberLikeCurrent.innerText = likeValueDom 

                //numberLikeCurrent.innerText =  likeIncrement

                console.log("************* valeur dans le local en fin sachant que donnée n'existait pas " + " " +localStorage.getItem(`${titleMedia}`) )
            
                //éxécution de la fonction de mise a jour du like du dom
                updateNumberlikesFunction(customDataValue, titleMedia, likeValueDom,numberLikeCurrent )

                //éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
                totalLikePriceFunction()

                //éxécution de la fonction filterMedia()
                filterMedia()

                 //éxécution de la fonction listeFilterUpdateFunction()
               
                 listeFilterUpdateFunction(likeValueDom)

            }
            
            


            /////////////////////////////////////////////////
        
            let incrementation = 1
            totalLikePriceFunction(incrementation)

            
        
        });


     }

     //////////////////////

     

     //mise à jour du nombre de likes après la mise à jour du localstorage
     const updateNumberlikesFunction = (customDataValue, titleMedia, likeValueDom,numberLikeCurrent, numberLikes) =>{

        console.log("bienvenue dans la fonction updateNumberlikesFunction")

       

            for( let k=0; k< listeMedia.length; k++){ 

                let  currentElementHeart = listeMedia[k]

                // Obtation la valeur de l'attribut data-custom-data qui est un id
                let customDataValue = currentElementHeart.getAttribute("data-idMediaCurrent");

                // console.log("***** customDataValue")
                // console.log(customDataValue)

                // Obtation la valeur de l'attribut data-custom-data qui est un id
                let titleValue = currentElementHeart.getAttribute("id");

                // console.log("***** titleValue")
                // console.log(titleValue)
                

               
                // Récupération de toutes les clés stockées dans le localStorage
                //s'il contient quelque chose
                const testLocalstorageExist = Object.keys(localStorage);

                // console.log("***** testLocalstorageExists")
                // console.log(testLocalstorageExist)

                if(testLocalstorageExist ){

                    // console.log("***** binvenue dans la condition testLocalstorageExist ****")

                    /////////////////////////////////:
                   for(let l=0; l<testLocalstorageExist.length; l++){

                        let localValueCurrent = testLocalstorageExist[l]

                        // console.log("***** localValueCurrent")
                        // console.log(localValueCurrent)

                        // console.log("***** les types ")
                        // console.log(typeof localValueCurrent + " " +  typeof titleValue  );
                        

                        // console.log("**** localValueCurrent === titleValue")
                        // console.log( localValueCurrent.trim() === titleValue.trim() )

                        if( localValueCurrent.trim() === titleValue.trim() ) {

                            ////////////////////
                         
                            console.log("$$$$ binvenue dans la condition localValueCurrent === titleValue  ****")

                            let listeMediaValue = ProjetPhotographCurrent
                            //conversion de en entier
                            let idMediaCurrent= parseInt(customDataValue)
            
                            // console.log("idMediaCurrent : " + idMediaCurrent );
            
                            //récupération de l'objet du média encours
                            const mediaCurrent = listeMediaValue.find( item => item.id === idMediaCurrent )
                            
                            
                            
                            //mediaCurrent.likes += 1 
            
                            console.log("*** mediaCurrent.likes : " + mediaCurrent.title + ": "+ mediaCurrent.likes );
            
                        
                       
                            //récupération d'un like spécifique
                            
                            //supression des espaces dans toutes la chaine avec cette expression régulière .replace(/\s+/g, '')
                            let titleMedia = mediaCurrent.title.replace(/\s+/g, '')
            
                            // console.log("**** titleMedia")
                            // console.log(titleMedia)
            
                            //récupération du  nombre de likes en question
                            let numberLikeCurrent = document.querySelector(`.${titleMedia}`)
                            
                            // console.log("***numberLikeCurrent")
                            // console.log(numberLikeCurrent.innerText )
            
                            // Récupération des données dans le localstorage
                            let titleLocastorage = localStorage.getItem(`${titleMedia}`);
            
                            // console.log("***** titleLocastorage")
                            // console.log(titleLocastorage)
            
                            // numberLikeCurrent.innerText = titleLocastorage 
                            numberLikeCurrent.innerText = parseInt(titleLocastorage)


                            // console.log("***** numberLikeCurrent.innerText mis à jour dans le if exterieur")
                            // console.log(numberLikeCurrent.innerText)

                        }else{

                            console.log("***** customDataValue est vide pas de mise à jour des likes pour l'instant ****")
                
                        }

                        ////////////////////
                    }
                
                }


            }
            
                


     }

     //updateNumberlikesFunction(customDataValue)
     updateNumberlikesFunction() 

     ///////////////////////:
     
        //const totalLikePriceFunction = (incrementation) => {
        function totalLikePriceFunction(incrementation){

            console.log("**** bienvenue dans la fonction  totalLikePriceFunction")
            //gestion du total des likes

            //////////////////////////////

            let tableValueLike = []

            //récupération de tous les éléments likes
            const listeNumberLikes = document.getElementsByClassName("numberLikes")


            for( let k=0; k< listeNumberLikes.length; k++){ 

                let  currentElementLike = listeNumberLikes[k]

                // Obtation la valeur de l'attribut data-custom-data qui est un id
                // let customDataLike = currentElementLike.getAttribute("classe");

                let customDataLike = parseInt(currentElementLike.innerText) ;

                tableValueLike.push(customDataLike)

                // console.log("***** customDataLike")
                // console.log(customDataLike)
            }

            // console.log("***** tableValueLike ")
            // console.log(tableValueLike )




             //////////////////////////////
                    //récupération du photographe encour
                    let photographerCurrent = photographers.find( item => item.id === parseInt(idPhotographer) )

                    //récupération de la liste des likes du photographe encours
                    let listeLikes = ProjetPhotographCurrent.map( item => item.likes)
                    // console.log("**** listeLikes ")
                    // console.log(listeLikes )
        
                    //addition des likes du photographe encours
                    let totalLikes = tableValueLike.reduce( (acc, current)=> {
        
                        return acc + current;
                    }, 0)
        
                    // console.log("**** totalLikes")
                    // console.log(totalLikes)
        
                    // console.log("**** photographerCurrent")
                    // console.log(photographerCurrent.price)
        
                    //récupération de l'élément
                    let priceLikeTotal = document.querySelector(".priceLikeTotal")
        
                    let priceLikeTotalBlock = `
                    
                       
                        <div class="totalBlock">
                            <p class="priceLikeTotal__like"> 
                            
                                <span class="total"> ${ totalLikes } </span>
                                <span class="priceLikeTotal__like--like"> <i class="fa-solid fa-heart iconheartLike"></i>  </span>
                                        
                            </p>
                            <p class="priceLikeTotal__like price">  ${photographerCurrent.price}€ / jour  </p>
                        </div>
                      
                        
                    
                    `
        
                    //insertion de l'html dans l'élément ciblé
                    priceLikeTotal.innerHTML = priceLikeTotalBlock ;
                    
                   




        }

        totalLikePriceFunction()

    ///////////////////////////////////////////////

    
    
    //récupération du photographe encour
    let photographerCurrent = photographers.find( item => item.id === parseInt(idPhotographer) )

    //récupération de la liste des likes du photographe encours
    let listeLikes = ProjetPhotographCurrent.map( item => item.likes)
    // console.log("**** listeLikes ")
    // console.log(listeLikes )

    //addition des likes du photographe encours
    const totalLikes = listeLikes.reduce( (acc, current)=> {

        return acc + current;
    }, 0)

    // console.log("**** totalLikes")
    // console.log(totalLikes)

    // console.log("**** photographerCurrent")
    // console.log(photographerCurrent.price)

    //récupération de l'élément
    let priceLikeTotal = document.querySelector(".priceLikeTotal")

    let priceLikeTotalBlock = `
    
        <p class="priceLikeTotal__like"> 
        
            ${totalLikes} 
            <span class="priceLikeTotal__like--like"> <i class="fa-solid fa-heart iconheartLike"></i>  </span>
                        
        </p>
        <p class="priceLikeTotal__like price">  ${photographerCurrent.price}€ / jour  </p>
    
    `

    

     /*************** gestion du filtre   *********************/

     //sélection de l'élément select du formulaire 
     const selectForm = document.querySelector("#mySelect")


     console.log(selectForm)

     console.log("***** listeMedia")
     console.log(listeMedia)

     
     //insersion d'un évènnement dans l'élément selectionné
     selectForm.addEventListener( "change", ()=>{

        // Récupération de la valeur sélectionnée
       // const selectValue = selectForm.value;
         selectValue = selectForm.value;

        console.log("***** selectValue ")
        console.log(selectValue)


        console.log("typeof selectValue : " + typeof selectValue )

        //ajout dans le local storage
        localStorage.setItem("selectValue", selectValue );

        //éxécution de la fonction de gestion d'affichage des medias
        updatefilterPage(selectValue) 


        //éxécusion des fonctions d'affichage d'articles
        listeFilterUpdateFunction(selectValue)
        showNewArticleFunction(selectValue)
    
        

     })
     

    //fonction d'affichage des media filtrés

    
    const filterMedia = () =>{

        console.log("***** bienvenue dans la fonction filterMedia ")

        const listenumberLikes = document.getElementsByClassName("numberLikes")
       
        // const lisNumberLikeOrderCroissant = listeMedia;
        let lisNumberLikeOrderCroissant = []

        for( let f=0; f<listenumberLikes.length; f++){

            
            //convertion en entier des valeurs
              let mediaItem = parseInt(listenumberLikes[f].innerText)
            
              console.log(mediaItem)

              //Ajout de chaque valeur dans le tableau lisMediaOrder
              lisNumberLikeOrderCroissant.push(mediaItem)

        }

        
         //ordonnement de la liste du nombre de likes par ordre croissant
         lisNumberLikeOrderCroissant.sort( (a, b) => {

            return a - b;
        })
        

        console.log("***** lisNumberLikeOrderCroissant ")
        console.log(lisNumberLikeOrderCroissant)

        //affichage par ordre croissant

        ///////////////////////////////////

        for(let x = 0; x < lisNumberLikeOrderCroissant.length; x++){

                let likeCurrent = lisNumberLikeOrderCroissant[x]

                for(let i = 0; i < ProjetPhotographCurrent.length; i++){

                    // console.log("***ProjetPhotographCurrent")
                    // console.log(ProjetPhotographCurrent)

                    articleItem = `
        
                <article class="articlePortfolioitem"> 
                
                    <div class="articlePortfolio__item">
            
                            <div class="articlePortfolio__item--img imgVideo${ProjetPhotographCurrent[i].id}"
                        
                            style=" background-image: url('./assets/photographersMedia/${ProjetPhotographCurrent[i].image}');
                                background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                            
                        </div>
                        
                        <!--
        
                        <div class="articlePortfolio__item--img imgVideo${ProjetPhotographCurrent[i].id}">
                            
                            <img src="./assets/photographersMedia/${ProjetPhotographCurrent[i].image}" alt=" " class="photographerImg" >
                            
                        </div>
        
                        -->
        
                        <div class="articlePortfolio__item--description description">
                            <p class="description__titre" > ${ProjetPhotographCurrent[i].title}  </p>
                
                            <div class="description__numLike"> 
                            <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                <div class= "numberLikes ${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}" id= "${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}" > ${ProjetPhotographCurrent[i].likes}  </div> 
                                    
                                <i class="fa-solid fa-heart   heartLikeMedia" data-idMediaCurrent =${ProjetPhotographCurrent[i].id} id= "${ProjetPhotographCurrent[i].title.replace(/\s+/g, '')}"></i>
        
                                
                            
                            </div>
                            
                        </div>
        
                    </div>
            
                    </article> 
            
                `
                
                
        
               // articleElement.innerHTML += articleItem;
        
        
                
            }

        }






        ///////////////////////////////////////


    }

    filterMedia()

    

    
       



}

//fonction d'éxécusion 
async function initonePhotographerDataTemplate() {
    // Récupération de photographers, photographersMedia dans la  fonction onePhotographerData() en destructurant
    const { photographers, photographersMedia } = await onePhotographerData(); 

    
    onePhotographerDataTemplate(photographers, photographersMedia);  
   // console.log(  photographersMedia );
    //console.log( photographers);

  
   
}

initonePhotographerDataTemplate();




