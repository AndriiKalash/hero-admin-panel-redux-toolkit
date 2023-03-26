import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import { heroesDelete, fetchHeroes, filterHeroesSelector } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';;
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const filteredHeroes = useSelector(filterHeroesSelector);
    const dispatch = useDispatch();
    const {request} = useHttp();
   
    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const onClickDelite = useCallback ( id => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
        .then(dispatch(heroesDelete(id)))
        .catch((err) => {
            console.warn(err);
            alert('coud not fetch');
          }); 
    } , [request] );

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                timeout={0}
                classNames="hero">
                     <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        } 

        return filteredHeroes.map(({ id, ...props}) =>  (       
                         <CSSTransition  
                                 key={id}
                                 timeout={500} 
                                 classNames="hero"
                         >
                         <HeroesListItem  
                                 {...props}
                                  onClickDelite={() =>onClickDelite(id)}/>
                        </CSSTransition>                
                  )
     )
         
    }

    const elements = renderHeroesList(filteredHeroes);

    return (    
        <TransitionGroup component = 'ul'>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;