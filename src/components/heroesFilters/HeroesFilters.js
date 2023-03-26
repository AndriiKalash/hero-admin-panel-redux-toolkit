import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store from "../../store";

import { fetchFilters, filterSelect, selectAll} from './filtersSlice';
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filtersLoadingStatus, selectionfilter} = useSelector(state => state.filter);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchFilters());
    },[]);

    const onSelectFilter = (element) => {
        dispatch(filterSelect(element));
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    }else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                     filters.map((element) => {
                        let classBtn = "btn ";
                        switch (element.name) {
                        case 'all':
                            classBtn += "btn-outline-dark";
                            break;
                        case 'fire':
                            classBtn += "btn-danger";
                            break;
                        case 'water':
                            classBtn += "btn-primary";
                            break;
                        case 'wind':
                            classBtn += "btn-success";
                            break;
                        case 'earth':
                            classBtn += "btn-secondary";
                            break;     
                        default:
                            break;
                        }
                        return (
                            <button 
                               onClick={()=>onSelectFilter(element.name)} 
                               key={element.id} 
                               className={(selectionfilter !== element.name) ? classBtn : `${classBtn} active`}>
                                {element.name}
                            </button>
                        )
                     })   
                    }             
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;