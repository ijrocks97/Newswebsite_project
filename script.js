const key = "b76a54835b3e47fe9c7003c5e0c761c4";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' ,() => fetchnews("politics"));

async function fetchnews(query){
    const response = await fetch(`${url}${query}&apiKey=${key}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemp=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach((element) => {
        if(!element.urlToImage) return;
        const cardClone = newsCardTemp.content.cloneNode(true);
        filldDataInCard(cardClone,element);
        cardsContainer.appendChild(cardClone);
    });
}


function filldDataInCard(cardClone, element)
{
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('.news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = element.urlToImage;
    newsTitle.innerHTML=element.title;
    newsDesc.innerHTML = element.description;

    const date=new Date(element.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});

    newsSource.innerHTML=`${element.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(element.url, "_blank");
    })
}

let cursorSelected = null;
function onNavclick(query)
{
    fetchnews(query);
    const navItem=document.getElementById(query);
    cursorSelected?.classList.remove('active');
    cursorSelected=navItem;
    cursorSelected.classList.add('active');

}


const searchbtn=document.getElementById('search-btn');
const searchText=document.getElementById('input-text');


let inputtext=null;
searchbtn.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query) return;
    fetchnews(query);
    cursorSelected?.classList.remove('active');
    cursorSelected=null;
});

     
// dark-theme
// const themebtn=document.getElementById("theme-btn");
// themebtn.addEventListener('click',()=>{
//     if(themebtn.classList.contains("fa-moon"))
//     {
//         themebtn.classList.remove('fa-moon');
//         themebtn.classList.add('fa-sun');
//         document.body.style.background="lightgray";
//         document.documentElement.style.setProperty('--card-color', 'grey');
//     }
//     else
//     {
//         themebtn.classList.remove('fa-sun');
//         themebtn.classList.add('fa-moon');
//         document.body.style.background="#fff";
//         document.documentElement.style.setProperty('--card-color', '#fff');
//     }
// })

