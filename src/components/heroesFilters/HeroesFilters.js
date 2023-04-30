import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store from "../../store";

import { fetchFilters, filterSelect, filterSelector, selectAll} from './filtersSlice';
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active


const HeroesFilters = () => {

    const { filtersLoadingStatus, selectionfilter} = useSelector(filterSelector);
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
                            classBtn += "btn-outline-secondary";
                            break;
                        case 'fire':
                            classBtn += "btn-warning";
                            break;
                        case 'water':
                            classBtn += "btn-primary";
                            break;
                        case 'wind':
                            classBtn += "btn-dark";
                            break;
                        case 'earth':
                            classBtn += "btn-danger";
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