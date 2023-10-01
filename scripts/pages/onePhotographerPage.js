


//gestion de onePhotographerTemplate.js
let nomForm
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

    nomForm=name
    //récupération des objets du portfolio du photographe en cours
    let ProjetPhotographCurrent = photographersMedia.filter( item => item.photographerId === parseInt(idPhotographer) )

    //récupération

    console.log(  "******* ProjetPhotographCurrent" );
    console.log( ProjetPhotographCurrent);
   

    /////////////////////////////:

    console.log("** localStorage.length")
    console.log(localStorage.length)

    //saugarde de la listes des medias d'origine dans le localstaorage si le localstorage est vide

    if(localStorage.length === 0){

        console.log("bienvenue dans la condition localStorage.length ===0")

        //conversion de la liste en chaine json
        const listeMediaOriginJson = JSON.stringify(ProjetPhotographCurrent);

         //stockage dans le localstorage
        localStorage.setItem("listeMediaOriginJson", listeMediaOriginJson);


    }
    
    //récupération de laliste des media d'origine du localstorage
    const listeMediaOriginJson = localStorage.getItem("listeMediaOriginJson");

    //conversion en données normales utilisables
    const listeMediaOriginLocalstorage = JSON.parse(listeMediaOriginJson);

    console.log("*** listeMediaOriginLocalstorage")
    console.log(listeMediaOriginLocalstorage)
   

    ///////////////////////////////


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

   

    /***************** gestion  du portfolio ********************** */

   

   // récupération de tous les containers des différents affichage des médias
   const articleContainerParent = document.querySelector(".articleContainerParent")
    const articleElement  = document.querySelector(".articleContainer")

    const populariteParent =  document.querySelector(".populariteParent")
    const popularite  = document.querySelector(".populariteParent__article")

    const titreParent  = document.querySelector(".titreParent")
    const titre  = document.querySelector(".titreParent__article")


    const dateParent  = document.querySelector(".dateParent")
    const date  = document.querySelector(".dateParent__article")




    console.log(ProjetPhotographCurrent.length)

    // console.log("***ProjetPhotographCurrent")
    // console.log(ProjetPhotographCurrent)

    let articleItem 
    
    //creation des medias

    let ShowNormalOrderPopularite 

    
    ///////////////////////////////////////:

   

    let selectValueLocalStorage

    //fonction de mise à jour des résultats du filtre
    const updatefilterPage = (selectValue) => {

        console.log("bienvenue dans la fonction updatefilterPage")

        console.log("**** selectValue dans updatefilterPage")
        console.log(selectValue)

        
        // let selectValueLocalStorage
        // Récupération des données  du filtre (selectValue) du localStorage
        selectValueLocalStorage = localStorage.getItem("selectValue");
        console.log("**** selectValueLocalStorage");
        console.log(selectValueLocalStorage);

        console.log("typeof selectValueLocalStorage : " + typeof selectValueLocalStorage )
       // console.log(selectValueLocalStorage.selectValue)
        
      
        
        /************************************************************* */
        //récupère l'article ou le media du localstorage puis l'insèrre dans la nouvelle liste et enfin range les media ordre croissant
        const listeFilterUpdateFunction = () => {  //selectValue

            //mise à jour du tableau des media avec le local storage
            console.log("**** bienvenue dans la fonction listeFilterUpdateFunction ")
            // ProjetPhotographCurrent  selectValueLocalStorage

                console.log("******ProjetPhotographCurrent dans listeFilterUpdateFunction")
                console.log(ProjetPhotographCurrent)

                // let listeMediaUpdate = []
                let listeMediaUpdate 

                for(let k=0; k<ProjetPhotographCurrent.length; k++){

                    let itemArticle = ProjetPhotographCurrent[k]

                    console.log("*** itemArticle" )
                    console.log( itemArticle)
                    console.log( itemArticle.id + " "  + typeof [itemArticle.id] )
                    console.log( itemArticle.id + " "  + typeof itemArticle.id )
                    
                    // Récupération de  l'objet sérialisé depuis le localStorage
                    let articleString = localStorage.getItem(itemArticle.id ); //[] car je récupère un objet du local storage

                    console.log("*** articleString" )
                    console.log( articleString )
                   

                    // Désérialisation de l'objet articleString en un objet Jason
                    let articleJson = JSON.parse(articleString);

                    console.log("*** articleJson" )
                    console.log( articleJson)


                    if(articleString){  //articleString

                        console.log("***** bienvenue dans le if articleString existe")

                        if( itemArticle.id === articleJson.id){

                            console.log("**** bienvenue dans le if ProjetPhotographCurrent[k].id === articleJson.id")
                            
                            console.log("**** ProjetPhotographCurrent")
                            console.log(ProjetPhotographCurrent)

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
                            //listeMediaUpdate.push(listeMediaFilterCurrent) //attention on a une liste dans une
                            listeMediaUpdate = listeMediaFilterCurrent

                            console.log("**** listeMediaUpdate")
                            console.log(listeMediaUpdate)


                            console.log("**** listeMediaFilterCurrent")
                            console.log(listeMediaFilterCurrent)

                            /******* gestion de la liste du nombre de likes et de son ordement croissant  *******/

                            // let  lisNumberLikeOrderCroissant = [] 
                            let  lisNumberLikeOrderCroissant 
                            
                            lisNumberLikeOrderCroissant  = listeMediaUpdate

                            //ordonnement de la liste du nombre de likes par ordre croissant
                            lisNumberLikeOrderCroissant.sort( (a, b) => {

                                
                                return a.likes - b.likes;
                            })
                            

                            console.log("***** lisNumberLikeOrderCroissant ")
                            console.log(lisNumberLikeOrderCroissant)

                            //converion en string avant le stockage dans le local storage
                            const lisNumberLikeOrderCroissantJSON = JSON.stringify(lisNumberLikeOrderCroissant);

                            //stockage dans le local storage
                            localStorage.setItem('listeArticlesCroissanteLikes', lisNumberLikeOrderCroissantJSON);


                            /******* gestion de la liste des dates et de son ordement croissant  *******/
                            
                             let listeDateOrderCroissantDate = []
                           

                            console.log("*** listeMediaUpdate")
                            console.log(listeMediaUpdate)

                            //listeDateOrderCroissantDate = listeMediaUpdate

                            //conversion des dates en entiers
                            

                            /*
                            for(let d=0; d<listeMediaUpdate.length; d++){

                                let mediaDateCurrent = listeMediaUpdate[d]

                              //modification de la date dans l'objet en format date qui sera reconnu par javascript
                               mediaDateCurrent.date = new Date( mediaDateCurrent.date )

                               //insersion de l'objet modifié dans la liste listeDateOrderCroissantDate
                               listeDateOrderCroissantDate.push( mediaDateCurrent.date = new Date( mediaDateCurrent.date )   )
                                
                                
                            }

                            console.log("*** listeDateOrderCroissantDate non ordonnée")
                            console.log(listeDateOrderCroissantDate)
                            
                            */

                             //ordonnement de la liste de dates par ordre croissant
                             listeMediaUpdate.sort( (a, b) => {

                                
                                return new Date(a.date) - new Date(b.date);  //conversion en entier de la date
                            })


                            console.log("***** listeDateOrderCroissantDate ordonnée ")
                            console.log(listeDateOrderCroissantDate)

                         

                            //converion en string avant le stockage dans le local storage
                            const lisNumberLikeOrderCroissantDateJSON = JSON.stringify(listeDateOrderCroissantDate);

                               //stockage dans le local storage
                               localStorage.setItem('listeDateOrderCroissantDate', lisNumberLikeOrderCroissantDateJSON);


                            /******* gestion de la liste des titres et de son ordement croissant  *******/
                            let listeTitreOrderCroissant

                            listeTitreOrderCroissant = listeMediaUpdate

                             //ordonnement de la liste des titres par ordre croissant
                             listeTitreOrderCroissant.sort( (a, b) => {

                                
                                return a.title.localeCompare(b.title) ;  //.replace(/\s+/g, '')
                            })


                            console.log("***** listeTitreOrderCroissant non ordonnée ")
                            console.log(listeTitreOrderCroissant)

                         

                            //converion en string avant le stockage dans le local storage
                            const listeTitreOrderCroissantJSON = JSON.stringify(listeTitreOrderCroissant);

                               //stockage dans le local storage
                               localStorage.setItem('listeTitreOrderCroissant', listeTitreOrderCroissantJSON);


                               console.log("***** listeTitreOrderCroissant ordonnée")
                               console.log(listeTitreOrderCroissant)
                                /////////////////////////////////

                        }


                        //si on a pas cliqué sur le coeur 
                   }else{

                             /******* gestion de la liste du nombre de likes et de son ordement croissant  *******/

                            // let  lisNumberLikeOrderCroissant = [] 
                            let  lisNumberLikeOrderCroissant 
                            
                            lisNumberLikeOrderCroissant  = ProjetPhotographCurrent //listeMediaUpdate

                            console.log("***** lisNumberLikeOrderCroissant ")
                            console.log(lisNumberLikeOrderCroissant)
                            

                            //ordonnement de la liste du nombre de likes par ordre croissant
                            lisNumberLikeOrderCroissant.sort( (a, b) => {

                                
                                return a.likes - b.likes;
                            })
                            

                            console.log("***** lisNumberLikeOrderCroissant ")
                            console.log(lisNumberLikeOrderCroissant)

                            //converion en string avant le stockage dans le local storage
                            const lisNumberLikeOrderCroissantJSON = JSON.stringify(lisNumberLikeOrderCroissant);

                            //stockage dans le local storage
                            localStorage.setItem('listeArticlesCroissanteLikes', lisNumberLikeOrderCroissantJSON);


                            /******* gestion de la liste des dates et de son ordement croissant  *******/
                            
                           
                                //lisNumberLikeOrderCroissant  = ProjetPhotographCurrent
                             let listeDateOrderCroissant = ProjetPhotographCurrent

                            //listeDateOrderCroissantDate = listeMediaUpdate

                             //ordonnement de la liste de dates par ordre croissant
                             listeDateOrderCroissant.sort( (a, b) => {

                                
                                return new Date(a.date) - new Date(b.date);  //conversion en entier de la date
                            })


                            console.log("***** listeDateOrderCroissant ordonnée ")
                            console.log(listeDateOrderCroissant)

                         
                            //converion en string avant le stockage dans le local storage
                            const listeDateOrderCroissantJSON = JSON.stringify(listeDateOrderCroissant);

                               //stockage dans le local storage
                               localStorage.setItem('listeDateOrderCroissant', listeDateOrderCroissantJSON);


                            /******* gestion de la liste des titres et de son ordement croissant  *******/
                            let listeTitreOrderCroissant

                            listeTitreOrderCroissant = ProjetPhotographCurrent

                             //ordonnement de la liste des titres par ordre croissant
                             listeTitreOrderCroissant.sort( (a, b) => {

                                
                                return a.title.localeCompare(b.title) ;  //.replace(/\s+/g, '')
                            })


                            console.log("***** listeTitreOrderCroissant non ordonnée ")
                            console.log(listeTitreOrderCroissant)

                         

                            //converion en string avant le stockage dans le local storage
                            const listeTitreOrderCroissantJSON = JSON.stringify(listeTitreOrderCroissant);

                               //stockage dans le local storage
                               localStorage.setItem('listeTitreOrderCroissant', listeTitreOrderCroissantJSON);


                               console.log("***** listeTitreOrderCroissant ordonnée")
                               console.log(listeTitreOrderCroissant)
                                /////////////////////////////////


                   }



                }




        }

        //éxécution de la fonction listeFilterUpdateFunction
        listeFilterUpdateFunction()




        //////////////////////////////////////////////////////////////////////////




             /***************** gestion  et création du formulaire  du trie ********************** */
    
                // récupération du formulaire ///////////////
                let formElement = document.querySelector(".form");


                //deuxième formulaire de type select
            const deuxiemeForm = `
            
            <div class="filterTitre" style=" display: block;">
                Trier par
            </div>

            <div class="filterTitre2"  style=" display: none;">
                Trier par 
            </div>

            <div id="deuxiemeFormulaire" >
                
                
                <button  class="optionPopularite" id="optionPopularite"  style="display: block;"> <span>Popularité</span> <span class="arrowDown"> <i class="fa-solid fa-angle-down"></i> </span> </button>
                
                <button   class="optionPopularite  optionDate" id="optionDate" style="display: none;"> <span>Date</span>  <span class="arrowDown"> <i class="fa-solid fa-angle-down"></i> </span> </button>

                <button  class="optionPopularite optionTitre" id="optionTitre" style="display: none;">  <span>Titre</span> <span class="arrowDown"> <i class="fa-solid fa-angle-down"></i> </span> </button>

                

                <select id="triDateTitre"  class="select2"  name="triDateTitre"  style="display: none;" size="3" >

                    
                    <option   value="Popularite" class="optionBar populariteElement"   style="display: block;" >Popularité  </option>
                    <option value="Date" class="optionBar dateElement"  style="display: block;" >Date</option>
                    <option value="Titre"   class="titreElement" style="display: block;">Titre</option>
                    

                </select>
                <div class="arrowUp" style="display:none"> <i class="fa-solid fa-angle-up"></i> </div>

            </div>
            `;



            //Ajout du formulaire dans au formulaire parent 
            formElement.innerHTML = deuxiemeForm
            
            //récupération des élément
            const filterTitre = document.querySelector(".filterTitre")
            const filterTitre2 = document.querySelector(".filterTitre2")
            const optionPopularite = document.querySelector("#optionPopularite")
            const arrowUp = document.querySelector(".arrowUp")
            const select2 = document.querySelector(".select2")
            const optionDate = document.querySelector("#optionDate")
            const optionTitre = document.querySelector("#optionTitre")

            
            //insersion des évennements pour l'affichage du filtre à trois valeurs

                //gestion de l'affichage des autres valeurs si on sélectionne une valeur dans les filtre
                let listesOptionElement = [ optionPopularite, optionDate, optionTitre ]

                for(let i=0; i<listesOptionElement.length; i++){

                    let itemOption = listesOptionElement[i]

                    console.log("**itemOption")
                    console.log(itemOption)

                   // itemOption.style.display = "block"

                    itemOption.addEventListener("click", ()=>{

                    console.log("bienvenue à l'évennement triDateTitre ")
            
                    
                    filterTitre2.style.display = "block"
                    select2.style.display = "block"
                    arrowUp.style.display = "block"
            
                    itemOption.style.display = "none"
                    filterTitre.style.display = "none"
            
                    
                })

                }

            
                
            //fermeture du filtre quand on a perdu le focus
            select2.addEventListener("blur", () => {
                
                console.log("****bienvenue dans l'evennement blur")

                select2.style.display = "none";
                arrowUp.style.display = "none";
                filterTitre2.style.display = "none";

                // optionPopularite.style.display = "block"
               filterTitre.style.display = "block"
            });
            
            

            //gestion de la modification du size du filtre après avoir choisi valeur dans le filtre
            select2.addEventListener("change", function() {

                console.log("*** bienvenue dans l'evennement change du filtre pour modifier le size " );

                
                // Code à exécuter lorsque l'option est sélectionnée
                const selectedValueoption = select2.value; // Obtenez la valeur de l'option sélectionnée
                console.log("Option sélectionnée : " + selectedValueoption);
                
                
                // Exécutez d'autres actions en fonction de la sélection
                if (selectedValueoption === "Popularite") {
                
                    
                    console.log("bienvenue à l'évennement Popularite ")

                    select2.style.display = "none";
                    optionPopularite.style.display = "block";

                    //////////////:
                    console.log("***optionDate")
                    console.log(optionDate)

                    console.log("***optionTitre")
                    console.log(optionTitre)

                    ///////////////

                        /////////////////////////////////////////////:

                        // Récupération de la valeur sélectionnée
                        let selectValue = select2.value;

                        console.log("***** selectValue ")
                        console.log(selectValue)


                        console.log("typeof selectValue : " + typeof selectValue )

                        //ajout dans le local storage
                        localStorage.setItem("selectValue", selectValue );

                        //éxécution de la fonction de gestion d'affichage des medias
                        updatefilterPage(selectValue) 

                        
                    /////////////////////////////////////////////////


                } else if (selectedValueoption === "Date") {
                    
                    console.log("bienvenue à l'évennement Date ")

                    select2.style.display = "none";
                    optionDate.style.display = "block";

                    optionPopularite.style.display = "none";
                    optionTitre.style.display = "none";


                    ///////////////////
                    console.log("***optionDate")
                    console.log(optionDate)

                    console.log("***optionTitre")
                    console.log(optionTitre)

                    console.log("***optionPopularite")
                    console.log(optionPopularite)

                    ////////////////////////


                        /////////////////////////////////////////////:

                    // Récupération de la valeur sélectionnée
                    let selectValue = select2.value;

                    console.log("***** selectValue ")
                    console.log(selectValue)


                    console.log("typeof selectValue : " + typeof selectValue )

                    //ajout dans le local storage
                    localStorage.setItem("selectValue", selectValue );

                    //éxécution de la fonction de gestion d'affichage des medias
                    updatefilterPage(selectValue) 




                    /////////////////////////////////////////////////
                    
            
                } else if (selectedValueoption === "Titre") {
                    
                    console.log("bienvenue à l'évennement triDateTitre ")

                    select2.style.display = "none";
                    optionTitre.style.display = "block";

                    optionPopularite.style.display = "none";
                    optionDate.style.display = "none";

                    ///////////////////
                    console.log("***optionDate")
                    console.log(optionDate)

                    console.log("***optionTitre")
                    console.log(optionTitre)

                    console.log("***optionPopularite")
                    console.log(optionPopularite)

                    ////////////////////////

                        /////////////////////////////////////////////:

                    // Récupération de la valeur sélectionnée
                    let selectValue = select2.value;

                    console.log("***** selectValue ")
                    console.log(selectValue)


                    console.log("typeof selectValue : " + typeof selectValue )

                    //ajout dans le local storage
                    localStorage.setItem("selectValue", selectValue );

                    //éxécution de la fonction de gestion d'affichage des medias
                    updatefilterPage(selectValue) 




                    /////////////////////////////////////////////////

                    
                }
                
            });

            // Ajout de l'événement 'beforeunload' à la fenêtre qui permet d'éxécuter un code avant actualisation de la page
            //ici je supprime selectValue du localstorage à chaque actualisation de la page
            window.addEventListener('beforeunload', ()=>{

                // Supprimer de selectValue du localStorage
                //localStorage.removeItem('selectValue');
                localStorage.clear();

            });


          
        
        //////////////////////////////////////////////////////////////////////////
        
        

        //fonction d'affichage des articles mis à jour
        const showNewArticleFunction = ( ) => { //selectValue

                console.log("***** bienvenue dans la showNewArticleFunction ")


                //récupération de la lisNumberLikeOrderCroissantJSON   dans le local storage
                const lisNumberLikeOrderCroissantJSON  = localStorage.getItem('listeArticlesCroissanteLikes');

                //convertion en tableau normal
                const lisNumberLikeOrderCroissant = JSON.parse(lisNumberLikeOrderCroissantJSON);

                console.log("****lisNumberLikeOrderCroissant1 dans la fonction showNewArticleFunction")
                
                console.log(lisNumberLikeOrderCroissant)

                console.log("**** selectValue")
                console.log(selectValue)


                /******  gestion de la récupération de la liste listeDateOrderCroissantDate ******* */

                const listeDateOrderCroissantDateJSON = localStorage.getItem('listeDateOrderCroissant');

                //convertion en tableau normal
                const listeDateOrderCroissantDate = JSON.parse(listeDateOrderCroissantDateJSON);

                console.log("****listeDateOrderCroissantDate ordonnée dans la fonction showNewArticleFunction")
                
                console.log(listeDateOrderCroissantDate)

                console.log("**** selectValue")
                console.log(selectValue)

                /******  gestion de la récupération de la liste des titres croissants ******* */

                const listeTitreOrderCroissantJSON = localStorage.getItem('listeTitreOrderCroissant');

                //convertion en tableau normal
                const listeTitreOrderCroissant = JSON.parse(listeTitreOrderCroissantJSON);

                console.log("****listeTitreOrderCroissant dans la fonction showNewArticleFunction")
                
                console.log(listeTitreOrderCroissant)

                console.log("**** selectValueLocalStorage")
                console.log(selectValueLocalStorage)
            

                if(  selectValueLocalStorage === "Popularite" || !selectValueLocalStorage ) {   //selectValueLocalStorage === "Popularite" && lisNumberLikeOrderCroissant


                    console.log("***** bienvenue dans le if  selectValueLocalStorage && listeTitreOrderCroissant")
                    //console.log(selectValueLocalStorage.selectValue)

                
                    ///////////////
                    // Suppression de certains tableaux du localStorage
                    localStorage.removeItem('listeTitreOrderCroissant');
                    localStorage.removeItem('listeDateOrderCroissantDate');


                    //masquage des autres block des médias 
                    articleContainerParent.style.display = "none"
                    titreParent.style.display = "none"
                    dateParent.style.display = "none"
                    
                    //démasquage du block des medias popularite
                    
                    populariteParent.style.display = "block"

                    ///////////////
                

                    //rangement par nombre de likes croissants
                    for(let i = 0; i < lisNumberLikeOrderCroissant.length; i++){

                        let lisNumberLikeOrderCroissant1 = lisNumberLikeOrderCroissant[i]

                       // console.log("lisNumberLikeOrderCroissant1")
                       // console.log(lisNumberLikeOrderCroissant1)

                        /////////////////////////
                        //gestion de la miniature
                        if(lisNumberLikeOrderCroissant1.video){

                            articleItem = `

                                <div class="articlePortfolioitem > 
                                
                                    <div class="articlePortfolio__item">
                            
                                        <button class="articlePortfolio__item--img imgVideo${lisNumberLikeOrderCroissant1.id}"
                                        
                                            style=" background-image: url('./assets/miniatures/iaTest.jpg');
                                            background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                        
                                        </button>
                                        
                                    
                                        <div class="articlePortfolio__item--description description">
                                        
                                            <p class="description__titre" > ${lisNumberLikeOrderCroissant1.title}  </p>
                                
                                            <div class="description__numLike"> 

                                                    <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                            <div class= "numberLikes ${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}  ${lisNumberLikeOrderCroissant1.id}"  id= ${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}  data-idMediaCurrent =${lisNumberLikeOrderCroissant1.id} > ${lisNumberLikeOrderCroissant1.likes}  </div> 
                                                    
                                            <button class="heartLikeMedia" data-idMediaCurrent =${lisNumberLikeOrderCroissant1.id} id= "${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}">  <i class="fa-solid fa-heart" ></i> </button>

                                            
                                            
                                            </div>
                                            
                                        </div>

                                    </div>
                            
                                </div> 
                            
                                `
                                popularite.innerHTML += articleItem;

                        }else{

                            articleItem = `

                            <div class="articlePortfolioitem" > 
                            
                                <div class="articlePortfolio__item">
                        
                                    <button class="articlePortfolio__item--img imgVideo${lisNumberLikeOrderCroissant1.id}"
                                    
                                        style=" background-image: url('./assets/photographersMedia/${lisNumberLikeOrderCroissant1.image}');
                                        background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                    
                                    </button>
                                    
                                
                                    <div class="articlePortfolio__item--description description">
                                        <p class="description__titre" > ${lisNumberLikeOrderCroissant1.title}  </p>
                            
                                        <div class="description__numLike"> 

                                                <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                        <div class= "numberLikes ${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}  ${lisNumberLikeOrderCroissant1.id}"  id= ${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}  data-idMediaCurrent =${lisNumberLikeOrderCroissant1.id} > ${lisNumberLikeOrderCroissant1.likes}  </div> 
                                                
                                        <button class="heartLikeMedia" data-idMediaCurrent =${lisNumberLikeOrderCroissant1.id} id= "${lisNumberLikeOrderCroissant1.title.replace(/\s+/g, '')}">  <i class="fa-solid fa-heart" ></i> </button>

                                        
                                        
                                        </div>
                                        
                                    </div>

                                </div>
                        
                            </div> 
                        
                            `
                            popularite.innerHTML += articleItem;

                        }


                        ////////////////////////

                        
                    
                    //éxécution de la fonction d'affichage de la liste des médias initiale
                    //listeArticleNormalFunction()

                       // popularite.innerHTML += articleItem;

                       // articleElement.innerHTML += articleItem;
                       
                    
                    

                    }

                    //////////////////////////////////////////////////

                    

                    //rangement par ordre de dates croissantes
                } else if( selectValueLocalStorage === "Date" && listeDateOrderCroissantDate ) {   //selectValueLocalStorage === "Date" &&


                    console.log("***** bienvenue dans le if  selectValueLocalStorage && lisNumberLikeOrderCroissant")
                    //console.log(selectValueLocalStorage.selectValue)

                    console.log("****listeDateOrderCroissantDate")
                    console.log(listeDateOrderCroissantDate)
                    ///////////////

                    // Suppression de certains tableaux du localStorage
                    localStorage.removeItem('lisNumberLikeOrderCroissant');
                    localStorage.removeItem('listeTitreOrderCroissant');
                   


                    //masquage des autres block des médias 
                    articleContainerParent.style.display = "none"
                    titreParent.style.display = "none"
                    populariteParent.style.display = "none"
                    
                    //démasquage du block des medias popularite
                    
                    dateParent.style.display = "block"

                    ///////////////
                

                    for(let i = 0; i < listeDateOrderCroissantDate.length; i++){

                        let listeDateOrderCroissantDate1 = listeDateOrderCroissantDate[i]

                        //console.log("listeDateOrderCroissantDate")
                       // console.log(listeDateOrderCroissantDate1)

                        //gestion de la miniature
                        if(listeDateOrderCroissantDate1.video){

                            articleItem = `

                            <div class="articlePortfolioitem" "> 
                            
                                <div class="articlePortfolio__item">
                        
                                    <button class="articlePortfolio__item--img imgVideo${listeDateOrderCroissantDate1.id}"
                                    
                                        style=" background-image: url('./assets/miniatures/iaTest.jpg');
                                        background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                    
                                    </button>
                                    
                                    <div class="articlePortfolio__item--description description">
                                        <p class="description__titre" > ${listeDateOrderCroissantDate1.title}  </p>
                            
                                        <div class="description__numLike"> 
    
                                                <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                        <div class= "numberLikes ${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}  ${listeDateOrderCroissantDate1.id}"  id= ${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}  data-idMediaCurrent =${listeDateOrderCroissantDate1.id} > ${listeDateOrderCroissantDate1.likes}  </div> 
                                                
                                        <button class="heartLikeMedia" data-idMediaCurrent =${listeDateOrderCroissantDate1.id} id= "${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}"> <i class="fa-solid fa-heart" ></i> </button>
    
                                        
                                        
                                        </div>
                                        
                                    </div>
    
                                </div>
                        
                            </div> 
                        
                            `
    
                            date.innerHTML += articleItem;

                        }else{

                            articleItem = `

                            <div class="articlePortfolioitem"> 
                            
                                <div class="articlePortfolio__item">
                        
                                    <button class="articlePortfolio__item--img imgVideo${listeDateOrderCroissantDate1.id}"
                                    
                                        style=" background-image: url('./assets/photographersMedia/${listeDateOrderCroissantDate1.image}');
                                        background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                    
                                    </button>
                                    
    
                                    <div class="articlePortfolio__item--description description">
                                        <p class="description__titre" > ${listeDateOrderCroissantDate1.title}  </p>
                            
                                        <div class="description__numLike"> 
    
                                                <!-- replace(/\s+/g, '') expression régulière permettant de supprimer les espaces dans toute la chaine -->
                                        <div class= "numberLikes ${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}  ${listeDateOrderCroissantDate1.id}"  id= ${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}  data-idMediaCurrent =${listeDateOrderCroissantDate1.id} > ${listeDateOrderCroissantDate1.likes}  </div> 
                                                
                                        <button class="heartLikeMedia" data-idMediaCurrent =${listeDateOrderCroissantDate1.id} id= "${listeDateOrderCroissantDate1.title.replace(/\s+/g, '')}" >  <i class="fa-solid fa-heart" ></i> </button>
    
                                        
                                        
                                        </div>
                                        
                                    </div>
    
                                </div>
                        
                            </div> 
                        
                            `
                        
    
                            date.innerHTML += articleItem;


                            
                        }
                       
                 
                    }

                   

                    //rangement par ordre de titre croissant
                } else if( selectValueLocalStorage === "Titre" && listeTitreOrderCroissant ) {   //selectValueLocalStorage === "Titre" &&


                    console.log("***** bienvenue dans le if  selectValueLocalStorage && listeTitreOrderCroissant1")

                    console.log("**** listeTitreOrderCroissant")
                    console.log(listeTitreOrderCroissant)

                    // Suppression de certains tableaux du localStorage
                    localStorage.removeItem('listeDateOrderCroissantDate');
                    localStorage.removeItem('lisNumberLikeOrderCroissant');
                  
                  
                    ///////////////
                    //masquage des autres block des médias 
                    articleContainerParent.style.display = "none"
                    populariteParent.style.display = "none"
                    dateParent.style.display = "none"
                    
                    //démasquage du block des medias popularite
                    
                    titreParent.style.display = "block"

                    ///////////////
                

                    for(let i = 0; i < listeTitreOrderCroissant.length; i++){

                        let listeTitreOrderCroissant1 = listeTitreOrderCroissant[i]

                        console.log("listeTitreOrderCroissant1")
                        console.log(listeTitreOrderCroissant1)

                        //gestion de la miniature
                        if(listeTitreOrderCroissant1.video){

                            articleItem = `

                            <div class="articlePortfolioitem""> 
                            
                                <div class="articlePortfolio__item">
                        
                                    <button class="articlePortfolio__item--img imgVideo${listeTitreOrderCroissant1.id}"
                                    
                                        style=" background-image: url('./assets/miniatures/iaTest.jpg');
                                        background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                    
                                    </button>
                                
    
                                    <div class="articlePortfolio__item--description description">
                                        <p class="description__titre" > ${listeTitreOrderCroissant1.title}  </p>
                            
                                        <div class="description__numLike"> 
    
    
    
                                                
                                            <div class= "numberLikes ${listeTitreOrderCroissant1.title.replace(/\s+/g, '')}  ${listeTitreOrderCroissant1.id} "  id= ${listeTitreOrderCroissant1.title.replace(/\s+/g, '')} data-idMediaCurrent =${listeTitreOrderCroissant1.id} > ${listeTitreOrderCroissant1.likes}  </div> 
                                                
                                            <button class="heartLikeMedia"data-idMediaCurrent =${listeTitreOrderCroissant1.id} id= "${listeTitreOrderCroissant1.title.replace(/\s+/g, '')}" > <i class="fa-solid fa-heart" ></i> </button>
    
                                            
                                            
                                        </div>
                                        
                                    </div>
    
                                </div>
                        
                            </div> 
                        
                            `
                        
                            //éxécution de la fonction d'affichage de la liste des médias initiale
                            //listeArticleNormalFunction()
    
                            titre.innerHTML += articleItem;


                        }else{

                            articleItem = `

                            <div class="articlePortfolioitem" > 
                            
                                <div class="articlePortfolio__item">
                        
                                    <button class="articlePortfolio__item--img imgVideo${listeTitreOrderCroissant1.id}"
                                    
                                        style=" background-image: url('./assets/photographersMedia/${listeTitreOrderCroissant1.image}');
                                        background-repeat: no-repeat; background-position: center center; background-size: cover; "> 
                                    
                                    </button>
                                    
                                   
                                    <div class="articlePortfolio__item--description description">
                                        <p class="description__titre" > ${listeTitreOrderCroissant1.title}  </p>
                            
                                        <div class="description__numLike"> 
    
    
    
                                                
                                            <div class= "numberLikes ${listeTitreOrderCroissant1.title.replace(/\s+/g, '')}  ${listeTitreOrderCroissant1.id} "  id= ${listeTitreOrderCroissant1.title.replace(/\s+/g, '')} data-idMediaCurrent =${listeTitreOrderCroissant1.id} > ${listeTitreOrderCroissant1.likes}  </div> 
                                                
                                           <button class="heartLikeMedia" data-idMediaCurrent =${listeTitreOrderCroissant1.id} id= "${listeTitreOrderCroissant1.title.replace(/\s+/g, '')}" > <i class="fa-solid fa-heart"></i> </button>
    
                                            
                                            
                                        </div>
                                        
                                    </div>
    
                                </div>
                        
                            </div> 
                        
                            `
                        
    
                            titre.innerHTML += articleItem;

                        }

                      
                    }

                   
                }  


        }

        //éxécution de la fonction showNewArticleFunction
        showNewArticleFunction()



    }

    updatefilterPage() 

    /*************** gestion des likes et du total des likes   *********************/

    ///////////////////////////////////////////////

     //récupération de tous les coeurs
     const listeMedia = document.getElementsByClassName("heartLikeMedia")
        
    for( let j=0; j< listeMedia.length; j++){

        let  currentElementHeart = listeMedia[j]

       // console.log("****currentElementHeart")
       // console.log(currentElementHeart)

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

                //récupération de l'objet média en cours mais dans la liste de media d'origine
            //car je veux le nombre de likes innitial pour faire la différence avec le nouveau
            const mediaCurrentOrigin = listeMediaOriginLocalstorage.find( item => item.id === idMediaCurrent )

            console.log("*** mediaCurrentOrigin")
            console.log(mediaCurrentOrigin)
            

            //mediaCurrent.likes += 1 

            console.log("*** mediaCurrent.likes : " + mediaCurrent.title + ": "+ mediaCurrent.likes  );

        
            /////////////////////////////////////////////////
            //récupération d'un like spécifique
            
            //supression des espaces dans toutes la chaine avec cette expression régulière .replace(/\s+/g, '')
            let titleMedia = mediaCurrent.title.replace(/\s+/g, '')

                console.log("**** titleMedia")
                console.log(titleMedia)

            //récupération du  nombre de likes en question
            let numberLikeCurrent = document.querySelector(`.${titleMedia}`)
            
                console.log("*** numberLikeCurrent ")
                console.log(numberLikeCurrent.innerText )

            // Récupération des données dans le localstorage
            let titleLocastorage = localStorage.getItem(`${titleMedia}`);

                console.log("***** titleLocastorage")
                console.log(titleLocastorage)
            
            //vérification si  ce title est déjà dans le localstorage
            if(titleLocastorage  ){

                console.log("************* le localstorage contient cette donnée")
                

                

                if(mediaCurrentOrigin.likes < mediaCurrent.likes){

                    numberLikeCurrent.innerText = mediaCurrentOrigin.likes
                

                    //mise à jour de likes dans l'objet mediaCurrent
                    mediaCurrent.likes = mediaCurrentOrigin.likes 

                    console.log("**** mediaCurrent.likes après la mise à jour de l'objet")
                    console.log(mediaCurrent)


                    console.log("**** mediaCurrentOrigin")
                    console.log(mediaCurrentOrigin)

                
                    //conversion de l'objet en string avant de le stocker dans le local storage car ne prend que des string
                   // localStorage.setItem(`${mediaCurrent.id }`, JSON.stringify(mediaCurrent));

                   console.log(  "***** mediaCurrentOrigin.likes" + " "+  mediaCurrentOrigin.likes )
            
                   //mise à jour du localstorage
                   localStorage.setItem(`${titleMedia}`, `${mediaCurrentOrigin.likes}`);


                }else{

                    numberLikeCurrent.innerText = mediaCurrentOrigin.likes + 1
                
                    

                    //mise à jour de likes dans l'objet mediaCurrent
                    mediaCurrent.likes = mediaCurrentOrigin.likes + 1

                    console.log("**** mediaCurrent.likes après la mise à jour de l'objet")
                    console.log(mediaCurrent.likes)

                    console.log("**** mediaCurrentOrigin")
                    console.log(mediaCurrentOrigin.likes)

                
                    //conversion de l'objet en string avant de le stocker dans le local storage car ne prend que des string
                    //localStorage.setItem(`${mediaCurrent.id }`, JSON.stringify(mediaCurrent));

                    console.log(  "***** mediaCurrent.likes" + " "+  mediaCurrent.likes )
            
                    //mise à jour du localstorage
                    localStorage.setItem(`${titleMedia}`, `${mediaCurrent.likes}`);
                    
                    
                }
                

                
                console.log("************* valeur dans le local en fin sachant que donnée existait déjà" + " " +localStorage.getItem(`${titleMedia}`) )

                
                //éxécution de la fonction de mise a jour du like du dom
                updateNumberlikesFunction(customDataValue, titleMedia, numberLikeCurrent )

                //éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
                totalLikePriceFunction()


            }else{

                console.log("************* le localstorage est vide pour cette donnée")
                //si ce title n'est pas dans localstorage
                //sauvegarde de ce title dans le localstorage
                
                let likeValue = parseInt(numberLikeCurrent.innerText)
                let likeIncrement = likeValue + 1

                ///////////////////////////

                
                //mise à jour de l'objet encours
                mediaCurrent.likes = likeIncrement //mise à jour de likes dans l'objet mediaCurrent

                console.log("************* mediaCurrent.likes = likeValue")
                console.log(mediaCurrent)

            
                //conversion de l'objet en string avant de le stocker dans le local storage car ne prend que des string
               // localStorage.setItem(`${mediaCurrent.id}`, JSON.stringify(mediaCurrent));

            
                ///////////////////////////

                console.log(  "***** likeIncrement" + " "+likeIncrement )
            
                //mise à jour du localstorage
                localStorage.setItem(`${titleMedia}`, `${likeIncrement}`);


                console.log("************* valeur dans le local en fin sachant que donnée n'existait pas " + " " +localStorage.getItem(`${titleMedia}`) )
            
                //éxécution de la fonction de mise a jour du like du dom
                updateNumberlikesFunction(customDataValue, titleMedia,numberLikeCurrent )

                //éxécution de la fonction totalLikePriceFunction de mis à jour du total de likes
                totalLikePriceFunction()

            

            }
            
            


            /////////////////////////////////////////////////
        
            let incrementation = 1
            totalLikePriceFunction(incrementation)

            
        
        });


    }

    /////////////////////////////////////////::::

     

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

                        //éxécution de la fonction d'affichage des articles
                        //showNewArticleFunction()

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

   /****************************  gestion du formulaire contactez-moi******************************************** */


    let contact_button = document.querySelector(".contact_button")

    let photographHeader = document.querySelector(".photograph-header")
    let containerFormulaireContact1 = document.querySelector(".containerFormulaireContact")
   
    let sectionMain = document.querySelector(".sectionMain")
   
    // Création du formulaire.
    const formulaireContact = `

    
    <div id="formulaireContact"  role="information" aria-labelledby="coordonnees du photographe" >
    
        <div class="titreContact ">
            <p class="titreContact__itre"> contactez-moi ${nomForm} </p>
           
            <button class="titreContact__image">
                <i class="fa-solid fa-x" ></i>
            </button>
        </div> 

        <div  class="conatainerItem" >
            <label for="prenom"  class="tailleContainer" >Prénom </label>
            <input type="text" id="prenom" name="prenom" class="tailleContainer input1" placeholder="Henri Matis" >
        </div>

        <div  class="conatainerItem">
            <label for="nom" class="tailleContainer">Nom </label>
            <input type="text" id="nom" name="nom" class="tailleContainer"  placeholder="Pierre" >
        </div>

        <div  class="conatainerItem">
            <label for="email" class="tailleContainer">Email </label>
            <input type="email" id="email" name="email" class="tailleContainer"  placeholder="henripierre@yahoo.fr">
        </div>

        <div  class="conatainerItem">
            <label for="message" class="tailleContainer message">Message </label>
            <textarea id="message" name="message"   class="tailleContainer"  placeholder="Entrez votre message " ></textarea>
        </div>

      
        <input type="submit" value="Envoyer"  class="inputbtn" >
     
       

    </div>
    `;

    // Ajout du formulaire au conteneur sélectionné.
    // photographHeader.innerHTML = formulaireContact;
    containerFormulaireContact1.innerHTML = formulaireContact

    //récupération du formulaire de contact
    let formuContact = document.querySelector("#formulaireContact")

    //récupération du premier input du formulaire
    let input1Contact = document.querySelector(".input1")

   // console.log("**** formuContact")
   // console.log(formuContact)

    //console.log("**** input1Contact")
    //console.log(input1Contact)
    
    //input1Contact.focus()

    //récupération de l'image croix 
    let imageCroix = document.querySelector(".titreContact__image")

    //insertion de l'evennement pour la fermeture de la modale
    imageCroix.addEventListener("click", () =>{

        containerFormulaireContact1.style.display = "none";

        //gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
        photographHeader.style.opacity = 1;
        sectionMain.style.opacity = 1;

    })


    //insertion de l'evennement pour ouvrir la modale
    contact_button.addEventListener( "click", () =>{

        console.log("bienvenue dans le formulaire")

        containerFormulaireContact1.style.display = "block";

        //gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
        photographHeader.style.opacity = 0.5;
        sectionMain.style.opacity = 0.5;

        //gestion du focus et du retrait du focus 
       // input1Contact.focus(); // permet le focus sur le premier champ  du formulaire
        formuContact.focus()

    })

    let inputbtn = document.querySelector(".inputbtn")

    //récupération du formulaire
    const formContact = document.querySelector("#formulaireContact")

    //récupération de tous les champs de formulaire
    const prenom = document.querySelector("#prenom")
    const nom = document.querySelector("#nom")
    const email = document.querySelector("#email")
    const message = document.querySelector("#message")


    // Ajout d'un événement pour le submit
    inputbtn.addEventListener("click",(e) => {
       
       // e.preventDefault();

        console.log("bienvenue dans l'évennement de la soumission du formulaire")

        /*
        //création de l'objet FormData avec le formulaire
        const formData = new FormData(formContact)

        //récupération des valeurs des champs
        const prenom = formData.get("prenom");
        const nom = formData.get("nom");
        const email = formData.get("email");
        const message = formData.get("message");
        */

        // Afficheage des valeurs dans la console
        console.log("Preom : " + prenom.value);
        console.log("Nom : " + nom.value);
        console.log("Email : " + email.value);
        console.log("Message : " + message.value);


        //vidage des champs du formulaire
        prenom.value = ""
        nom.value = ""
        email.value = ""
        message.value = ""


        containerFormulaireContact1.style.display = "none";

        //gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
        photographHeader.style.opacity = 1;
        sectionMain.style.opacity = 1;

    })


    /***************************** gestion de la lightbox ******************************************** */
    const mediaPhotographe = ProjetPhotographCurrent

    console.log(  "******* mediaPhotographe" );
    console.log( mediaPhotographe);

    //récupération des images de media 
    let imageMedia = mediaPhotographe.map(item => item.image || item.video)
    let titreMedia = mediaPhotographe.map(item => item.title )
    
    

    //récupération de la taille du tableau des images de medias
    const imageMediaLength = imageMedia.length

    console.log(imageMedia)
    console.log(imageMedia[0])

    console.log("titreMedia")
    console.log(titreMedia)

    let currentIndex = 0;

    const lightbox = `
    
        <div class="lightbox">

            

            <div class="arrowContainerlightbox">

                <div class="lockLightbox">
                  
                </div>

                <div class="arrowrigthLeft arrowleft">
                    <button class="prev-button" >
                        <i class="fa-solid fa-angle-left prev-button"></i>
                    </button  >
                </div>
            
            </div>

            <div class="containerMediaImg imageContainer" style="display: block;">

                <div class="image" style="background-image: url('./assets/photographersMedia/${imageMedia[0]}');
                    background-repeat: no-repeat; background-position: center center; background-size: cover;">
                </div>
                <div class="titreLightbox">${titreMedia[currentIndex]}</div>

            </div>
            
                   
            <div class="containerMediaImg videoContainer" style="display: none;">
                <div class="videoContainer image">
                    <video class="video" src="./assets/photographersMedia/${imageMedia[0]}" >
                    </video>
                </div>
                <div class="titreLightbox">${titreMedia[currentIndex]}</div>
            </div>

            <div class="arrowContainerlightbox">

                <button class="lockLightbox lockLightboxBtn" >
                    <i class="fa-solid fa-x" ></i>
                </button>

                <div class="arrowrigthLeft arrowrigth ">

                    <button class=" next-button" >
                        <i class="fa-solid fa-angle-right "></i>
                    </button>

                </div>
            
            </div>

        </div>
       
    
    
    `

    const containerLightbox = document.querySelector(".containerLightbox")
    containerLightbox.innerHTML = lightbox


    //récupération des élements
    const imageContainer = document.querySelector(".imageContainer")
    const imagelightbox = document.querySelector(".image")
    const videoContainer = document.querySelector(".videoContainer")
    const videolightbox = document.querySelector(".video")
    const titreLightbox= document.querySelector(".titreLightbox")
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    let containerMediaImg = document.querySelector(".containerMediaImg")


    //gestion de l'index de l'image
   const showImage = (index) => {

        if( imageMedia[index].includes("jpg") ){

            console.log("**** bienvenue dans les images")
            
            videoContainer.style.display = "none"
            imageContainer.style.display = "block"
            imagelightbox.style.backgroundImage = `url(./assets/photographersMedia/${imageMedia[index]})`;
           
          
           titreLightbox.innerText = titreMedia[index]

        }else if( imageMedia[index].includes("mp4") ){

            console.log(" ***** bienvenue dans les vidéos")

            videoContainer.style.display = "block"
            imageContainer.style.display = "none"

            videolightbox.src = `./assets/photographersMedia/${imageMedia[index]}`
            videolightbox.controls = true;
        }

    }

    //gestion des images suivantes
    const showNextImage = ()=> {

        currentIndex = (currentIndex + 1) % imageMedia.length; //modulo permet de récupérer la partie entière supérieure 1%2 = 1 ou 2/2 1
        showImage(currentIndex);

    }

    const showPreviousImage = () =>{
        currentIndex = (currentIndex - 1 + imageMedia.length) % imageMedia.length;
        showImage(currentIndex);
    }

    prevButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);

    showImage(currentIndex);


    //récupération de toutes les images
    let photographerImg = document.getElementsByClassName("articlePortfolio__item--img")
    //récupération du bouton de fermeture de la galerie
    const lockGalerie = document.querySelector(".lockLightboxBtn")

   // console.log(photographerImg)

    //gestion de l'ouverture de la galerie
    for( let i =0; i<photographerImg.length;i++){

        let imageencours = photographerImg[i]
        //console.log(imageencours)

        imageencours.addEventListener("click", ()=>{

            console.log("*** bienvenue au  imageencours.addEventListener")

             //gestion du focus et du retrait du focus 
             lockGalerie.focus()
            containerLightbox.style.display = "block"

            //gestion de l'opacité du reste de la page pour grise la page en arrière plant du formulaire
            photographHeader.style.opacity = 0;
            sectionMain.style.opacity = 0;

        })
    }
    
    //fermeture de la galerie
    
  

    lockGalerie.addEventListener("click", ()=> {

        console.log("*** bienvenue au lockLightbox.addEventListener")
        containerLightbox.style.display = "none"
        photographHeader.style.opacity = 1;
        sectionMain.style.opacity = 1;
    })

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



