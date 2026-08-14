/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', () => {
    var container = document.querySelector('.container');
    if (container) {
        container.classList.remove('preload');
        container.classList.add('postload');
    }
});
