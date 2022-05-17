'use strict'
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
    
    showArticle.classList.add("active");

  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }