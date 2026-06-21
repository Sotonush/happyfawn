(function () {
    var html = document.documentElement;
    html.classList.add('page-transitions');

    function reveal() {
        requestAnimationFrame(function () {
            document.body.classList.add('page-loaded');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', reveal);
    } else {
        reveal();
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href], [data-href]');
        if (!link) return;
        if (link.target === '_blank' || link.hasAttribute('download')) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var href = link.getAttribute('href') || link.dataset.href;
        if (!href || href.charAt(0) === '#' || /^[a-z]+:/i.test(href)) return;

        e.preventDefault();
        document.body.classList.remove('page-loaded');
        setTimeout(function () {
            window.location.href = href;
        }, 300);
    });
})();
