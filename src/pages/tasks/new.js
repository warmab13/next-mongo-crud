
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default function TaskFormPage() {

  const { query, push } = useRouter();

  const [newTask, setNewTask] = useState({
    title: "",
    description: ""
  })

  const [ errors, setErrors] = useState({
    title:"",
    description:""
  });

  const validate = () =>{
    const errors= {};

    if(!newTask.title) errors.title = "Title is required";
    if(!newTask.description) errors.description = "Description is required";

    return errors;
  }

  const createTask = async() => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async() => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    let errors = validate();

    if(Object.keys(errors).length) return setErrors(errors);

    if(query.id){
      await updateTask();
    }else{
      await createTask();
    }

    await push("/");
  }

  const handleChange = (e) => setNewTask({ ...newTask , [e.target.name]: e.target.value})

  const getTask = async ()=>{
    const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await res.json();
    setNewTask({title: data.title, description: data.description})
  }

  useEffect(()=>{
    if(query.id) getTask();
  }, [])

  return (
    <Grid centered verticalAlign="middle" columns={3} style={{ height: "80vh" }}>
      <Grid.Row>
        <Grid.Column>
          <h1>{query.id ? 'Update Task' : 'Create Task' }</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input 
              label="Title" 
              placeholder="" 
              name="title" 
              onChange={handleChange}
              error={errors.title ? {content: errors.title }: null}
              value={newTask.title}>
            </Form.Input>
            <Form.TextArea 
              label="Task" 
              placeholder="" 
              name="description" 
              onChange={handleChange}
              error={errors.description ? {content: errors.description } : null}
              value={newTask.description}>

            </Form.TextArea>
            <Button primary> {query.id ? 'Update' : 'Create'}</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
