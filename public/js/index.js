$(document).ready( 
    function() {

        // Initialization
        $('.name').html($('.core-profile-info').find('.name').text());
    
        // Header Tabs
        let last_clicked = $('.headtablinks').first().attr('id');

        $('.headtab').hide();
        $('.headtab').first().show();

        $('.headtablinks').click(
            function() {
                let clicked = $(this).attr('id');

                if (!(last_clicked === clicked)) {
                    $('.headtab').slideUp('fast');
                    $('#' + clicked + 'headtab').delay(350).slideDown('fast');
                }
                last_clicked = clicked;

            }
        );

        // Left-hand Tabs
        let tabs = $('.tablinks'),
          content = $('.tab');

        tabs.addClass('inactive');
        tabs.first().removeClass('inactive');
        content.hide();
        content.first().fadeIn();

        tabs.click(
            function() {
                let selected = $(this).attr('id');

                if ($(this).hasClass('inactive')) {
                    tabs.addClass('inactive');
                    $(this).removeClass('inactive');

                    content.hide();
                    $(`#${selected}tab`).fadeIn();
                }
            }
        );

        // Drag & Drop Functionality
        $("html").on("drop", function(event) { event.preventDefault(); event.stopPropagation(); });

        let dragging;
        $('.item').mousedown(
            function(event) {
                dragging = $(this).detach();
                dragging.appendTo('.dragging-area');
            }
        );

        $(document).mousemove(
            function(e) {
              let x = e.pageX - window.pageXOffset; // client.x
              let y = e.pageY - window.pageYOffset; // client.y

              $('.dragging-area').css({
              'left':x,
              'top':y
              });

            }
        );


        $('.f-grid').mouseup(
            function() {
                dragging.appendTo($(this));
                dragging = null;
            }
        );

        $('.f-grid').mousedown(
            function() {
                $(this).addClass('redrop');
        });

        $(document).mouseup(
            function() {
                dragging = $('.dragging-area').children().detach();
                dragging.appendTo('.redrop');
                dragging = null;
                $('.f-grid').removeClass('redrop');
            }
        );

        // DOM Functionality

        // Submit Comment
        $('.comment-submit').click(
            function() {
                let post = $('.post').first().clone();

                let sanitized = checkTextAreas($('#comment-text').val());
                if (!(sanitized.length < 10)) {
                    post.find('.comment').html(sanitized);
                    post.appendTo('.posts');
                    $('#comment-text').val('');
                } else {
                    alert('Must enter more than 10 characters.');
                }
            }
        );

        // Change Profile Settings
        $('#settings-button').click(
            function() {
                let submit_button = $(this).clone().appendTo('#settings-button-area');
                $(submit_button).find('p').html('Submit Changes');
                $(submit_button).css("background-color", "#3daa3b");

                let change_avatar = $(this).clone().appendTo('#avatar-container');
                $(change_avatar).find('p').html('Change Avatar');
                $(change_avatar).find('i').remove();
                $(change_avatar).css("background-color", "#5E60CE")
                $(change_avatar).css("padding", "1% 4%");


                $(this).hide();

                

                let previous_name = $('.core-profile-info').find('.name').text();
                let previous_bio = $('.bio').find('p').text();
                let previous_avatar = $('.avatar').attr('src');

                $('.core-profile-info').find('.name').replaceWith($('<textarea class="name">' + previous_name + '</textarea>'));
                $('.bio').find('p').replaceWith($('<textarea class="bio">' + previous_bio + '</textarea>'));

                

                $(change_avatar).click(
                    function() {
                        let image_link = window.prompt('Enter url for image: ');
                        $('.avatar').attr('src', image_link);
                    }
                );
                
                $(submit_button).click(
                    function() {
                        // Sanitize & read input from user for name & bio.
                        let sanitized = checkTextAreas($('.core-profile-info').find('.name').val());
                        $('.core-profile-info').find('.name').replaceWith($('<p class="name">' + sanitized + '</p>'));

                        sanitized = checkTextAreas($('.bio').find('textarea').val());
                        $('.bio').find('textarea').replaceWith($('<p>' + sanitized + '</p>'));
                        
                        // Make everything the way it was previously.
                        $('#settings-button').show();
                        $(submit_button).remove();
                        $(change_avatar).remove();

                        // Apply these changes everywhere else.
                        $('.name').html($('.core-profile-info').find('.name').text());
                        $('.avatar-1').attr('src', $('.avatar').attr('src'));
                    }
                );

            }
        );

        function checkTextAreas(input) {
            let sanitize_scripts = input.replaceAll("<script>", "");
            sanitize_scripts = sanitize_scripts.replaceAll("</script>", "");
            return sanitize_scripts;
        }


    }
);