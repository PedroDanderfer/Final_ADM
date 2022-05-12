<template>
  <header>
      <h1>Atiendelo</h1>
      <nav>
          <div>
              <ul>
                <li><router-link to="/tables">Mesas</router-link></li>
                <li><router-link to="/menu">Menú</router-link></li>
                <li><router-link to="/orders">Pedidos</router-link></li>
            </ul>
          </div>
      </nav>
  </header>
</template>
<style>
header{
    display: grid;
    grid-template-columns: 40px auto;
    grid-template-rows: 1fr;
    grid-gap: 10px;
    width: 100%;
    height: fit-content;
    padding: 10px;
}

header h1{
    width:40px;
    height: 40px;
    display: flex;
    align-self: center;
    justify-self: flex-start;
    font-size: 0;
    background-image: url('../../assets/images/logo.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

header >nav{
    display:grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    width: 100%;
}

header >nav >div{
    display: flex;
    width: 100%;
    height: fit-content;
    align-self: center;
    justify-self: center;    
}

header >nav >div >ul{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 5px;
    list-style: none;
    width: 100%;
    height: fit-content;
}

header >nav >div >ul >li{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
}

header >nav >div >ul >li >a{
    display: flex;
    width: 100%;
    padding: 5px;
    align-self: center;
    justify-self: center;
    text-decoration: none;
    justify-content: center;
    color:black;
    font-weight: 500;
}

@media(min-width: 600px){
    header >nav >div{
        width:fit-content;
        justify-self: flex-end;
    }
}
</style>