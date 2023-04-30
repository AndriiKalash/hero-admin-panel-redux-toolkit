import { useCallback, useMemo} from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useAddTaskMutation, useDeleteHeroMutation, useGetHeroesQuery } from '../../api/apiSlice';
import { filterSelector} from '../heroesFilters/filtersSlice';
import './heroesList.scss';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const {selectionFilter} = useSelector(filterSelector);

    const { 
         data: heroes = [],
         isLoading,
          isError
         } =useGetHeroesQuery();

    const [ deleteHero ] = useDeleteHeroMutation();
    const [addTask] = useAddTaskMutation();


    const filteredHeroes = useMemo(()=>{
        const filteredHeroes = heroes.slice();
        if (selectionFilter === 'all') {
            return filteredHeroes;
        } else {
             return filteredHeroes.filter(item => item.element === selectionFilter);
        }
    },[heroes, selectionFilter]);

    const onClickDelite = useCallback ( id => {
        deleteHero(id);
    } , [deleteHero] );

    const onClickDeleteTask = (idTask, idHero) => {
        const findedHero = heroes.find(hero => hero.id === idHero);
        const updateTasks = findedHero.task.filter(oneTask => oneTask.id !== idTask);
        addTask({heroId: idHero, task:updateTasks});
      };


    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    };

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
        return arr.map(({ id, ...props}) =>  (       
                         <CSSTransition  
                                key={id}
                                timeout={500} 
                                classNames="hero"
                         >
                         <HeroesListItem  
                                {...props}
                                id={id}
                                onClickDelite={() =>onClickDelite(id)}
                                deleteTask={onClickDeleteTask}/>
                        </CSSTransition>                
            )
        )   
    };

    const elements = renderHeroesList(filteredHeroes);

    return (    
        <TransitionGroup component = 'ul'>
            {elements}
        </TransitionGroup>
    )
};

export default HeroesList;