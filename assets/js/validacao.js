/**
 * It validates the input and if it's valid, it removes the class 'input-container--invalido' and the
 * error message, otherwise it adds the class 'input-container--invalido' and the error message.
 * @param input - the input element
 */
export function valida(input) {
    const tipoDeinput = input.dataset.tipo;

    if(validadores[tipoDeinput]) {
        validadores[tipoDeinput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-error').innerHTML = ''

    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-error').innerHTML = mostraMensagemDeErro(tipoDeinput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError'
];


const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio' 
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio' ,
        typeMissing: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMissing: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um núnero e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de data nascimento não pode estar vazio',
        customError: 'Você deve ser maoir de 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo de cpf não pode estar vazio',
        customError: 'O CPF digitado não é válido'
    }

};

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
};

/**
 * It loops through the array of error types, and if the input has that error type, it sets the message
 * to the corresponding error message
 * @param tipoDeinput - the type of input (text, email, etc)
 * @param input - the input element
 * @returns the message.
 */
function mostraMensagemDeErro(tipoDeinput, input) {
    let mensagem = '';

    tiposDeErro.forEach(tipoErro => {
        if(input.validity[tipoErro]) {
            mensagem = mensagensDeErro[tipoDeInput][tipoErro];
        }
    })


    return mensagem;
}


/**
 * It takes a date and returns true if the date is greater than 18 years ago, otherwise it returns
 * false.
 * @param input - The input element that is being validated.
 */
function validaDataNascimento (input) {
    const dataRecebida = new Date(input.vlue);
    let mensagem = '';

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }



    input.setCustomValidity(mensagem);
}

/**
 * It takes a date, adds 18 years to it, and returns true if the resulting date is less than or equal
 * to today's date.
 * @param data - The date you want to check
 * @returns A boolean value.
 */
function maiorQue18(data) {
    const dataAtual = new Date();// será iniciado com a data de hoje

    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataMais18 <= dataAtual;
}


function validaCPF(input) {
    const cpfFormatado = input.value.replaca(/\D/g, '');
    
    let mensagem = '';

    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O cpf  digitado não é válido.';
    }


    input.setCustomValidity(mensagem);
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;


    valoresRepetidos.forEach( valor => {
        if( valor == cpf) {
            cpfValido = false;
        }
    })



    return cpfValido;
}

function checaEstruturaCPF(cpf) {
    const multiplicador = 10;

    return chcaDigitoVerificador(cpf, multiplicador);
}

function chacaDigitoVerificador(cpf, multiplicador) {

    if(multiplicador >= 12) {
        return true;
    }


    let multiplicadorInicial = multiplicador;
    let soma = 0;
    /* It's taking the first 9 digits of the cpf and splitting them into an array. */
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');//subst-> quero começar da posição 0 e ir até a nona separando a string, retorna um vetor

    const digitoVerificador = cpf.charAt(multiplicador - 1);

    for(let i = 0; multiplicadorInicial > 1;  multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[i] * multiplicadorInicial;
        i++;
    }

    if(digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador( cpf, multiplicador + 1)
    }

    return false;
}

function confirmaDigito(soma) {
    return 11 - (soma % 11);
}