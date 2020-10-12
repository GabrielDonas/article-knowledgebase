const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

$(document).ready(function () {
    $('.delete-article').on('click', function(e){
    
       $target = $(e.target);
       const id = $target.attr('data-id');
    
           $.ajax({
              url: '/article/'+id,
              data: {"_method":"delete"},
              dataType:'script',
              type:'POST',
              success: function(result) {
                 alert('Deleting Article')
                 window.location.href='/';
              },
              error: function(err) {
                 console.log(err);
              } 
        });
      });
    });