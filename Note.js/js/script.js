$('document').ready(function () {
    var noteColor =  null;

    $('.colorButtons').on("click", function(){
        noteColor =  this.id;
        $('.colorButtons').css('border','none');
        $(this).css('border','solid 5px white');
    });


    $('#submit').on("click", function () {
        var typedNote = getNoteContent();
        appendNote(typedNote, noteColor);
    });

    $('#textBox').keyup( function (e)  {
        if (e.which == 13) {        // on release of the return key
            var typedNote = getNoteContent();
            appendNote(typedNote, noteColor);
        }
    });

    $.get('http://notee.de/spaces/test/index.php').done(
        function (fileContent) {
            var jsonContent = JSON.parse(fileContent);
            for (var index in jsonContent.notes) {
                var currentNote = jsonContent.notes[index];
                prependNoteToList(currentNote);
            }
        }
    );

});

function prependNoteToList(note) {
    $('#list').prepend('<li  class="list-group-item" style="background-color: ' + convertColorIdToHexa(note.style.backgroundColor) + '">' +  note.content + '</li>');
}

function getNoteContent() {
 var textAreaContent = $('textarea').val();

 if (textAreaContent  == '') {
     return $('#textBox').val();
 }
return textAreaContent;
}

function appendNote(typedNote, noteColor){
    if ( typedNote == "") {
        alert('note is empty!');
    } else {
        var payload = {
            content: typedNote,
            style :{
                backgroundColor: noteColor
            }
        };
        submitNote(payload);
        insertNoteToDOM(payload);
    }
}

function submitNote(payload) {
    makePostAction(payload);
    $('#textBox').val('');
    $('#paragraph').val('');
   //location.reload(); //TODO change this ugly stuff
}

function makePostAction(payload) {
    $.post('http://notee.de/spaces/test/index.php',payload );
}

function convertColorIdToHexa(colorId){
    switch(colorId) {
        case 'colorOne' :
            return '#a5a1a1';
        case 'colorTwo' :
            return '#d06464';
        case 'colorThree' :
            return '#e6cb7a' ;
        case 'colorFour' :
            return '#5f70ce' ;
        default :
            return 'none' ;
    }
}

function insertNoteToDOM(payload) {
    prependNoteToList(payload);
}