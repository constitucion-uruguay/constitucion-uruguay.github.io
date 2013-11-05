$(function() {
  var last_index = 1;

  $("main").attr("class", "pre");
  $("main").load( "data/diff_1830_1918.html" );

  $("a").click( function() {
    var index = parseInt($(this).attr("data-index"));

    function same_group(new_index, old_index) {
      return (
        (old_index >= 1 && old_index <= 3 && new_index >= 1 && new_index <= 3) ||
        (old_index >= 4 && old_index <= 5 && new_index >= 3 && new_index <= 5) ||
        (old_index >= 6 && old_index <= 7 && new_index >= 5 && new_index <= 7) ||
        (old_index >= 8 && old_index <= 9 && new_index >= 7 && new_index <= 9) ||
        (old_index >= 10 && old_index <= 11 && new_index >= 9 && new_index <= 11) ||
        (old_index >= 12 && old_index <= 13 && new_index >= 11 && new_index <= 13));
    }

    if ( ! same_group(index, last_index) ) {
      // Load data
      $("main").load( $(this).attr("data-load") );

      if ( index % 2 == 0 ) {
        $("main").attr("class", "diff");
      } else if ( index > 1 ) {
        $("main").attr("class", "post");
      } else {
        $("main").attr("class", "pre");
      }

      last_index = index;
    } else {
      if ( index % 2 == 0 ) {
        $("main").attr("class", "diff");
      } else if ( index < last_index ) {
        $("main").attr("class", "pre");
      } else {
        $("main").attr("class", "post");
      }
    }

  });

});
