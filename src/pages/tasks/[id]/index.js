import Error from "next/error"
import { useRouter } from "next/router";
import { useState } from "react"
import { Button, Confirm, Grid, GridRow, Loader } from "semantic-ui-react";

export default function TaskDetail({ task, error }) {
  
  const [ confirm, setConfirm ] = useState(false);
  const { query, push } = useRouter();
  const [ isDeleting, setIsDeleting ] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async() => {
    const { id } = query;
    console.log(id)
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.error(error); 
    }
  }

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask();
    close();

    push("/");
  }

  if (error && error.statusCode) 
    return <Error statusCode={error.statusCode} title={error.statusText} />
  
  return (
    <Grid centered verticalAlign="middle" columns={1} style={{ height: "80vh"}}>
      <GridRow>
        <Grid.Column textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <Button color="red" onClick={open} loading={isDeleting}>Delete</Button>
        </Grid.Column>
      </GridRow>
      <Confirm  header="Please confirm" content="Are you sure you want to delete this task?" open={confirm} onConfirm={handleDelete} onCancel={close}/>
    </Grid>
  )
}

export async function getServerSideProps({ query: { id } }) {
  console.log(id)

  const res = await fetch(`http://localhost:3000/api/tasks/${id}`)
  console.log("🚀 ~ file: [id].js:13 ~ getServerSideProps ~ res", res)
  if (res.status === 200) {
    let task = await res.json();
    console.log("🚀 ~ file: [id].js:15 ~ getServerSideProps ~ task", task)
    return {
      props: {
        task
      }
    }
  }else{
    return {
      props: {
        error: {
          statusCode: res.status,
          statusText: res.statusText
        }
      }
    }
  }
}
