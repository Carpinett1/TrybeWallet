export async function fetchExchangeRates() {
  try {
    const reponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await reponse.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
