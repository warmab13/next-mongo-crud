import { Button, Card, Container, Grid, GridColumn } from "semantic-ui-react";

export default function HomePage({tasks}) {
console.log("🚀 ~ file: index.js:2 ~ HomePage ~ tasks", tasks)
  
  if(tasks.length === 0) return(
    <Grid centered verticalAlign="middle" columns={1} style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>There are no tasks </h1>
          <img src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png" alt="No tasks yet" />
          <div>
            <Button primary>Create a Task</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  //Render tasks list
  return (
    <div>
      <Container>
        <Card.Group itemsPerRow={4}>
          {
            tasks.map(task => (
              <Card key={task._id}>
                <Card.Content>
                  <Card.Header>{task.title}</Card.Header>
                  <Card.Meta>{task._id}</Card.Meta>
                  <Card.Description>{task.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button primary>View</Button>
                  <Button primary>Edit</Button>
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
      </Container>
    </div>
  )
}


export const getServerSideProps = async (ctx)=>{
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();
  //console.log("🚀 ~ file: index.js:11 ~ getServerSideProps ~ tasks", tasks)
  return {
    props: {
      tasks: []
    }
  }
}