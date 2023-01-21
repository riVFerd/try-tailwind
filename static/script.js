$(document).ready(function () {
    $("body").css("overflow", "hidden");
    AOS.init({
        duration: 1000
    });

    // Get the wishes from the server
    getWishes();

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

const RECEIVER_ID = 1; // Change this to the receiver's id

function removeGreeting() {
    $("#greeting").css("top", "-500%");
    $("body").css("overflow", "auto");
}

function sendWish() {
    const name = $("#sender-name").val();
    const wish = $("#sender-wish").val();

    // Send the wish to the server
    $.ajax({
        url: "/send-wish",
        type: "POST",
        data: {
            receiver_id: RECEIVER_ID, // Change this to the receiver's id
            name: name,
            wish: wish
        },
        success: function (response) {
            if (response.message === "success") {
                alert("Your wish has been sent successfully!");

                // Locally add wish to the list
                $("#wish-list").append(`
                    <div class="wish flex flex-col mb-2 pt-2">
                        <p class="text-xl mb-2 font-semibold">${name}</p>
                        <p class="">${wish}</p>
                    </div>
                `);

                // Clear the input fields
                $("#sender-name").val("");
                $("#sender-wish").val("");
            }
        }
    });
}

function getWishes() {
    // Get the wishes from the server
    $.ajax({
        url: "/get-wishes",
        type: "POST",
        data: {
            receiver_id: RECEIVER_ID // Change this to the receiver's id
        },
        success: function (response) {
            if (response.message === "success") {
                const wishes = response.wishes;

                wishes.forEach(wish => {
                    $("#wish-list").append(`
                        <div class="wish flex flex-col mb-2 pt-2">
                            <p class="text-xl mb-2 font-semibold">${wish.name}</p>
                            <p class="">${wish.wish}</p>
                        </div>
                    `);
                });
            }
        }
    });
}

function closePopup() {
    $("#popup").fadeOut();
}

function openPopup() {
    $("#popup").fadeIn();
}