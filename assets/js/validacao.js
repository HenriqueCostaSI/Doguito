export function valida(input) {
    const tipoDeinput = input.dataset.tipo;

    if(validadores[tipoDeinput]) {
        validadores[tipoDeinput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
    } else {
        input.parentElement.classList.add('input-container--invalido');
    }
}

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio' 
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio' 
        typeMissing: 'O email digitado não é válido.'
    }
    senha: {
        valueMissing: 'O campo senha não pode estar vazio'
        patternMissing: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um núnero e não deve conter símbolos.'
    }
    dataNascimento: {
        valueMissing: 'O campo de data nascimento não pode estar vazio'
        customError: 'Você deve ser maoir de 18 anos para se cadastrar'
    }

};

const validadores = {
    dataNascimento:input => validaDataNascimento(input)
};


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