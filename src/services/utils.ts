export function parseJwt(token: string | null) {
  if (!token) {
    return {};
  }

  const base64Url = token.split(".")[1];

  if (!base64Url) {
    return {};
  }

  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatarData(dataString: string | undefined) {
  const dataRecebida = new Date(dataString!);
  const dia = dataRecebida.getDate().toString().padStart(2, "0");
  const mes = (dataRecebida.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataRecebida.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function formatCPF(value: string | undefined) {
  if (value === undefined) {
    return value;
  }

  // Remove todos os caracteres não numéricos do valor do CPF
  const cleanedValue = value!.replace(/\D/g, "");

  // Formata o CPF com a máscara xxx.xxx.xxx-xx
  const match = cleanedValue.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (match) {
    return (
      match[1] +
      (match[2] ? "." + match[2] : "") +
      (match[3] ? "." + match[3] : "") +
      (match[4] ? "-" + match[4] : "")
    );
  }

  return value;
}

export function isValidCPF(cpf: string): boolean {
  // Remover caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  if (firstDigit > 9) {
    firstDigit = 0;
  }

  // Verificar se o primeiro dígito verificador está correto
  if (parseInt(cpf.charAt(9)) !== firstDigit) {
    return false;
  }

  // Calcular o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  if (secondDigit > 9) {
    secondDigit = 0;
  }

  // Verificar se o segundo dígito verificador está correto
  if (parseInt(cpf.charAt(10)) !== secondDigit) {
    return false;
  }

  // CPF válido
  return true;
}

export function phoneMask(value: string | undefined) {
  if (!value) return "";

  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");

  return value;
}
