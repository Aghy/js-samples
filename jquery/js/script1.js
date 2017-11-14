$('#submit').on("click", setImg);

function showAlert() {
    alert('whats up');
}

function setImg() {
    $('img').attr('src', 'http://api.jquery.com/jquery-wp-content/themes/jquery/content/books/learning-jquery-4th-ed.jpg')
        .css('height', '200px')
        .css('border', 'solid 2px black ');
}

$('#container').css('background-color', 'black');