import React from 'react';

import PizzaLogo from '../assets/img/logo.svg'

import './App.scss';

function App() {
  return (
    <div className='home'>
        <div className="header">
            <div className="header__logo">
                <div className="header__logo__image">
                    <img src={PizzaLogo} alt="Pizza logo"/>
                </div>
                <div className="header__logo__caption">
                    <div className="header__logo__caption__title">
                        REACT PIZZA
                    </div>
                    <div className="header__logo__caption__text">
                        самая вкусная пицца во вселенной
                    </div>
                </div>
            </div>
            <div className="header__cart">

            </div>
        </div>
        <div className="container">

        </div>
    </div>
  );
}

export default App;
