window.addEventListener("load", function(){
    var name_input = document.getElementById('name_input');
    name_input.addEventListener("keyup", function(event){ hinter(event) });

    window.hinterXHR = new XMLHttpRequest();
});

function hinter(event) {
    var input = event.target;
    var huge_list = document.getElementById('huge_list');

    var min_characters = 0;
    if (input.value.length < min_characters ) { 
        return;
    } else { 
        window.hinterXHR.abort();

        window.hinterXHR.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                huge_list.innerHTML = "";
                response.areas.forEach(function(item) {
                    console.log(item.name);
                    var option = document.createElement('option');
                    option.value = item.name;
                    huge_list.appendChild(option);
                });
            }
        };

        window.hinterXHR.open("GET", "https://api.hh.ru/areas/113" , true);
        window.hinterXHR.send()
    }
}