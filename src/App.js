import './App.css';
import {useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";

function App() {
  let [input,setInput]=useState("");
  let [output,setOutput]=useState("");

  const validate = () =>{
      setOutput(fizz_buzzator(input))
  }
  const fizz_buzzator = (numb) =>{
      numb=parseInt(numb);
      if(!numb&&numb!==0)return "Pas de valeur entrée";
      return numb%3===0&&numb%5===0?"Fizz Buzz":numb%3===0?"Fizz":numb%5===0?"Buzz":numb;
  }

  const handleKeyDown = event => {
      if(event.key==="Enter")validate();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" onKeyDown={handleKeyDown}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Fizz Buzzator</Form.Label>
                    <Form.Control onChange={({target})=>setInput(target.value)} value={input} type="number" placeholder="Entrez un nombre" />
                    <Button className={"mt-3 mb-3"} variant="outline-primary" onClick={validate}>Primary</Button>
                    <Form.Text className="text-muted d-flex">
                        {output}
                    </Form.Text>
                </Form.Group>
            </Card.Body>
        </Card>
    </div>
  );
}

export default App;
