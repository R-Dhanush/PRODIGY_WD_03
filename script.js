document.addEventListener("DOMContentLoaded", function() {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");

    // Function to toggle the fullscreen
    fullscreenIcon.addEventListener("click", function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenIcon.classList.remove("fa-expand");
            fullscreenIcon.classList.add("fa-compress");
            fullscreenIcon.title = "Exit Full Screen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenIcon.classList.remove("fa-compress");
                fullscreenIcon.classList.add("fa-expand");
                fullscreenIcon.title = "Fullscreen";
            }
        }
    });
    document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement) {
            fullscreenIcon.classList.remove("fa-compress");
            fullscreenIcon.classList.add("fa-expand");
            fullscreenIcon.title = "Fullscreen";
        }
    });

});