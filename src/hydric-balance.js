import axios from 'axios';

const URL_API = 'https://apitempo.inmet.gov.br/estacao/';
const COD_MORRINHOS = 'A003'
const COD_FLORIANOPOLIS = 'A806'
const COD_MANAUS = 'A101'
const COD_FORTALEZA = 'A305'
const COD_NITEROI = 'A627'

const dataInicio = '2021-01-01';
const dataFim = '2021-12-31';

(async () => {
  let tempMorrinhos;
  let tempSantaCatarina;
  let tempManaus;
  let tempFortaleza;
  let tempNiteroi;
  try {
    tempMorrinhos = (await axios.get(`${URL_API}/${dataInicio}/${dataFim}/${COD_MORRINHOS}`)).data;
    // tempSantaCatarina = (await axios.get(`${URL_API}/${dataInicio}/${dataFim}/${COD_FLORIANOPOLIS}`)).data;
    // tempManaus = (await axios.get(`${URL_API}/${dataInicio}/${dataFim}/${COD_MANAUS}`)).data;
    // tempFortaleza = (await axios.get(`${URL_API}/${dataInicio}/${dataFim}/${COD_FORTALEZA}`)).data;
    // tempNiteroi = (await axios.get(`${URL_API}/${dataInicio}/${dataFim}/${COD_NITEROI}`)).data;

    const temps = parseTemps(tempMorrinhos);

    console.log(temps);

  } catch (e) {
    console.error(e);
  }
})();

/**
 * Junta as temperaturas do mesmo dia no mesmo objeto e filtra somente os atributos desejados
 * @param {Object[]} temps 
 */
function parseTemps(temps) {
  const result = [];
  const conjuntoDatas = new Set();

  temps.forEach(e => {
    conjuntoDatas.add(e['DT_MEDICAO']);
  });

  Array.from(conjuntoDatas).forEach(data => {
    const tempsOfDate = temps.filter(e => {
      return (e['DT_MEDICAO'] == data) && e['TEM_MIN'] && e['TEM_MAX'];
    });

    const tempMinAcc = tempsOfDate.map(e => +e['TEM_MIN']).reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    const tempMaxAcc = tempsOfDate.map(e => +e['TEM_MAX']).reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    result.push({
      tempMin: tempMinAcc / tempsOfDate.length,
      tempMax: tempMaxAcc / tempsOfDate.length,
      data: data,
    });
  });
  return result;
}
