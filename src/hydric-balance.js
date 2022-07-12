import axios from 'axios';

const urlApi = 'https://apitempo.inmet.gov.br/estacao/';
const morrinhos = 'A003'
const santaCatarina = 'A806'
const manaus = 'A101'
const fortaleza = 'A305'
const niteroi = 'A627'

const dataInicio = '2021-01-01';
const dataFim = '2021-12-31';

(async () => {
  let tempMorrinhos;
  let tempSantaCatarina;
  let tempManaus;
  let tempFortaleza;
  let tempNiteroi;
  try {
    tempMorrinhos = await axios.get(`${urlApi}/${dataInicio}/${dataFim}/${morrinhos}`);
    tempSantaCatarina = await axios.get(`${urlApi}/${dataInicio}/${dataFim}/${santaCatarina}`);
    tempManaus = await axios.get(`${urlApi}/${dataInicio}/${dataFim}/${manaus}`);
    tempFortaleza = await axios.get(`${urlApi}/${dataInicio}/${dataFim}/${fortaleza}`);
    tempNiteroi = await axios.get(`${urlApi}/${dataInicio}/${dataFim}/${niteroi}`);
  } catch (e) {
    console.error(e);
  }
})();

