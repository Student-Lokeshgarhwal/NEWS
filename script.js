const apikey = "35de15ee05d746b49c6ff25b204f62ba";

const blogcontainer = document.getElementById('blog-container');
const inputbox = document.getElementById('search-input');
const searchbtn = document.getElementById('search-button');
const Businessbtn = document.getElementById("Businessbtn");
const sciencebtn = document.getElementById("sciencebtn");
const entertainmentbtn = document.getElementById("entertainmentbtn");
const technologybtn = document.getElementById("technologybtn");

async function fecthrandomnews() {
    try {
        const apiurl = `http://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log(data.articles)
        return data.articles;
    } catch (error) {
        console.error("error fecthing random news", error);
        return [];
    }
}

function displayblogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        // const divrow = document.createElement("div");
        // divrow.classList.add("row");
        const divcol = document.createElement("div");
        divcol.classList.add("col-lg-4");
        divcol.classList.add("col-md-6");
        const divblogcard = document.createElement("div");
        divblogcard.classList.add("card");
        const image = document.createElement("img");
        image.classList.add("card-img-top");
        image.src = article.urlToImage;
        image.alt = article.title;
        const divcardbody = document.createElement("div");
        divcardbody.classList.add("card-body");
        const cardtitle = document.createElement("h2");
        cardtitle.classList.add("card-title");
        const trucatedtitle = article.title.length > 40 ? article.title.slice(0, 35) + "...." : article.title;
        cardtitle.textContent = trucatedtitle;
        const cardtext = document.createElement("p");
        cardtext.classList.add("card-text");
        const trucatedtext = article.description.length > 100 ? article.description.slice(0, 100) + "...." : article.description;
        cardtext.textContent = trucatedtext;

        divcol.appendChild(divblogcard);
        divblogcard.appendChild(image);
        divblogcard.appendChild(divcardbody);
        divcardbody.appendChild(cardtitle);
        divcardbody.appendChild(cardtext);
        divblogcard.addEventListener(("click"), () => {
            window.open(article.url, "_blank");
        })
        blogcontainer.appendChild(divcol);
    });
};

searchbtn.addEventListener(("click"), async () => {
    const query = inputbox.value;
    if (query !== "") {
        try {
            const articles = await fecthquerynews(query);
            displayblogs(articles);
        } catch (error) {
            console.error("query not found", error);
        }
    } else {
        alert("Search not found");
    }
});

async function fecthquerynews(query) {
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("error fecthing random news", error);
        return [];
    }
}

async function fetchheadingsnews(query) {
    try {
        const businessurl = `
https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        const response = await fetch(businessurl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("business news not found", error);
        return [];
    }
}

Businessbtn.addEventListener(("click"), async () => {
    const query = "business";
    const articles = await fetchheadingsnews(query);
    displayblogs(articles);
});

sciencebtn.addEventListener(("click"), async () => {
    const query = "science";
    const articles = await fetchheadingsnews(query);
    displayblogs(articles);
});

entertainmentbtn.addEventListener(("click"), async () => {
    const query = "entertainment";
    const articles = await fetchheadingsnews(query);
    displayblogs(articles);
});

technologybtn.addEventListener(("click"), async () => {
    const query = "technology";
    const articles = await fetchheadingsnews(query);
    displayblogs(articles);
});

(async () => {
    try {
        const articles = await fecthrandomnews();
        displayblogs(articles);
    } catch (error) {
        console.error("error fecthing random news", error);
    }
})();

