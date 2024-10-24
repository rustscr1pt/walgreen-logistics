import verify_fields from "./verify_fields.js";
import format_the_object from "./format_the_object.js";
import display_and_hide_notification from "./display_and_hide_notification.js";
import write_customer_request from "./write_customer_request.js";
import check_activity_before_appending from "./check_activity_before_appending.js";

$(function () {
    const desktop_button = $("#desktop");

    desktop_button.on({
        mouseenter: function () {
            $(this).css({
                'background-color': "rgb(174, 209, 84)",
                'border-radius': "15px"
            })
        },
        mouseleave: function () {
            $(this).css({
                'background-color' : "#177b96",
                'border-radius' : "8px"
            })
        }
    });

    // Fetch the name & surname of customer and then make a request to the API.
    desktop_button.on('click', function() {
        const name = document.getElementById("customer_name").value;
        const phone_num = document.getElementById("customer_phone").value;
        const comment = document.getElementById("customer_comment").value;
        const result = verify_fields(name, phone_num, comment);

        // check if alert window is already at the screen. If true - do not toggle notification.
        if (check_activity_before_appending()) {
            switch (result[0]) {
                case true:
                    write_customer_request(name, phone_num, comment);
                    return
                case false:
                    display_and_hide_notification(format_the_object(false, result[1]))
                    return;
            }
        }
    })
});