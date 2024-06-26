var buttons = document.querySelectorAll('.myBtn');

buttons.forEach(function(btn) {
    btn.onclick = function() {
        var modalId = this.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        var card = document.getElementsByClassName('card-content')
        modal.style.display = "block";
        card.display = "none";

        var span = modal.querySelector('.close');

        span.onclick = function() {
            modal.style.display = "none";
        };

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    };
});


document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};