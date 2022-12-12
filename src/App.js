import './App.css';
import {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";

function App() {
  let [input,setInput]=useState("");
  let [output,setOutput]=useState("");

  let [erreur,setErreur]=useState("");

  let [max,setMax] = useState("");
  let [min,setMin] = useState("");
  let [outputPlage,setOutputPlage]=useState([]);

  let [mode,setMode]= useState(false);
  const validate = () =>{
      setOutput(fizz_buzzator(input))
  }
  const validatePlage = () =>{
      if(!min&&min!==0)
          setErreur("Le minimum n'est pas renseigné!")
      else if(!max&&max!==0)
          setErreur("Le maximum n'est pas renseigné!")
      else if(max-min>1000)
          setErreur("La plage est trop grande!")
      else if(min>max){
          setErreur("Le minimum est supérieur au maximum!")
      }
      else{
          return setOutputPlage(Array(max-min+1).fill().map((value,index)=>{
              let val=parseInt(min)+index;
              return {num:val,res:fizz_buzzator(val)}
          }))
      }
      return [];

  }

  const fizz_buzzator = (numb) =>{
      numb=parseInt(numb);
      if(!numb&&numb!==0){
          setErreur("Veuillez entrer un nombre!")
          return "";
      }
      return numb%3===0&&numb%5===0?"Fizz Buzz":numb%3===0?"Fizz":numb%5===0?"Buzz":numb;
  }

  const handleKeyDown = event => {
      if(event.key==="Enter"){
          if(!mode)validate()
          else validatePlage();
      }
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
                        <Form.Control onChange={({target})=> {
                            setInput(target.value);
                            setErreur("");
                        }} value={input} type="number" placeholder="Entrez un nombre" />
                        <Button className={"mt-3 mb-3"} variant="outline-primary" onClick={validate}>Valider</Button>
                        <Form.Text className="text-muted d-flex">
                            {output}
                        </Form.Text>
                    </Form.Group>
                </>:
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Fizz Buzzator</Form.Label>
                        <Form.Control onChange={({target})=> {
                            setMin(target.value);
                            setErreur("");
                        }} value={min} type="number" placeholder="Entrez un minimum" />
                        <Form.Control onChange={({target})=> {
                            setMax(target.value);
                            setErreur("");
                        }} value={max} type="number" placeholder="Entrez un maximum" />
                        <Button className={"mt-3 mb-3"} variant="outline-primary" onClick={validatePlage}>Valider</Button>
                        <div className="text-muted d-flex flex-column overflow-auto " style={{maxHeight:"20vh"}}>
                            {outputPlage.map((fizz,index)=><div key={index} className={"d-flex"}>
                                Numéro: {fizz.num} Résultat: {fizz.res}
                            </div>)}
                        </div>
                    </Form.Group>
                </>}
                {erreur?<div className={"text-danger"}>{erreur}</div>:null}
            </Card.Body>
        </Card>
    </div>
  );
}

export default App;
