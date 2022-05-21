'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* [DONE] remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* [DONE] add class 'active' to the clicked link */
  
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  
  /* [DONE] remove class 'active' from all articles */
      
  const activeArticles = document.querySelectorAll('.posts article.active');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* [DONE] get 'href' attribute from the clicked link */
    
  const linkHref = clickedElement.getAttribute('href');
  console.log(linkHref);
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  
  const showArticle = document.querySelector(linkHref);
  console.log(showArticle);

  /* [DONE] add class 'active' to the correct article */
    
  showArticle.classList.add('active');
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList= document.querySelector(optTitleListSelector);
  titleList.innerHTML=''; 
  let html = '';
  /* for each article */
  const article = document.querySelectorAll(optArticleSelector + customSelector)
  
  article.forEach(article=>{
    /* get the article id */
    const articleId = article.getAttribute('id');
        
    /* find the title element */
        
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        
    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
            
    /* insert link into titleList */
    // titleList.insertAdjacentHTML("beforeend",linkHTML);
    html = html + linkHTML;
  });
  titleList.innerHTML = html;
}
generateTitleLinks();
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  articles.forEach(article=>{

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);   

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    console.log(dataTags);

    /* split tags into array */
    const tagsArray = dataTags.split(' ');
    console.log(tagsArray);

    /* START LOOP: for each tag */
    tagsArray.forEach(tag=>{

      /* generate HTML of the link */
      const htmlLink = `<li><a href="#tag-${tag}">${tag}</a></li> `;

      /* add generated code to html variable */
      html += htmlLink;

      /* END LOOP: for each tag */
    });
    
    /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  });
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(this);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinksActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  tagLinksActive.forEach(tagLinkActive=>{

    /* remove class active */
    tagLinkActive.classList.remove('active');
    /* END LOOP: for each active tag link */
  });
    
    /* find all tag links with "href" attribute equal to the "href" constant */
    
  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(tagLinks);
  /* START LOOP: for each link */
    tagLinks.forEach(tag=>{
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click',tagClickHandler);
      /* END LOOP: for each link */
    });
}

addClickListenersToTags();

