$(function() {
  var files = {
        "1830": [1, "data/diff_1830_1918.html"],
        "1918d": [2, "data/diff_1830_1918.html"],
        "1918": [3, "data/diff_1830_1918.html"],
        "1934d": [4, "data/diff_1918_1934.html"],
        "1934": [5, "data/diff_1918_1934.html"],
        "1942d": [6, "data/diff_1934_1942.html"],
        "1942": [7, "data/diff_1934_1942.html"],
        "1952d": [8, "data/diff_1942_1952.html"],
        "1952": [9, "data/diff_1942_1952.html"],
        "1967d": [10, "data/diff_1952_1967.html"],
        "1967": [11, "data/diff_1952_1967.html"],
        "2004d": [12, "data/diff_1967_2004.html"],
        "2004": [13, "data/diff_1967_2004.html"],
      },
      file_name, index, last_index = -1, url;

  function load_file() {
    // TODO: Rethink all the reload state machine

    file_name = location.hash.substr(1); if ( !files[file_name] ) file_name = "2004";
    index = files[file_name][0] || files["2004"][0];
    url = files[file_name][1] || files["2004"][1];

    $("a").removeClass("selected");
    $("a[href='#" + file_name + "']").toggleClass("selected");

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
      $("main").load(url);

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
      } else if ( index < last_index || (index == 1 && last_index == 1) ) {
        $("main").attr("class", "pre");
      } else {
        $("main").attr("class", "post");
      }
    }
  }

  load_file();

  $(window).bind("hashchange", function() {
    load_file();
  });

});
