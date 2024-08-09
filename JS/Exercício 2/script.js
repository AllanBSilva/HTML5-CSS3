function gerar() {
    var num = parseInt(window.document.getElementById("num").value);
    var view = document.querySelector("textarea#visualizar");
    var lista = [];
    
    for (var i = 0; i < 10; i++) {
        lista.push(num + " x " + i + " = " + (num * i));
    }
    view.innerHTML = lista.join('\n');
}