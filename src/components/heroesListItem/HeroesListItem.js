import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoltLightning, faXmark } from '@fortawesome/free-solid-svg-icons';

import  "./heroesListItem.scss";


const HeroesListItem = ({ 
   id,
   name,
   description,
   element,
   picture,
   task,
   onClickDelite,
   deleteTask}) => {

const [showTask, setShowTask] = useState(false);

let elementClassName;
    switch (element) {
        case 'fire':
            elementClassName = 'bg-warning' ;
            break;
        case 'water':
            elementClassName = 'bg-primary';
            break;
        case 'wind':
            elementClassName = 'bg-dark' ;
            break;
        case 'earth':
            elementClassName = 'bg-danger';
            break;
        default:
            elementClassName = 'bg-warning';
    };


    return (
          <li className={`list-group-item card-block`}>
            <div 
                className={`card mb-4 shadow-lg flex-row text-white ${elementClassName}`}>
              <img src={picture}
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
              <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
                <FontAwesomeIcon
                  icon={faBoltLightning} 
                  rotation={ showTask? 270 : 0} 
                  onClick={()=>setShowTask(!showTask)} 
                  style={{color:`${ showTask ? 'red' : 'green'}`,
                   fontSize:"40px", transition: 'all 500ms ease-in', cursor:'pointer'}} 
                />
              </div>
              <span 
                onClick={onClickDelite} 
                className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                 <button  type="button" className="btn-close btn-close" aria-label="Close"></button>
               </span>
            </div> 
           {
              <ol
               className={
                `card-block__task pt-3  shadow-lg flex-row text-white
                 ${elementClassName} border rounded 
                 ${showTask ? 'card-block__task-active':''}`
                }>
                {
                task.length > 0 ? 
                   (task.map((item) => (
                      <li key={item.id}>
                        <div className='d-flex justify-content-between'>
                          <ul style={{listStyle:"none"}}>
                            <li> {item.task}</li>
                            <li>deadline - {item.date} </li>
                          </ul>
                          <FontAwesomeIcon
                            onClick={()=>deleteTask(item.id, id)}
                            icon={faXmark} 
                            style={{color: "#ffffff", fontSize: '30px', paddingRight: '28px', cursor:'pointer'}} 
                          />
                        </div>
                      </li>))
                    ) : (
                      <h5 className="mt-5">
                        This superhero dose not have task yet
                      </h5>
                    )
                }
              </ol>  
            }       
          </li>  
    )}



export default HeroesListItem;



