import {Row, Col} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from "uuid";
import {useAddTaskMutation, useGetHeroesQuery} from "../../api/apiSlice"


const SignupSchema = Yup.object().shape({
    task: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    date: Yup.string()
    .required('Required'),
    hero: Yup.string().required('Choose a hero')
});

const Header = () => {

    const { 
        data: heroes = [],
        isLoading
        } =useGetHeroesQuery();

    const [addTask] = useAddTaskMutation(); 
    

    return (
    <div className='content__header mb-2  text-white  border p-4 shadow-lg rounded'>
        <Row>
            <Col className='fs-2 text-dark'>Super hero schedule</Col>
        </Row>  
        <Formik
        initialValues={{
            task: '',
            date:'',
            hero:''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {

            const newTask = {
              id: uuidv4(),  
              task: values.task,
              date: values.date,
            };
            const hero = heroes.find(item => item.id === values.hero);
            const updatedTasks = [...hero.task, newTask];  
            addTask({ heroId: values.hero, task: updatedTasks })
              .unwrap()
              .then(() => {
                resetForm();
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
            {({isSubmitting, resetForm}) => (
                <Form>
                  <Row>
                    <Col sm={8}>
                        <label className="form-label fs-4 text-dark" htmlFor="task">
                            new mission :
                        </label>
                        <Field
                            type="text"
                            className="form-control"
                            id="task" 
                            name='task'
                            placeholder="Enter new mission"/>
                        <ErrorMessage 
                            name="task"
                            component="div" 
                            className='error'/>
                    </Col>
                    <Col className='mb-4' sm={4}>
                           <label className="form-label fs-4 text-dark" htmlFor="date">
                            complete to ...
                        </label>
                        <Field
                            type='date' 
                            className="form-control form-calendar" 
                            id="date"
                            name='date'/>
                        <ErrorMessage 
                            name="date"
                            component="div" 
                            className='error'/>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={5}>
                        <Field 
                            className="form-select " 
                            id="hero" 
                            name="hero"
                            as="select">
                           <option value="">Choose one hero</option>
                          {
                           (isLoading) ? 
                           ( <option>loading...</option>
                           ):(
                            heroes.map(item => (
                                <option 
                                   key={item.id} 
                                   value={item.id}>{item.name}
                                </option>
                            ))
                            )
                           }
                        </Field> 
                        <ErrorMessage 
                            name="hero"
                            component="div" 
                            className='error'/>
                    </Col>
                    <Col>
                        <button type="submit" 
                               disabled={isSubmitting}  
                               className="btn btn-outline-secondary ">
                                Add Mission
                        </button>
                        <button type="button"
                                onClick={resetForm}
                                className="btn btn-outline-secondary ms-2 ">
                                 Clear Mission
                        </button>
                    </Col>
                  </Row>
                </Form>
            )}
        </Formik>  
    </div>      
    )
};

export default Header;