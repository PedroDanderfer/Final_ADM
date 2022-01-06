<template>
  <div class="menu">
    <div>
      <h2>Menu</h2>
      <nav class="navMenu">
        <ul>
          <li><router-link to="/categories">Categorías</router-link></li>
          <li><router-link to="/product/create">Agregar producto</router-link></li>
        </ul>
      </nav>
    </div>
    <ul>
      <li>Menu 1</li>
      <li>Menu 2</li>
      <li>Menu 2</li>
      <li>Menu 2</li>
    </ul>
  </div>
</template>

<style>
  .menu >div{
    width:100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;    
  }
  .menu >div >h2{
    display: flex;
    align-self: center;
    justify-self: flex-start;
    padding: 10px 20px 10px 20px;
  }
  .navMenu{
    width: 100%;
    padding: 10px 20px 10px 20px;
    display: flex;
    align-self: center;
    justify-self: flex-end;
  }

  .navMenu >ul{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    list-style: none;
  }

  .navMenu >ul >li{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
  }

  .navMenu >ul >li >a{
    display: flex;
    align-self: center;
    background-color: #f59f2a;
    padding: 10px;
    border: 1px solid #f59f2a;
    border-radius: 8px;
    text-decoration: none;
    color: black;
    font-weight: 500;
  }

  .navMenu >ul >li:first-of-type >a{
    justify-self: flex-start;
  }

  .navMenu >ul >li:last-of-type >a{
    justify-self: flex-end;
  }

  @media(min-width:600px){
    .menu >div{
      grid-template-columns: auto auto;
      grid-template-rows: 1fr;    
    }

    .navMenu{
      max-width: 400px;
    }

    .navMenu >ul >li:first-of-type >a{
      justify-self: flex-end;
    }
  }
</style>
