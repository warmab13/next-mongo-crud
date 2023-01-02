import { Menu, Container, Button } from "semantic-ui-react";

export const Navbar = () => {
  return (
    <Menu>
        <Container>
            <Menu.Item>
                <img src="/vercel.svg" alt="" />
            </Menu.Item>
            <Menu.Menu>
                <Menu.Item>
                    <Button primary size="mini" onClick={()=> alert("works")}>
                        New Task 
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
  );
};

