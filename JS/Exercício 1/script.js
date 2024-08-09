function contar() {
    var num_ini = parseInt(window.document.getElementById("ini").value);
    var num_fim = parseInt(document.getElementById("fim").value);
    var num_pas = parseInt(document.getElementById("pas").value);
    var lista = [];
    var res = document.getElementById("resto");

    if (num_pas==0)
    {
        num_pas=1
        window.alert("Passo inválido! Considerando PASSO: 1")
    }


    if (num_ini)
    {
        for (var i = num_ini; i < num_fim; i += num_pas) {
            lista.push(i);
        }
    res.innerText = 'Contando: \n' + lista.join('👉') + '🏴';
    }
    else {
        res.innerHTML = "Impossível contar!"
    }


}
