const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');
const form = document.getElementById('cadastroForm');

// Eventos
nome.addEventListener('blur', () => validarCampo(nome, validarNome));
email.addEventListener('blur', () => validarCampo(email, validarEmail));

senha.addEventListener('input', () => {
  validarCampo(senha, validarSenha);
  validarCampo(confirmarSenha, validarConfirmacaoSenha);
});

confirmarSenha.addEventListener('blur', () =>
  validarCampo(confirmarSenha, validarConfirmacaoSenha)
);

// Função genérica
function validarCampo(input, funcaoValidadora) {
  const msgErro = document.getElementById(input.id + '-error');
  if (!msgErro) return;

  const resultado = funcaoValidadora(input.value);

  if (!resultado.valido) {
    input.classList.add('error');
    input.classList.remove('success');
    msgErro.textContent = resultado.mensagem;
  } else {
    input.classList.remove('error');
    input.classList.add('success');
    msgErro.textContent = '';
  }
}

// Nome
function validarNome(valor) {
  if (!valor.trim()) {
    return { valido: false, mensagem: '⚠️ Nome é obrigatório' };
  }
  if (valor.length < 3) {
    return { valido: false, mensagem: '⚠️ Mínimo 3 caracteres' };
  }
  return { valido: true };
}

// Email
function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor) {
    return { valido: false, mensagem: '⚠️ E-mail obrigatório' };
  }
  if (!regex.test(valor)) {
    return { valido: false, mensagem: '⚠️ Formato inválido' };
  }
  return { valido: true };
}

// Senha
function validarSenha(valor) {
  if (valor.length < 8) {
    return { valido: false, mensagem: '⚠️ Mínimo 8 caracteres' };
  }
  if (!/[A-Z]/.test(valor)) {
    return { valido: false, mensagem: '⚠️ Precisa de 1 letra maiúscula' };
  }
  if (!/[0-9]/.test(valor)) {
    return { valido: false, mensagem: '⚠️ Precisa de 1 número' };
  }
  return { valido: true };
}

// Confirmar senha
function validarConfirmacaoSenha(valor) {
  if (!valor) {
    return { valido: false, mensagem: '⚠️ Confirme a senha' };
  }
  if (valor !== senha.value) {
    return { valido: false, mensagem: '⚠️ Senhas não coincidem' };
  }
  return { valido: true };
}

// Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const validacoes = [
    validarNome(nome.value),
    validarEmail(email.value),
    validarSenha(senha.value),
    validarConfirmacaoSenha(confirmarSenha.value)
  ];

  const formValido = validacoes.every(v => v.valido);

  if (formValido) {
    alert('✅ Cadastro realizado com sucesso!');
    form.reset();

    document.querySelectorAll('input').forEach(input => {
      input.classList.remove('success');
    });
  } else {
    validarCampo(nome, validarNome);
    validarCampo(email, validarEmail);
    validarCampo(senha, validarSenha);
    validarCampo(confirmarSenha, validarConfirmacaoSenha);
  }
});
