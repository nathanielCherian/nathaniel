$(window).on('load', function () {
    $("#question").click(function(){
        $(".popup").show();
    });

    $(".popup").click(function(){
        $(".popup").hide();
    });

    $(".close-button").click(function(){
        $(".popup").hide();
    });

    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27){
            $(".popup").hide();
        }

    });

});