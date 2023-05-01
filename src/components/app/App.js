import Header from '../header/Header';
import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';

import './app.scss';
import { useState } from 'react';


const App = () => {

    const [page, setPage] = useState(1);
    
    return (
        <main className="app">
            <div className='content'>
                    <Header page={page}/> 
                <div className="content__main">
                    <HeroesList page={page}/>
                    <div className="content__interactive">
                        <HeroesAddForm/>
                        <HeroesFilters/>
                    </div>
                    <ul className='content__paginate pagination'>
                    {
                        [...Array(3)].map((_,i) => (
                            <li 
                            key={i}
                            className={page===(i+1) ? "active": ''}
                            onClick={()=>setPage(i+1)}>
                                {i+1}
                            </li>
                        ))
                    }
                     </ul>
                </div>
            </div>
        </main>
    )
};

export default App;