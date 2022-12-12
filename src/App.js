import './App.css';
import {useEffect, useState} from "react";
import {Button, Card, Form} from "react-bootstrap";

function App() {
  let [input,setInput]=useState("");
  let [output,setOutput]=useState("");

  let [max,setMax] = useState("");
  let [min,setMin] = useState("");
  let [outputPlage,setOutputPlage]=useState([]);

  let [mode,setMode]= useState(false);
  const validate = () =>{
      setOutput(fizz_buzzator(input))
  }
  const validatePlage = () =>{
    if(max-min<0 || max-min>1000)return [];
    setOutputPlage(Array(max-min+1).fill().map((value,index)=>{
        value=parseInt(min)+index;
        return {num:value,res:fizz_buzzator(value)}
    }))
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
                <Form.Check
                    type={"switch"}
                    label={`Mode plage`}
                    checked={mode}
                    onChange={()=>setMode(!mode)}
                />
                {!mode?<>
                    <Form.Group className="mb-3">
                        <Form.Label>Fizz Buzzator</Form.Label>
                        <Form.Control onChange={({target})=>setInput(target.value)} value={input} type="number" placeholder="Entrez un nombre" />
                        <Button className={"mt-3 mb-3"} variant="outline-primary" onClick={validate}>Valider</Button>
                        <Form.Text className="text-muted d-flex">
                            {output}
                        </Form.Text>
                    </Form.Group>
                </>:
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Fizz Buzzator</Form.Label>
                        <Form.Control onChange={({target})=>setMin(target.value)} value={min} type="number" placeholder="Entrez un minimum" />
                        <Form.Control onChange={({target})=>setMax(target.value)} value={max} type="number" placeholder="Entrez un maximum" />
                        <Button className={"mt-3 mb-3"} variant="outline-primary" onClick={validatePlage}>Valider</Button>
                        <div className="text-muted d-flex flex-column">
                            {outputPlage.map((fizz,index)=><div key={index} className={"d-flex"}>
                                Numéro: {fizz.num} Résultat: {fizz.res}
                            </div>)}
                        </div>
                    </Form.Group>
                </>}
            </Card.Body>
        </Card>
    </div>
  );
}

export default App;
