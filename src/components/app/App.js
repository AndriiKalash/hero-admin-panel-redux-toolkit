import Header from '../header/Header';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';


const App = () => {
    
    return (
        <main className="app">
            <div className='content'>
                    <Header/> 
                <div className="content__main">
                    <HeroesList/>
                    <div className="content__interactive">
                        <HeroesAddForm/>
                        <HeroesFilters/>
                    </div>
                </div>
            </div>
               
        </main>
    )
}

export default App;