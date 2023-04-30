import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';

import store from "../../store";
import { selectAll } from "../../components/heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";
import { useSelector } from "react-redux";
import { filterSelector } from "../../components/heroesFilters/filtersSlice";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    element: Yup.string().required('Chouse the element')
});

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option>  сформировать на базе
// данных из фильтров



const HeroesAddForm = () => {

    const filters = selectAll(store.getState());
    const {filtersLoadingStatus} = useSelector(filterSelector);
    const [ addHerro ] = useCreateHeroMutation();

    const onSubmit = (values) => {
        const choosenElement = filters.find(obj => obj.name === values.element);
        const newHero = {
            picture: choosenElement.picture,
            id :uuidv4(),
            name:values.name,
            description:values.description,
            element:values.element,
            task:[]
        };
        addHerro(newHero);
    }
  
   
    return (

        <Formik 
        initialValues={{
            name: '',
            description: '',
            element: ''
            }}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting, resetForm }) => {
            onSubmit(values)
            setSubmitting(false);
            resetForm();
        }}>
            {({isSubmitting}) => (
                <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <ErrorMessage name="name" component="div" className='error'/>
                    <Field 
                        id="name"
                        name="name"
                        placeholder="Как меня зовут?"/>
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="description"
                        className="form-label fs-4">Описание
                    </label>
                    <ErrorMessage 
                        name="description"
                        component="div" 
                        className='error'/>
                    <Field 
                        id="description"
                        name="description" 
                        as="textarea"
                        className="form-control" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <ErrorMessage 
                        name="element"
                        component="div" 
                        className='error'/>
                    <Field 
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                         <option value="" >Я владею элементом...</option>
                       { 
                       (filtersLoadingStatus==="loading") ?
                          ( <option>loading...</option>
                          ):(
                            filters.filter((elem)=>{
                             return elem.name !== "all";
                            }).map((elem)=>{
                             return (
                                 <option 
                                   key={elem.id} 
                                   value={elem.name}>{elem.name}</option>
                                )
                            })
                          )
                         
                        }  
                    </Field>
                </div>
                <button 
                   type="submit" 
                   disabled={isSubmitting} 
                   className="btn btn-primary">
                    Создать
                </button>
                </Form>
            )} 
        </Formik>
    )
}

export default HeroesAddForm;