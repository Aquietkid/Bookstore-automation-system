document.addEventListener("DOMContentLoaded", function() {
    var learnMoreBtn = document.getElementById("learnMoreBtn");
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modalMessage");
    var closeBtn = document.getElementsByClassName("close")[0];

    learnMoreBtn.addEventListener("click", function() {
        modal.style.display = "block";
        modalMessage.innerHTML = "We are a group of four members who are dedicated towards providing IT related solutions.";
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
