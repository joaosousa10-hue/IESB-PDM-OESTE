const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  if (!BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_URL não está definida no .env');
  }
  const response = await fetch(`${BASE_URL}/${path}`, options);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar o servidor`);
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  // Bônus: criar aviso
  create: (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};
