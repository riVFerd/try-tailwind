$(document).ready(function () {
    $("body").css("overflow", "hidden");
    AOS.init({
        duration: 1000
    });

    setInterval(function () {
        // Get the current date
        const currentDate = new Date();

        // Get the specific date
        const mainEvent = new Date(2023, 10, 11, 10, 0, 0);

        // Get the difference between the two dates in milliseconds
        const difference = mainEvent - currentDate;
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        $("#days").text(days);
        $("#hours").text(((hours % 24).toString().length === 1) ? "0" + (hours % 24) : (hours % 24));
        $("#minutes").text(((minutes % 60).toString().length === 1) ? "0" + (minutes % 60) : (minutes % 60));
        $("#seconds").text(((seconds % 60).toString().length === 1) ? "0" + (seconds % 60) : (seconds % 60));
    }, 1000)
});

function removeGreeting() {
    $("#greeting").css("top", "-500%");
    $("body").css("overflow", "auto");
}