/*jshint esversion: 6 */

// Navbar animation

function showNav() {
    document.getElementById('nav-bar').classList.remove('nav-hidden');
    document.getElementById('nav-bar').classList.add('nav-show');
}

function hideNav() {
    document.getElementById('nav-bar').classList.remove('nav-show');
    document.getElementById('nav-bar').classList.add('nav-hidden');
}

var lastScrollPos = window.pageYOffset;

document.addEventListener('scroll', function () {
    var currScrollPos = window.pageYOffset;
    if (currScrollPos > lastScrollPos && currScrollPos > 200) {
        hideNav();
    } else {
        showNav();
    }
    lastScrollPos = currScrollPos;
});

// Project cards action

var projectCards = document.getElementsByClassName('project-card');
for (var el of projectCards) {
    el.addEventListener('mouseenter', function (e) {
        // shadow
        this.classList.remove('shadow-sm');
        this.classList.add('shadow-lg');
        // description
        var postBody = this.getElementsByClassName('post-body');
        postBody[0].classList.remove('post-body-normal');
        postBody[0].classList.add('post-body-hover');
        var description = postBody[0].getElementsByClassName('post-description');
        description[0].style.transitionDelay = '0.4s';
        description[0].style.visibility = 'visible';
    });
    el.addEventListener('mouseleave', function (e) {
        // shadow
        this.classList.remove('shadow-lg');
        this.classList.add('shadow-sm');
        // description
        var postBody = this.getElementsByClassName('post-body');
        postBody[0].classList.remove('post-body-hover');
        postBody[0].classList.add('post-body-normal');
        var description = postBody[0].getElementsByClassName('post-description');
        description[0].style.transitionDelay = '0s';
        description[0].style.visibility = 'hidden';

    });
}
