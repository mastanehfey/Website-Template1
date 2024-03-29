"use strict";    
var upBtn = document.querySelector('.up-button');
var menuSection = document.querySelector('.menu-section');
var headerHeight = document.getElementById('header').offsetHeight;
var slideMenuOpen = false;

window.addEventListener('scroll', (e)=> {    
    moveUpBtn(e);
    menuSticky(e);    
    if (slideMenuOpen){
        closeMobileMenu();
    }
});
//adjust up btn at the buttom of the page while scrolling
function moveUpBtn(e){
    let scrolTop = scrollY;
    let clientHeight = e.target.documentElement.clientHeight;
    upBtn.style.top = (clientHeight + scrolTop - 65) + 'px';
}
//menu sticky to the top
function menuSticky(e){
    let scrollFromTop = scrollY;
    let headerImage;

    headerImage = window.innerWidth > 992 ? 400 : 250;
    
    if (scrollFromTop >= headerImage) {
        menuSection.classList.add('sticky');
        document.getElementById('home').style.paddingTop = '63px';
    }
    else if (scrollFromTop < headerImage) {        
        menuSection.classList.remove('sticky');
        document.getElementById('home').style.paddingTop = 0;
    }
}
//show menu on small screen size----------------------------------------------------------

var bars = document.querySelector('.bars');
var slideMenu = document.querySelector('.menu-list-slide');
bars.addEventListener('click', openMobileMenu);

function openMobileMenu(){    
    if (slideMenuOpen) {
        closeMobileMenu();    }
    else{
        //this needs to change if more items added to the slide menu        
        slideMenu.style.transition = 'ease-in .4s';
        slideMenu.style.height = '150px';
        slideMenuOpen = true;  
    }  
}
function closeMobileMenu(){
    slideMenu.style.height = 0;
    slideMenu.style.transition = 'ease-in .2s';
    slideMenuOpen = false;
}
//smooth scroll on menu click------------------------------------------------------------
var menuItems = document.querySelectorAll('.menu-item-js');
menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
        let link = e.target.dataset.link;
        menuItems.forEach(element => element.classList.remove('active'));
        if (link == 'apply-header') {
            link = 'apply-now';
            document.querySelector('#apply-link').classList.add('active');
        } 
        else if (link != 'apply-header'){
        item.classList.add('active');
        }
        scrollToSection(link);
        //change hash on window.location
        window.location.replace(window.location.origin + window.location.pathname + '#'+ link);
        if (slideMenuOpen) {
            closeMobileMenu();
        }
    })
})

function scrollToSection(id) {    
    let sectionTop = document.getElementById(id).offsetTop;    
    let menuHeight = menuSection.getBoundingClientRect().height;
    // smooth scrolling using jQuery
    if(id == 'home'){
        $(document.scrollingElement).animate({
            scrollTop: headerHeight}, 400);
    }
    else{
        $(document.scrollingElement).animate({
            scrollTop: sectionTop - menuHeight}, 400);
    }
}
//scroll to top Up BUTTON on click
upBtn.addEventListener('click',function(){
    $(document.scrollingElement).animate({
        scrollTop: 0}, 400);
})
