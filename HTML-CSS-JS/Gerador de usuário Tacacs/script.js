function qtd_escolhida() {
  // Pega o que o usuário escolheu
  const opcao_selecionada = document.querySelector('input[name="tipo_permissao"]:checked');
  console.log(opcao_selecionada);

  // Pega o conteúdo que está na tag
  const texto_interno = opcao_selecionada.parentElement.innerText;

  // Cria o formulário
  const new_form = document.createElement("form");

  // Pega a <div id="campo_adicional">
  const campo_adicional = document.getElementById("campo_adicional");

  // Limpa a div para não criar vários formulários ao escolher o radio
  campo_adicional.innerHTML = "";
}

function gerador_de_user() {
  // Pega o que o usuário escolheu
  const opcao_selecionada = document.querySelector('input[name="tipo_permissao"]:checked');

  // Remove resultado anterior, se existir
  document.getElementById("resultado_user")?.remove();

  // Cria nova div para exibir resultado
  const new_div = document.createElement("div");
  new_div.classList.add("field");

  // Pega os valores dos inputs
  let nome_completo = document.getElementById("nome_completo").value;
  let user_id = document.getElementById("user_id").value;

  // Função para deixar a primeira letra de cada palavra em maiúscula
  function capitalizarNome(nome) {
    return nome
      .toLowerCase()
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

  // Aplica as transformações
  nome_completo = capitalizarNome(nome_completo);
  user_id = user_id.toLowerCase();

  // Atualiza os campos com os valores formatados (opcional)
  document.getElementById("nome_completo").value = nome_completo;
  document.getElementById("user_id").value = user_id;

  new_div.id = "resultado_user";

  // Se for escrita, mostra permissões de Engineers
  if (opcao_selecionada.value === 'escrita') {
    new_div.innerHTML = `
      <p class="tacacs_titulo">Tacacs</p>
      <dl>
        <dt># ${nome_completo}</dt>
        <dd>user = ${user_id} {</dd>
        <dd>login = PAM</dd>
        <dd>member = Engineers</dd>
        <dd>enable = nopassword</dd>
        }</dl>
      <button class="botao_copiar" type="button" onclick="copiarResultado_Tacacs()">Copiar</button>

      <p class="radius_titulo">Radius</p>
      <dl>
        <dt># ${nome_completo}</dt>
        <dt>${user_id} Auth-Type := pam</dt>
        <dd>RuggedCom-Privilege-level = admin,</dd>
        <dd>RuggedMax-Privilege-level = Admin,</dd>
        <dd>Service-Type = Administrative-User,</dd>
        <dd>Cisco-AVPair = fdm.userrole.authority.admin</dd>
      </dl>
      <button class="botao_copiar" type="button" onclick="copiarResultado_Radius()">Copiar</button>
    `;
  } else {
    // Se for leitura, mostra permissões de Auditors e Guest
    new_div.innerHTML = `
      <p class="tacacs_titulo">Tacacs</p>
      <dl>
        <dt># ${nome_completo}</dt>
        <dd>user = ${user_id} {</dd>
        <dd>login = PAM</dd>
        <dd>member = Auditors</dd>
        }</dl>
      <button class="botao_copiar" type="button" onclick="copiarResultado_Tacacs()">Copiar</button>

      <p class="radius_titulo">Radius</p>
      <dl>
        <dt># ${nome_completo}</dt>
        <dt>${user_id} Auth-Type := pam</dt>
        <dd>RuggedCom-Privilege-level = guest,</dd>
        <dd>Service-Type = NAS-Prompt-User</dd>
      </dl>
      <button class="botao_copiar" type="button" onclick="copiarResultado_Radius()">Copiar</button>
    `;
  }

  // Adiciona o resultado na tela
  document.getElementById("campo_adicional").appendChild(new_div);
}

function copiarResultado_Tacacs() {
  // Pega os valores dos inputs
  let nome_completo = document.getElementById("nome_completo").value;
  let user_id = document.getElementById("user_id").value;
  const opcao_selecionada = document.querySelector('input[name="tipo_permissao"]:checked');

  // Função para capitalizar o nome
  function capitalizarNome(nome) {
    return nome
      .toLowerCase()
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

  // Aplica as transformações
  nome_completo = capitalizarNome(nome_completo);
  user_id = user_id.toLowerCase();

  let texto_formatado = "";

  // Gera texto conforme tipo de permissão
  if (opcao_selecionada.value === 'escrita') {
    texto_formatado =
`# ${nome_completo}
  user = ${user_id} {
    login = PAM
    member = Engineers
    enable = nopassword
}`;
  } else {
    texto_formatado =
`# ${nome_completo}
user = ${user_id} {
     login = PAM
     member = Auditors
}`;
  }

  // Copia para área de transferência
  navigator.clipboard.writeText(texto_formatado);
}

function copiarResultado_Radius() {
  // Pega os valores dos inputs
  let nome_completo = document.getElementById("nome_completo").value;
  let user_id = document.getElementById("user_id").value;
  const opcao_selecionada = document.querySelector('input[name="tipo_permissao"]:checked');

  // Função para capitalizar o nome
  function capitalizarNome(nome) {
    return nome
      .toLowerCase()
      .split(' ')
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(' ');
  }

  // Aplica as transformações
  nome_completo = capitalizarNome(nome_completo);
  user_id = user_id.toLowerCase();

  let texto_formatado = "";

  // Gera texto conforme tipo de permissão
  if (opcao_selecionada.value === 'escrita') {
    texto_formatado =
`# ${nome_completo}
${user_id} Auth-Type := pam
\tRuggedCom-Privilege-level = admin,
\tRuggedMax-Privilege-level = Admin,
\tService-Type = Administrative-User,
\tCisco-AVPair = fdm.userrole.authority.admin`;
  } else {
    texto_formatado =
`# ${nome_completo}
${user_id} Auth-Type := pam
\tRuggedCom-Privilege-level = guest,
\tService-Type = NAS-Prompt-User`;
  }

  // Copia para área de transferência
  navigator.clipboard.writeText(texto_formatado);
}