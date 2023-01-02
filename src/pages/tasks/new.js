
import { router } from "next/router";
import { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default function TaskFormPage() {

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    let errors = validate();

    if(Object.keys(errors).length) return setErrors(errors);

    await createTask();

    await router.push("/");
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

  const handleChange = (e) => setNewTask({ ...newTask , [e.target.name]: e.target.value})

  return (
    <Grid centered verticalAlign="middle" columns={3} style={{ height: "80vh" }}>
      <Grid.Row>
        <Grid.Column>
          <h1>Create Task</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input 
              label="Title" 
              placeholder="" 
              name="title" 
              onChange={handleChange}
              error={errors.title ? {content: errors.title }: null}>
            </Form.Input>
            <Form.TextArea 
              label="Task" 
              placeholder="" 
              name="description" 
              onChange={handleChange}
              error={errors.description ? {content: errors.description } : null}>

            </Form.TextArea>
            <Button primary> Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
