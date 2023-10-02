const API_KEY = "d510082ac0fd4563af828444da278ba3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"))
async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles); 
}

function bindData(articles){
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate =document.getElementById("template-news-card");

    cardContainer.innerHTML= '';
    articles.forEach(article=>{
        if(!article.urlToImage)return;
        const cardClone =newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
        })
}

function fillDataInCard(cardClone,article){
    const newImg = cardClone.querySelector("#news-img");
    const newTitle = cardClone.querySelector("#news-title");
    const newSource = cardClone.querySelector("#news-source"); 
    const newDesc = cardClone.querySelector("#news-desc");
    newImg.src=article.urlToImage;
    newTitle.innerHTML=article.title;    
    newDesc.innerHTML=article.description;   
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timezone: "Asia/Jakarta"
    }) ;

    newSource.innerHTML=`${article.source.name} . date: ${date}`;    
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
}

let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem= document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav=navItem;
    currentSelectedNav.classList.add('active');
}