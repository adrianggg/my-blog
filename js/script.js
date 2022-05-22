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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList= document.querySelector(optTitleListSelector);
  titleList.innerHTML=''; 
  let html = '';
  /* for each article */
  const article = document.querySelectorAll(optArticleSelector + customSelector);
  
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
function calculateTagsParams(tags){
  let params = {
    max: 0,
    min: 999999
  };
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(params.max < tags[tag]){
      params.max = tags[tag];
    }
    if(params.min > tags[tag]){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count,params){
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix+classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  
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

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }else{
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    });
    
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  });
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  const tagsParams = calculateTagsParams(allTags);
  console.log(allTags);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  console.log('tagsParams:', tagsParams);
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = `<li class="" >${tag} (${allTags[tag]})</li>`;
    const tagLinkHTML = `<li><a class="${calculateTagClass(allTags[tag], tagsParams)}" href="#tag-${tag}">${tag} (${allTags[tag]})</a> </li>`;
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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
  const clickedTags = document.querySelectorAll(`a[href^="#tag-${tag}"]`);
  console.log(clickedTags);
  console.log(`a[href^="#tag-${tag}"]`);
  /* START LOOP: for each found tag link */
  clickedTags.forEach(clickedTag=>{

    /* add class active */
    clickedTag.classList.add('active');
    /* END LOOP: for each found tag link */
  });

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
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

function generateAuthors(){
  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  // start loop
  articles.forEach(article=>{
    // get wrapper to const
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    // get author from data-author
    const author = article.getAttribute('data-author');
    // console.log(author);
    // insert  author to wrapper
    authorWrapper.innerHTML = `by <a href="#author-${author}">${author}</a>`;
    // end loop
  });
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  // console.log('clicked');
  const href = clickedElement.getAttribute('href');
  // console.log(href);
  const author = href.replace('#author-','');
  // console.log(author);
  const authorsLinksActive = document.querySelectorAll('a.active[href^="#author-"');
  authorsLinksActive.forEach(authorLinkActive=>{
    authorLinkActive.classList.remove('active');
  });
  const clickedAuthors = document.querySelectorAll(`a[href^="#author-${author}"`);
  clickedAuthors.forEach(clickedAuthor=>{
    clickedAuthor.classList.add('active');
  });
  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors(){
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  // console.log(authorsLinks);
  authorsLinks.forEach(authorLink=>{
    authorLink.addEventListener('click',authorClickHandler);
  });

}
addClickListenersToAuthors();

