$(document).ready( 
    function() {
    
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



    }
);