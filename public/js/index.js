$(document).ready( 
    function() {

        // Init stuff
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
                console.log(selected);

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
              let x = e.pageX;
              let y = e.pageY;

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
                console.log('Clicked comment submit');
                let post = $('.post').first().clone();
                if (!($('#comment-text').val().length < 10)) {
                    post.find('.comment').html($('#comment-text').val());
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
                let submit_button = $(this).clone().appendTo($('#settings-button-area'));
                $(submit_button ).find('p').html('Submit Changes');
                $(submit_button ).css("background-color", "#3daa3b");
                $(this).hide();

                let previous_name = $('.core-profile-info').find('.name').text();
                let previous_bio = $('.bio').find('p').text();

                $('.core-profile-info').find('.name').replaceWith($('<textarea class="name">' + previous_name + '</textarea>'));
                $('.bio').find('p').replaceWith($('<textarea class="bio">' + previous_bio + '</textarea>'));

                

                
                $(submit_button).click(
                    function() {
                        $('.core-profile-info').find('.name').replaceWith($('<p class="name">' + $('.core-profile-info').find('.name').val() + '</p>'));
                        $('.bio').find('textarea').replaceWith($('<p>' + $('.bio').find('textarea').val() + '</p>'));
                        $('#settings-button').show();
                        $(submit_button).remove();
                        $('.name').html($('.core-profile-info').find('.name').text());
                    }
                );

            }
        );


    }
);