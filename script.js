//async - código não ordenado
document.querySelector('.busca').addEventListener('submit', async (event)=>{
  //função para prevenir o comportamento padrão do formulário
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== ''){
    clearInfo();
    showWarning('Carregando...');

    //encodeuri - serve para converter os espaçoes e acentos em caracteres especiais
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5f1aa3bb0c5a54e85cd1425a31dfbfc3&units=metric&lang=pt_br`;
    
    //await espera os resultados para mostrar 
    let results = await fetch(url);

    //pega o resultado e transforma em json e a função await aguarda ele fazer isso
    let json = await results.json();
    // vai aparecer os objetos no console e temos que pegar por lá os nomes 
    // console.log(json);

    if(json.cod === 200){
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    }else{
      clearInfo();
      showWarning('Não encontramos esta localização.');
    }
  }
});

function showInfo(json){
  //tirar mensagem de carregando 
  showWarning('');

  //colocando os elementos no js 
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

  //alterar apenas uma parte da url do icone de temperatura
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  
  //mostrar na tela o esqueleto do projeto
  document.querySelector('.resultado').style.display="block";
}

function clearInfo(){
  showWarning('');
  document.querySelector('.resultado').style.display="none";
}

function showWarning(msg){
  document.querySelector('.aviso').innerHTML = msg;
}