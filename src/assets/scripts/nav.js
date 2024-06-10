document.addEventListener('DOMContentLoaded', function() {
    var currentPage = getCurrentPageName();

    function getCurrentPageName() {
        var pathArray = window.location.pathname.split('/');
        var currentPage = pathArray[pathArray.length - 1]; // Obtenim el nom de la ruta actual
        currentPage = currentPage.replace(".html", ""); // Elimina la extensió .html
        return currentPage;
    }

    var navLinks = document.querySelectorAll('.nav-link'); // agafem tots els .nav-link que hi ha

    // Recorrem navLinks per veure on tenim l'element active i substituir-lo
    navLinks.forEach(function(link, i) {
        var href = link.getAttribute('href').replace(".html", ""); // els treiem .html i ens quedem amb els noms.
        var baseRoute = href.substring(href.lastIndexOf('/') + 1);

        link.classList.remove('active'); // eliminem el 'active' de la class que estava.

        if (currentPage === baseRoute) {
            link.classList.add('active'); // afegim 'active' a la class de l'element en que ens trobem ara.
        }

        if (currentPage == '' && i === 0) {
          link.classList.add('active');
        }

    });

});
