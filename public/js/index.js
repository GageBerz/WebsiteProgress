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
        content.first().show();

        tabs.click( function() {
          let selected = $(this).attr('id');
          console.log(selected);

          if ($(this).hasClass('inactive')) {
            tabs.addClass('inactive');
            $(this).removeClass('inactive');

            content.hide();
            $(`#${selected}tab`).show();
          }
        });

        // Drag & Drop Functionality
        $("html").on("drop", function(event) { event.preventDefault(); event.stopPropagation(); });

        let dragging;
        $('.item').mousedown(
            function(event) {
                dragging = $(this);
                
            }
        );

        $('.f-grid').mouseup(
            function() {
                if (dragging != null) {
                    dragging = dragging.detach();
                    dragging.appendTo($(this));
                }
                dragging = null;
            }
        );

        
    }
);