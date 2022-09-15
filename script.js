async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        let cepConvertido = await consultaCep.json();
        if (cepConvertido.erro) {
            throw Error('CEP inválido!');
        }
        let endereco = document.getElementById('endereco');
        let cidade = document.getElementById('cidade');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro')
        
        endereco.value = cepConvertido.logradouro;
        cidade.value = cepConvertido.localidade;
        estado.value = cepConvertido.uf;
        bairro.value = cepConvertido.bairro;
        
        console.log(cepConvertido);
        return cepConvertido;
    } catch (erro) {
        mensagemErro.innerHTML = '<p>CEP inválido. Tente novamente!</p>'
        console.log(erro)
    }
}

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
